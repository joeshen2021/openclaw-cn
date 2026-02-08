#!/bin/bash
echo "=== OpenClaw 安装脚本 ==="

# 检查 Node.js
if ! command -v node &> /dev/null; then
    echo "错误: 未找到 Node.js，请先安装 Node.js 22+"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 22 ]; then
    echo "警告: Node.js 版本过低 (当前: $(node -v))，建议使用 Node.js 22+"
fi

# 安装依赖
echo "安装运行时依赖..."
npm install --omit=dev

# 创建全局链接
echo "创建全局命令..."
npm link

echo ""
echo "✅ 安装完成！"
echo ""
echo "OpenClaw 国内版 (含国内大模型支持)"
echo "版本: $(node -p "require('./package.json').version")-cn"
echo ""
echo "使用方法:"
echo "  openclaw --version"
echo "  openclaw onboard"
echo "  openclaw gateway run"
echo ""
echo "支持的国内大模型:"
echo "  - SiliconFlow (硅基流动)"
echo "  - DashScope (阿里云百炼)"
echo "  - DeepSeek"
echo "  - Volcengine (火山引擎)"
echo "  - Kimi Code"
echo "  - Xiaomi (小米)"
echo "  - Qianfan (百度千帆)"
echo ""
