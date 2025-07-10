# AI日报 - 每日精选AI资讯

## 📖 项目介绍

AI日报是一个展示每日AI资讯的现代化网站，采用响应式设计，支持自动化部署。

## 🚀 在线访问

访问地址：[AI日报网站](https://ai-daily-report.netlify.app)

## 📝 更新日报

### 方法一：GitHub网页操作
1. 进入 `daily` 文件夹
2. 点击 "Add file" → "Create new file"
3. 文件名：`YYYY-MM-DD.md`
4. 编写内容后提交

### 方法二：本地脚本
```bash
# 创建新日报
./add-daily-report.sh

# 一键更新部署
./update-and-deploy.sh
```

## 📁 项目结构

```
├── index.html                        # 主页面
├── multi-day-complete-enhanced.html  # 完整版页面
├── data/
│   └── index.json                    # 日报索引
├── daily/                            # 日报源文件
│   ├── 2025-07-08.md
│   └── 2025-07-09.md
├── convert-md-to-json.js             # 转换脚本
├── add-daily-report.sh               # 创建日报脚本
└── update-and-deploy.sh              # 一键部署脚本
```

## 🔧 技术栈

- 前端：HTML5 + CSS3 + JavaScript
- 样式：Tailwind CSS
- 图标：Font Awesome
- 部署：Netlify
- 版本控制：Git + GitHub

## 📞 联系方式

如有问题，欢迎提交 Issue 或 Pull Request。