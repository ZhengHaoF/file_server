use file_server::config::{self, Env};
use file_server::state::Options;
use file_server::{logging, RESTART_EXIT_CODE};
use std::path::PathBuf;
use std::process::ExitCode;
use std::time::{Duration, Instant};

const HELP: &str = "file-server — shared folder server with Web and admin UI

USAGE:
  file-server [serve] [--config <file>]   Run the server (default)
  file-server supervise [--config <file>] Run under a restart supervisor (enables admin restart)
  file-server check-config [--config <file>]  Validate configuration and exit
  file-server --version | --help

Environment: FILE_SERVER_CONFIG, FILE_SERVER_ROOT, FILE_SERVER_DATA_DIR, FILE_SERVER_CACHE_DIR,
FILE_SERVER_STATIC_DIR, FILE_SERVER_HOST, FILE_SERVER_PORT, FILE_SERVER_ACCESS_TOKEN,
FILE_SERVER_ADMIN_TOKEN, FILE_SERVER_MANAGED, FILE_SERVER_VIPS, FILE_SERVER_VIPSHEADER, FILE_SERVER_FFMPEG.
See shared/RUST_API.md.";

struct Cli {
    command: String,
    config: Option<PathBuf>,
}

fn parse_args() -> Result<Cli, String> {
    let mut command = None;
    let mut config = None;
    let mut args = std::env::args().skip(1);
    while let Some(arg) = args.next() {
        match arg.as_str() {
            "--help" | "-h" => {
                println!("{HELP}");
                std::process::exit(0);
            }
            "--version" | "-V" => {
                println!("file-server {}", env!("CARGO_PKG_VERSION"));
                std::process::exit(0);
            }
            "--config" | "-c" => config = Some(PathBuf::from(args.next().ok_or("--config 需要文件路径")?)),
            s if s.starts_with("--config=") => config = Some(PathBuf::from(&s[9..])),
            "serve" | "supervise" | "check-config" if command.is_none() => command = Some(arg),
            other => return Err(format!("未知参数: {other}（使用 --help 查看用法）")),
        }
    }
    Ok(Cli {
        command: command.unwrap_or_else(|| "serve".into()),
        config,
    })
}

fn main() -> ExitCode {
    let cli = match parse_args() {
        Ok(cli) => cli,
        Err(e) => {
            eprintln!("{e}");
            return ExitCode::from(2);
        }
    };
    let env = Env::from_process();
    let config = match config::load(cli.config.clone(), &env) {
        Ok(c) => c,
        Err(e) => {
            eprintln!("配置错误: {e}");
            return ExitCode::from(78);
        }
    };
    match cli.command.as_str() {
        "check-config" => {
            println!(
                "配置有效: root={} data={} static={} listen={}:{}",
                config.root_path.display(),
                config.data_path.display(),
                config.static_dir.display(),
                config.host,
                config.port
            );
            ExitCode::SUCCESS
        }
        "supervise" => supervise(&cli, &config),
        _ => serve(config, env),
    }
}

fn serve(config: config::Config, env: Env) -> ExitCode {
    if let Err(e) = logging::init(&config.logs_dir, true) {
        eprintln!("日志目录无法写入: {e}");
        return ExitCode::from(74);
    }
    if config.access_token.is_empty() {
        return ExitCode::from(78);
    }
    eprintln!(
        "凭据保存在 {}（访问令牌与管理令牌不同，请勿提交）",
        config.data_path.join(config::AUTH_FILE).display()
    );
    eprintln!("当前访问密码 (accessToken): {}", config.access_token);
    eprintln!("当前后台密码 (restartPwd):   {}", config.admin_token);
    let runtime = match tokio::runtime::Builder::new_multi_thread().enable_all().build() {
        Ok(r) => r,
        Err(e) => {
            eprintln!("无法启动运行时: {e}");
            return ExitCode::from(70);
        }
    };
    let code = runtime.block_on(async move {
        let running = match file_server::start(config, Options::from_env(env)).await {
            Ok(r) => r,
            Err(e) => {
                logging::error("server", &e);
                eprintln!("{e}");
                // 78 (EX_CONFIG): the supervisor stops instead of restart-looping.
                return 78;
            }
        };
        let shutdown = running.state.shutdown.clone();
        tokio::spawn(async move {
            wait_signal().await;
            logging::info("server", "收到停止信号，正在优雅关闭");
            shutdown.trigger(0);
        });
        running.task.await.unwrap_or(1)
    });
    runtime.shutdown_timeout(Duration::from_secs(2));
    ExitCode::from(code.clamp(0, 255) as u8)
}

async fn wait_signal() {
    #[cfg(unix)]
    {
        use tokio::signal::unix::{signal, SignalKind};
        let mut term = signal(SignalKind::terminate()).expect("SIGTERM handler");
        tokio::select! {
            _ = tokio::signal::ctrl_c() => {}
            _ = term.recv() => {}
        }
    }
    #[cfg(not(unix))]
    {
        let _ = tokio::signal::ctrl_c().await;
    }
}

/// Minimal restart supervisor: restarts on exit 75 (admin restart) and on crashes with backoff.
fn supervise(cli: &Cli, config: &config::Config) -> ExitCode {
    let logs = config.logs_dir.clone();
    let exe = match std::env::current_exe() {
        Ok(p) => p,
        Err(e) => {
            eprintln!("无法定位可执行文件: {e}");
            return ExitCode::from(70);
        }
    };
    #[cfg(unix)]
    let stop = install_forwarding();
    let mut failures: Vec<Instant> = Vec::new();
    loop {
        let mut command = std::process::Command::new(&exe);
        command.arg("serve").env("FILE_SERVER_MANAGED", "1");
        if std::env::var_os("FILE_SERVER_DEPLOYMENT").is_none() {
            command.env("FILE_SERVER_DEPLOYMENT", "supervisor");
        }
        if let Some(c) = &cli.config {
            command.arg("--config").arg(c);
        }
        let mut child = match command.spawn() {
            Ok(c) => c,
            Err(e) => {
                logging::append_supervisor(&logs, &format!("[ERROR] 无法启动服务进程: {e}"));
                return ExitCode::from(70);
            }
        };
        logging::append_supervisor(&logs, &format!("[INFO] 服务进程已启动 pid={}", child.id()));
        #[cfg(unix)]
        stop.1.store(child.id() as i32, std::sync::atomic::Ordering::SeqCst);
        let status = child.wait();
        #[cfg(unix)]
        if stop.0.load(std::sync::atomic::Ordering::SeqCst) {
            logging::append_supervisor(&logs, "[INFO] 监督程序收到停止信号，退出");
            return ExitCode::SUCCESS;
        }
        let code = status.ok().and_then(|s| s.code());
        match code {
            Some(0) => {
                logging::append_supervisor(&logs, "[INFO] 服务正常退出");
                return ExitCode::SUCCESS;
            }
            Some(RESTART_EXIT_CODE) => {
                logging::append_supervisor(&logs, "[INFO] 管理端请求重启，正在重新启动服务");
                continue;
            }
            Some(78) => {
                logging::append_supervisor(&logs, "[ERROR] 配置无效，停止重启");
                return ExitCode::from(78);
            }
            other => {
                let now = Instant::now();
                failures.retain(|t| now.duration_since(*t) < Duration::from_secs(600));
                failures.push(now);
                logging::append_supervisor(&logs, &format!("[WARN] 服务异常退出 ({other:?})，第 {} 次", failures.len()));
                if failures.len() >= 10 {
                    logging::append_supervisor(&logs, "[ERROR] 10 分钟内异常退出过多，监督程序停止");
                    return ExitCode::from(1);
                }
                std::thread::sleep(Duration::from_secs(1 << failures.len().min(5)));
            }
        }
    }
}

#[cfg(unix)]
fn install_forwarding() -> std::sync::Arc<(std::sync::atomic::AtomicBool, std::sync::atomic::AtomicI32)> {
    use std::sync::atomic::Ordering;
    let shared = std::sync::Arc::new((std::sync::atomic::AtomicBool::new(false), std::sync::atomic::AtomicI32::new(0)));
    let state = shared.clone();
    std::thread::spawn(move || {
        let runtime = tokio::runtime::Builder::new_current_thread()
            .enable_all()
            .build()
            .expect("signal runtime");
        runtime.block_on(async {
            loop {
                wait_signal().await;
                state.0.store(true, Ordering::SeqCst);
                let pid = state.1.load(Ordering::SeqCst);
                if pid > 0 {
                    let _ = nix::sys::signal::kill(nix::unistd::Pid::from_raw(pid), nix::sys::signal::Signal::SIGTERM);
                }
            }
        });
    });
    shared
}
