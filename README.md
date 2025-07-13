# AI日报可视化

最后更新：2025-07-13

AI行业群聊日报在线阅读站 - 将每日精炼的Markdown日报转化为易读、可检索、自动更新的静态网站。

## 功能特点

- 📱 **移动端适配** - 响应式设计，完美支持手机阅读
- 🎨 **Bento Grid设计** - 黑底橙色主题，现代化视觉风格
- 🔄 **自动更新** - 只需添加Markdown文件，自动生成新页面
- 📅 **历史浏览** - 支持按日期访问历史日报
- 🚀 **Apple风格动效** - 流畅的滚动动画体验
- 🔍 **结构化展示** - 自动解析日报板块，清晰展示内容

## 快速开始

### 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 访问 http://localhost:3000
```

### 部署到Vercel

1. 将项目推送到GitHub
2. 在Vercel中导入项目
3. Vercel会自动检测Next.js项目并部署

## 添加新日报

### 方式一：手动添加文件

1. 在 `daily/` 目录下创建新的Markdown文件
2. 文件命名格式：`YYYY-MM-DD.md`
3. 添加必要的frontmatter和内容
4. Git push，Vercel自动部署

### 方式二：通过AI助手

1. 将新日报内容发给AI助手
2. AI助手会创建对应的Markdown文件
3. Git push完成部署

## 文件结构

```
AI日报可视化/
├── daily/              # 日报存储目录
│   └── 2025-07-09.md   # 日报文件
├── pages/              # Next.js页面
│   ├── index.js        # 首页(显示最新一期)
│   └── [...date].js    # 动态路由(/2025/07/09)
├── package.json        # 项目配置
├── next.config.js      # Next.js配置
└── vercel.json         # Vercel部署配置
```

## Markdown文件格式

```markdown
---
title: "AI日报"
date: "2025-07-09"
dayOfWeek: "周三"
summary: "简短摘要"
highlights:
  - "要点1"
  - "要点2"
  - "要点3"
---

# 日期标题

## 📌 今日要点
内容...

## 🔥 热门话题
内容...

## 🛠 工具情报
内容...

## 💡 实战干货
内容...

## 📊 行业动态
内容...

## 💬 问答精选
内容...
```

## URL结构

- 首页：`/` - 显示最新一期日报
- 历史页面：`/2025/07/09/` - 显示指定日期的日报

## 技术栈

- **Next.js** - React框架，支持静态导出
- **Tailwind CSS** - 样式框架（CDN引入）
- **Framer Motion** - 动画库（CDN引入）
- **marked** - Markdown解析
- **gray-matter** - Frontmatter解析
- **Vercel** - 部署平台

## 自动化流程

1. 在 `daily/` 目录添加新的 `.md` 文件
2. Git push 到仓库
3. Vercel 自动触发构建
4. Next.js 生成静态页面
5. 网站自动更新，用户即可访问新内容

## 维护说明

这个项目设计为几乎零维护：

- ✅ 无需数据库
- ✅ 无需服务器
- ✅ 无需手动构建
- ✅ 只需添加Markdown文件

每天只需要：
1. 写好日报的Markdown文件
2. 保存到 `daily/` 目录
3. Git push

Vercel会自动完成其余所有工作。