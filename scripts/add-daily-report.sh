#!/bin/bash

# AI日报快速添加脚本

# 获取今天的日期
TODAY=$(date +%Y-%m-%d)
WEEKDAY=$(date +%A | sed 's/Monday/周一/;s/Tuesday/周二/;s/Wednesday/周三/;s/Thursday/周四/;s/Friday/周五/;s/Saturday/周六/;s/Sunday/周日/')

# 创建日报文件
FILENAME="daily/$TODAY.md"

# 检查文件是否已存在
if [ -f "$FILENAME" ]; then
    echo "❌ 文件已存在: $FILENAME"
    echo "是否要编辑现有文件? (y/n)"
    read -r answer
    if [ "$answer" = "y" ]; then
        ${EDITOR:-vi} "$FILENAME"
    fi
    exit 0
fi

# 创建模板
cat > "$FILENAME" << EOF
---
title: "AI日报"
date: "$TODAY"
dayOfWeek: "$WEEKDAY"
summary: "在这里添加今日总结"
highlights:
  - "第一个要点"
  - "第二个要点"
  - "第三个要点"
---

# ${TODAY#2025-}（$WEEKDAY）

## 🔥 今日热点 TOP 3

### 1. 标题1
- **核心内容**：
- **关键数据**：
- **重要观点**：

### 2. 标题2
- **核心内容**：
- **关键数据**：
- **重要观点**：

### 3. 标题3
- **核心内容**：
- **关键数据**：
- **重要观点**：

---

## 🛠️ 工具动态

### 新工具/新功能
- **工具名称**：
  - 功能描述：
  - 亮点：

### 实用技巧
- **问题**：
- **解决方案**：

---

## 💡 实战经验

### 技术实践
- **案例名称**：
- **实现方法**：
- **可复用经验**：

### 商业案例
- **项目/产品**：
- **关键数据**：
- **成功要素**：

---

## 📊 行业情报

### 大公司动态
- **公司名**：动态描述

### 融资与收购
- **项目名**：金额，轮次

---

## 🎯 实用资源

### 工具推荐
| 工具名称 | 用途 | 价格 | 获取方式 |
|---------|------|------|---------|
| 工具1 | 描述 | 免费/付费 | 链接 |

### 教程与文档
- **资源名称**：简介和链接

---

## 💰 价格情报站

### 主流工具价格对比
| 产品/服务 | 官方价格 | 第三方渠道 | 注意事项 |
|----------|---------|-----------|---------|
| 产品1 | $X/月 | ¥Y/月 | 说明 |

---

## ❓ 热门问答

**Q1: 问题？**
- **最佳答案**：回答内容

**Q2: 问题？**
- **最佳答案**：回答内容

---

## 🚨 风险提醒

- **风险1**：说明
- **风险2**：说明

---

## 🌟 今日金句

> "金句内容" —— 来源
EOF

echo "✅ 已创建日报文件: $FILENAME"
echo ""
echo "接下来："
echo "1. 编辑文件: ${EDITOR:-vi} $FILENAME"
echo "2. 转换为JSON: node convert-md-to-json.js"
echo "3. 提交更改: git add . && git commit -m 'Add $TODAY daily report'"
echo ""
echo "是否立即编辑? (y/n)"
read -r answer

if [ "$answer" = "y" ]; then
    ${EDITOR:-vi} "$FILENAME"
fi