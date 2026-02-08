# OpenClaw 国内版 - 安装说明

## 前置要求

- Node.js 22+
- npm

## 全新安装

```bash
# 解压（如果是压缩包）
tar -xzf openclaw-v*-cn.tar.gz

# 进入目录
cd openclaw-v*-cn

# 运行安装脚本
./install.sh
```

## 升级安装

如果您已经安装了旧版本的 OpenClaw，可以使用升级脚本：

```bash
# 解压新版本
tar -xzf openclaw-v*-cn.tar.gz

# 进入目录
cd openclaw-v*-cn

# 运行升级脚本（保留配置）
./upgrade.sh
```

升级脚本会：
- ✅ 自动备份您的配置文件和凭证
- ✅ 升级程序文件和依赖
- ✅ 保留所有 API keys 和自定义设置
- ✅ 提供回滚选项

## 卸载

```bash
cd openclaw-v*-cn
./uninstall.sh
```

## 使用

```bash
# 查看版本
openclaw --version

# 初始化配置
openclaw onboard

# 启动网关
openclaw gateway run
```

## 国内大模型配置

本版本支持以下国内大模型:

- SiliconFlow (硅基流动)
- DashScope (阿里云百炼)
- DeepSeek
- Volcengine (火山引擎)
- Kimi Code
- Xiaomi (小米)
- Qianfan (百度千帆)

配置时选择对应的提供商并输入 API Key 即可。
