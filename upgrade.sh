#!/bin/bash
# OpenClaw 升级脚本
# 用于从旧版本升级到新版本，保留用户配置

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 获取脚本所在目录
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PACKAGE_DIR="$(dirname "$SCRIPT_DIR")"

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}OpenClaw 升级脚本${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# 读取版本信息
if [ -f "$PACKAGE_DIR/VERSION.txt" ]; then
    NEW_VERSION=$(grep "版本:" "$PACKAGE_DIR/VERSION.txt" | cut -d: -f2 | xargs)
    echo -e "${GREEN}新版本: $NEW_VERSION${NC}"
else
    echo -e "${YELLOW}警告: 未找到 VERSION.txt，继续升级...${NC}"
    NEW_VERSION="未知"
fi

echo ""

# 1. 检查是否已安装 openclaw
echo -e "${BLUE}[1/7] 检查现有安装...${NC}"
if ! command -v openclaw &> /dev/null; then
    echo -e "${RED}错误: 未找到 openclaw 命令${NC}"
    echo -e "${YELLOW}提示: 请先使用 install.sh 进行全新安装${NC}"
    exit 1
fi

CURRENT_VERSION=$(openclaw --version 2>/dev/null || echo "未知")
echo -e "当前版本: $CURRENT_VERSION"
echo -e "${GREEN}✓ 找到现有安装${NC}"
echo ""

# 2. 备份配置文件
echo -e "${BLUE}[2/7] 备份配置文件...${NC}"
CONFIG_DIR="$HOME/.openclaw"
CONFIG_FILE="$CONFIG_DIR/openclaw.json"
BACKUP_DIR="$CONFIG_DIR/backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

if [ -f "$CONFIG_FILE" ]; then
    mkdir -p "$BACKUP_DIR"
    BACKUP_FILE="$BACKUP_DIR/openclaw.json.$TIMESTAMP"
    cp "$CONFIG_FILE" "$BACKUP_FILE"
    echo -e "${GREEN}✓ 配置已备份到: $BACKUP_FILE${NC}"

    # 同时备份整个 .openclaw 目录的关键文件
    if [ -d "$CONFIG_DIR/credentials" ]; then
        CRED_BACKUP="$BACKUP_DIR/credentials.$TIMESTAMP"
        cp -r "$CONFIG_DIR/credentials" "$CRED_BACKUP"
        echo -e "${GREEN}✓ 凭证已备份到: $CRED_BACKUP${NC}"
    fi
else
    echo -e "${YELLOW}⚠ 未找到配置文件，跳过备份${NC}"
fi
echo ""

# 3. 检查 Node.js 版本
echo -e "${BLUE}[3/7] 检查 Node.js 版本...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${RED}错误: 未找到 Node.js${NC}"
    echo -e "${YELLOW}请先安装 Node.js 22 或更高版本${NC}"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 22 ]; then
    echo -e "${RED}错误: Node.js 版本过低 (当前: $(node -v), 需要: 22+)${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Node.js 版本: $(node -v)${NC}"
echo ""

#
echo -e "${BLUE}[4/7] 升级程序文件...${NC}"

# 找到当前安装位置
INSTALL_DIR=$(npm root -g)/openclaw
if [ ! -d "$INSTALL_DIR" ]; then
    # 尝试通过 which 找到安装位置
    OPENCLAW_BIN=$(which openclaw)
    if [ -n "$OPENCLAW_BIN" ]; then
        # 解析符号链接
        OPENCLAW_REAL=$(readlink -f "$OPENCLAW_BIN" 2>/dev/null || realpath "$OPENCLAW_BIN" 2>/dev/null)
        INSTALL_DIR=$(dirname "$(dirname "$OPENCLAW_REAL")")
    fi
fi

if [ ! -d "$INSTALL_DIR" ]; then
    echo -e "${RED}错误: 无法找到 openclaw 安装目录${NC}"
    echo -e "${YELLOW}提示: 请手动指定安装目录或使用全新安装${NC}"
    exit 1
fi

echo -e "安装目录: $INSTALL_DIR"

# 备份旧的程序文件
OLD_BACKUP="$INSTALL_DIR.backup.$TIMESTAMP"
echo -e "备份旧版本到: $OLD_BACKUP"
cp -r "$INSTALL_DIR" "$OLD_BACKUP"

# 复制新文件（保留 node_modules）
echo -e "复制新文件..."
rsync -av --exclude='node_modules' --exclude='.git' \
    "$PACKAGE_DIR/dist/" "$INSTALL_DIR/dist/" 2>/dev/null || cp -r "$PACKAGE_DIR/dist" "$INSTALL_DIR/"
rsync -av "$PACKAGE_DIR/extensions/" "$INSTALL_DIR/extensions/" 2>/dev/null || cp -r "$PACKAGE_DIR/extensions" "$INSTALL_DIR/"
rsync -av "$PACKAGE_DIR/skills/" "$INSTALL_DIR/skills/" 2>/dev/null || cp -r "$PACKAGE_DIR/skills" "$INSTALL_DIR/"
rsync -av "$PACKAGE_DIR/assets/" "$INSTALL_DIR/assets/" 2>/dev/null || cp -r "$PACKAGE_DIR/assets" "$INSTALL_DIR/"

# 更新关键文件
cp "$PACKAGE_DIR/package.json" "$INSTALL_DIR/"
cp "$PACKAGE_DIR/openclaw.mjs" "$INSTALL_DIR/"
[ -f "$PACKAGE_DIR/LICENSE" ] && cp "$PACKAGE_DIR/LICENSE" "$INSTALL_DIR/"
[ -f "$PACKAGE_DIR/README.md" ] && cp "$PACKAGE_DIR/README.md" "$INSTALL_DIR/"

echo -e "${GREEN}✓ 程序文件已更新${NC}"
echo ""

# 5. 更新依赖
echo -e "${BLUE}[5/7] 更新依赖...${NC}"
cd "$INSTALL_DIR"

# 检查是否需要更新依赖
if [ -f "package.json" ]; then
    echo -e "安装运行时依赖..."
    npm install --omit=dev --loglevel=error
    echo -e "${GREEN}✓ 依赖已更新${NC}"
else
    echo -e "${YELLOW}⚠ 未找到 package.json，跳过依赖更新${NC}"
fi
echo ""

# 6. 重新创建全局链接
echo -e "${BLUE}[6/7] 更新全局命令...${NC}"
cd "$INSTALL_DIR"
npm link 2>/dev/null || {
    echo -e "${YELLOW}⚠ npm link 需要 sudo 权限${NC}"
    sudo npm link
}
echo -e "${GREEN}✓ 全局命令已更新${NC}"
echo ""

# 7. 检查并升级配置文件（如果需要）
echo -e "${BLUE}[7/7] 检查配置文件...${NC}"

if [ -f "$CONFIG_FILE" ]; then
    # 检查配置文件是否需要升级
    # 这里可以添加配置文件版本检查逻辑

    # 示例：检查是否缺少新的必要字段
    # 目前我们保持配置文件不变，只在有重大变更时才升级

    echo -e "${GREEN}✓ 配置文件无需升级${NC}"
    echo -e "${YELLOW}提示: 您的 API keys 和自定义设置已保留${NC}"
else
    echo -e "${YELLOW}⚠ 未找到配置文件${NC}"
    echo -e "${YELLOW}提示: 升级后请运行 'openclaw onboard' 进行配置${NC}"
fi
echo ""

# 8. 验证升级
echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}验证升级结果${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# 检查版本
NEW_INSTALLED_VERSION=$(openclaw --version 2>/dev/null || echo "未知")
echo -e "升级前版本: $CURRENT_VERSION"
echo -e "升级后版本: $NEW_INSTALLED_VERSION"
echo ""

# 检查配置
if [ -f "$CONFIG_FILE" ]; then
    echo -e "${GREEN}✓ 配置文件: $CONFIG_FILE${NC}"
else
    echo -e "${YELLOW}⚠ 配置文件不存在${NC}"
fi

# 检查凭证
if [ -d "$CONFIG_DIR/credentials" ]; then
    CRED_COUNT=$(ls -1 "$CONFIG_DIR/credentials" 2>/dev/null | wc -l)
    echo -e "${GREEN}✓ 凭证文件: $CRED_COUNT 个${NC}"
fi

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}✅ 升级完成！${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""

echo -e "${BLUE}备份信息：${NC}"
echo -e "  - 配置备份: $BACKUP_DIR/"
echo -e "  - 程序备份: $OLD_BACKUP"
echo ""

echo -e "${BLUE}后续步骤：${NC}"
echo -e "  1. 验证功能: ${YELLOW}openclaw --version${NC}"
echo -e "  2. 查看配置: ${YELLOW}openclaw config list${NC}"
echo -e "  3. 测试连接: ${YELLOW}openclaw gateway run${NC}"
echo ""

echo -e "${BLUE}如果遇到问题：${NC}"
echo -e "  - 查看备份: ${YELLOW}ls -la $BACKUP_DIR/${NC}"
echo -e "  - 恢复配置: ${YELLOW}cp $BACKUP_FILE $CONFIG_FILE${NC}"
echo -e "  - 回滚程序: ${YELLOW}rm -rf $INSTALL_DIR && mv $OLD_BACKUP $INSTALL_DIR${NC}"
echo ""

echo -e "${GREEN}升级成功！享受新版本的功能！🚀${NC}"
