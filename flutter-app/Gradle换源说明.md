# Gradle 换源说明

本项目已配置国内镜像源，以加速 Android 构建。

## 换源清单

### 1. Gradle 发行版（腾讯云镜像）

**文件**：`android/gradle/wrapper/gradle-wrapper.properties`

```properties
distributionUrl=https\://mirrors.cloud.tencent.com/gradle/gradle-9.1.0-all.zip
```

将默认的 `https://services.gradle.org/distributions/` 替换为腾讯云镜像。

---

### 2. Maven 仓库（阿里云镜像）

**文件 1**：`android/settings.gradle.kts`（`pluginManagement` 段）

```kotlin
pluginManagement {
    repositories {
        maven { url = uri("https://maven.aliyun.com/repository/google") }
        maven { url = uri("https://maven.aliyun.com/repository/central") }
        maven { url = uri("https://maven.aliyun.com/repository/gradle-plugin") }
        google()
        mavenCentral()
        gradlePluginPortal()
    }
}
```

**文件 2**：`android/build.gradle.kts`（`allprojects` 段）

```kotlin
allprojects {
    repositories {
        maven { url = uri("https://maven.aliyun.com/repository/google") }
        maven { url = uri("https://maven.aliyun.com/repository/central") }
        maven { url = uri("https://maven.aliyun.com/repository/gradle-plugin") }
        google()
        mavenCentral()
    }
}
```

> 注意：阿里云镜像必须放在 `google()` 和 `mavenCentral()` 之前，Gradle 会按顺序查找依赖。

---

## 镜像源说明

| 用途 | 镜像地址 | 提供商 |
|---|---|---|
| Gradle 发行版 | `https://mirrors.cloud.tencent.com/gradle/` | 腾讯云 |
| Google 仓库 | `https://maven.aliyun.com/repository/google` | 阿里云 |
| Maven Central | `https://maven.aliyun.com/repository/central` | 阿里云 |
| Gradle 插件 | `https://maven.aliyun.com/repository/gradle-plugin` | 阿里云 |

---

## 其他可选镜像

如果阿里云或腾讯云速度不理想，可替换为以下镜像：

- **华为云**：`https://repo.huaweicloud.com/gradle/`（Gradle）、`https://repo.huaweicloud.com/repository/maven/`（Maven）
- **中科大**：`https://mirrors.ustc.edu.cn/gradle/`（Gradle）、`https://mirrors.ustc.edu.cn/maven/maven2/`（Maven）
- **清华大学**：`https://mirrors.tuna.tsinghua.edu.cn/gradle/`（Gradle）、`https://mirrors.tuna.tsinghua.edu.cn/maven/repository/maven-central/`（Maven）

---

## 验证换源是否生效

清理缓存后重新构建，观察下载地址：

```powershell
cd android
./gradlew clean build --info
```

如果日志中出现 `maven.aliyun.com` 或 `mirrors.cloud.tencent.com`，说明换源成功。
