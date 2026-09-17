@echo off
chcp 65001 >nul
title file-serve

where node >nul 2>nul
if errorlevel 1 goto no-node

node -e "var v=process.versions.node.split('.').map(Number);process.exit(v[0]>18||(v[0]===18&&v[1]>=17)?0:1)" >nul 2>nul
if errorlevel 1 goto old-node

if not exist node_modules goto install-deps
goto start-server

:install-deps
echo [首次运行] 未检测到依赖目录 node_modules，正在安装依赖...
call npm install
if errorlevel 1 goto install-fail

:start-server
node start.js
goto end

:no-node
echo [错误] 未检测到 Node.js，请先安装 Node.js LTS（https://nodejs.org/）
goto error-end

:old-node
echo [错误] Node.js 版本过低，需要 v18.17 及以上（建议 v20 LTS）
goto error-end

:install-fail
echo [错误] 依赖安装失败，请检查网络后重试
goto error-end

:error-end
pause
exit /b 1

:end
pause