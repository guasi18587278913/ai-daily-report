#!/bin/bash

# AI日报一键更新和部署脚本

echo "🚀 AI日报更新助手"
echo "=================="

# 获取今天的日期
TODAY=$(date +%Y-%m-%d)
WEEKDAY=$(date +%A | sed 's/Monday/周一/;s/Tuesday/周二/;s/Wednesday/周三/;s/Thursday/周四/;s/Friday/周五/;s/Saturday/周六/;s/Sunday/周日/')

# 检查是否已有今日文件
FILENAME="daily/$TODAY.md"
if [ -f "$FILENAME" ]; then
    echo "✅ 找到今日日报文件"
else
    echo "📝 创建今日日报模板..."
    ./add-daily-report.sh
fi

# 询问是否更新JSON
echo ""
echo "是否转换为JSON格式? (y/n)"
read -r convert_json

if [ "$convert_json" = "y" ]; then
    echo "🔄 转换Markdown为JSON..."
    node convert-md-to-json.js
    echo "✅ JSON转换完成"
fi

# 检查Git状态
if ! git status &>/dev/null; then
    echo "❌ 当前目录不是Git仓库"
    echo "请先初始化Git仓库："
    echo "git init"
    echo "git remote add origin YOUR_REPO_URL"
    exit 1
fi

# 显示变更
echo ""
echo "📋 检测到以下变更："
git status --short

echo ""
echo "是否提交并推送到GitHub? (y/n)"
read -r deploy_confirm

if [ "$deploy_confirm" = "y" ]; then
    # 提交变更
    git add .
    
    # 生成提交信息
    if [ -f "$FILENAME" ]; then
        COMMIT_MSG="📅 添加 $TODAY ($WEEKDAY) 日报"
    else
        COMMIT_MSG="🔧 更新日报内容"
    fi
    
    git commit -m "$COMMIT_MSG"
    
    # 推送到远程
    echo "🚀 推送到GitHub..."
    if git push origin main; then
        echo "✅ 推送成功！"
        echo ""
        echo "🌐 网站将在1-2分钟内自动更新"
        echo "访问：https://your-site-name.netlify.app"
    else
        echo "❌ 推送失败，请检查网络连接和权限"
    fi
else
    echo "⏸️  已取消推送"
fi

echo ""
echo "🎉 操作完成！"