#!/bin/bash

echo "🚀 AI日报GitHub上传助手"
echo "========================"

# 检查是否在正确的目录
if [ ! -f "index.html" ]; then
    echo "❌ 错误：请在deploy-files目录中运行此脚本"
    echo "正确路径：/Users/liyadong/Documents/GitHub/AI日报可视化/deploy-files"
    exit 1
fi

# 显示当前文件列表
echo "📁 准备上传的文件："
ls -la

echo ""
echo "确认上传到 https://github.com/guasi18587278913/ai-daily-report.git ? (y/n)"
read -r confirm

if [ "$confirm" != "y" ]; then
    echo "❌ 已取消上传"
    exit 1
fi

echo ""
echo "🔧 开始上传过程..."

# 1. 初始化Git仓库
echo "1️⃣ 初始化Git仓库..."
git init

# 2. 配置Git用户信息（如果需要）
echo "2️⃣ 配置Git信息..."
git config user.name "AI Daily Report"
git config user.email "ai-daily@example.com"

# 3. 添加所有文件
echo "3️⃣ 添加文件到Git..."
git add .

# 4. 创建首次提交
echo "4️⃣ 创建提交..."
git commit -m "🎉 初始化AI日报项目

- 添加主页面和完整版页面
- 包含2025-07-07至07-09三期日报
- 添加自动化脚本和说明文档
- 配置Netlify部署"

# 5. 设置远程仓库
echo "5️⃣ 连接到GitHub仓库..."
git remote add origin https://github.com/guasi18587278913/ai-daily-report.git

# 6. 推送到GitHub
echo "6️⃣ 推送到GitHub..."
if git push -u origin main; then
    echo "✅ 上传成功！"
    echo ""
    echo "🎉 文件已成功上传到GitHub！"
    echo "📎 仓库地址：https://github.com/guasi18587278913/ai-daily-report"
    echo ""
    echo "下一步：连接Netlify进行部署"
else
    echo "⚠️ 推送可能遇到问题，尝试同步远程更改..."
    if git pull origin main --allow-unrelated-histories; then
        echo "🔄 重新推送..."
        git push -u origin main
        echo "✅ 上传成功！"
    else
        echo "❌ 上传失败，请检查网络连接或GitHub权限"
        echo ""
        echo "💡 可能的解决方案："
        echo "1. 检查网络连接"
        echo "2. 确认GitHub仓库地址正确"
        echo "3. 检查Git权限设置"
    fi
fi

echo ""
echo "📋 接下来可以："
echo "1. 访问 https://github.com/guasi18587278913/ai-daily-report 确认文件"
echo "2. 继续Netlify部署流程"