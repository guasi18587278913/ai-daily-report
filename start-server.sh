#!/bin/bash

# 启动本地服务器脚本

echo "🚀 正在启动AI日报可视化服务器..."
echo "📍 地址: http://localhost:8000"
echo "📄 主页: http://localhost:8000/ai-daily-complete.html"
echo ""
echo "按 Ctrl+C 停止服务器"
echo "----------------------------------------"

# 启动Python HTTP服务器
python3 -m http.server 8000