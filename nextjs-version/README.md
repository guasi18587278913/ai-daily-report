# AI 日报可视化 - Next.js 版本

基于 Next.js 构建的动态AI日报展示平台，支持日期路由和响应式设计。

## 🚀 功能特点

- **动态路由**: 支持基于日期的动态路由 (如: `/2025-07-12`)
- **响应式设计**: 适配桌面端和移动端
- **模块化组件**: 六大核心内容模块
  - 🔥 热门话题
  - 🛠 工具情报  
  - 💡 实战干货
  - 📊 行业动态
  - 💬 问答精选
  - ⚠️ 风险提示
- **静态生成**: 使用 Next.js SSG 提供极速加载体验
- **交互体验**: 丰富的悬停效果和平滑动画

## 📁 项目结构

```
nextjs-version/
├── components/           # React 组件
│   ├── Layout.js        # 主布局组件
│   ├── Navbar.js        # 导航栏
│   ├── Sidebar.js       # 侧边栏
│   ├── HotTopics.js     # 热门话题
│   ├── ToolNews.js      # 工具情报
│   ├── Practice.js      # 实战干货
│   ├── Industry.js      # 行业动态
│   ├── QA.js           # 问答精选
│   └── RiskWarning.js  # 风险提示
├── pages/
│   ├── index.js        # 首页 (自动跳转最新日报)
│   └── [date].js       # 动态日期页面
├── data/               # 数据文件
│   ├── index.json      # 日报索引
│   ├── 2025-07-11.json # 示例数据 1
│   └── 2025-07-12.json # 示例数据 2
└── package.json        # 项目配置
```

## 🛠 安装和运行

### 1. 安装依赖
```bash
cd nextjs-version
npm install
```

### 2. 开发环境运行
```bash
npm run dev
```
访问 http://localhost:3000 查看应用

### 3. 生产环境构建
```bash
npm run build
npm start
```

## 📝 数据格式

### 日报数据文件格式 (`data/{YYYY-MM-DD}.json`)

```json
{
  "date": "2025-07-12",
  "hotTopics": [
    {
      "title": "话题标题",
      "content": "话题内容",
      "keyData": "关键数据",
      "source": "信息来源", 
      "insight": "深度洞察"
    }
  ],
  "toolNews": [
    {
      "name": "工具名称",
      "description": "工具描述",
      "highlight": "突出亮点",
      "features": ["功能1", "功能2"],
      "pricing": "价格信息",
      "isNew": true,
      "link": "访问链接"
    }
  ],
  "practice": [
    {
      "title": "实践案例标题",
      "type": "tech|business",
      "method": "实现方法",
      "effect": "实现效果", 
      "keyData": "关键数据",
      "successFactors": "成功要素",
      "insights": "可复用经验"
    }
  ],
  "industry": [
    {
      "title": "行业动态标题",
      "type": "merger|funding|product|partnership",
      "description": "详细描述",
      "amount": "交易金额",
      "impact": "影响分析",
      "significance": "重要意义"
    }
  ],
  "qa": [
    {
      "question": "问题",
      "description": "问题描述",
      "answer": "详细回答"
    }
  ],
  "riskWarning": [
    {
      "title": "风险标题",
      "severity": "high|medium|low",
      "description": "风险描述",
      "impact": "影响范围", 
      "timeframe": "时间窗口",
      "suggestion": "建议措施",
      "preventive": "预防方案"
    }
  ]
}
```

### 索引文件格式 (`data/index.json`)

```json
{
  "reports": [
    {
      "date": "2025-07-12",
      "title": "AI日报 - 2025年7月12日", 
      "summary": "当日要点摘要"
    }
  ],
  "lastUpdated": "2025-07-12T10:00:00Z"
}
```

## 📅 添加新日报

1. 在 `data/` 目录下创建新的日期文件 (如: `2025-07-13.json`)
2. 按照数据格式填写内容
3. 更新 `data/index.json` 添加新记录
4. 重新构建应用: `npm run build`

## 🎨 自定义样式

每个组件都使用了 `styled-jsx` 进行样式管理，可以直接修改组件内的 `<style jsx>` 标签来调整样式。

### 主题色彩
- 主色调: `#579d8d` (青绿色)
- 辅助色: `#7ab5a8` (浅青绿) 
- 强调色: `#ef4444` (红色用于热门标签)
- 文字色: `#111827` (深灰色)

## 🔧 技术栈

- **框架**: Next.js 14.0.0
- **样式**: Styled JSX + CSS-in-JS
- **路由**: Next.js 动态路由
- **渲染**: 静态生成 (SSG)
- **部署**: 支持 Vercel、Netlify 等平台

## 📱 响应式设计

- **桌面端**: 侧边栏 + 主内容区布局
- **移动端**: 顶部导航 + 垂直布局
- **断点**: 768px (平板和手机)

## 🚀 部署建议

### Vercel 部署
1. 将代码推送到 GitHub
2. 连接 Vercel 账户
3. 导入项目并部署

### 静态导出
```bash
npm run build
npm run export
```

生成的静态文件在 `out/` 目录中，可以部署到任何静态托管服务。

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支: `git checkout -b feature/新功能`
3. 提交改动: `git commit -m '添加新功能'`
4. 推送分支: `git push origin feature/新功能` 
5. 提交 Pull Request

## 📄 许可证

MIT License - 详见 LICENSE 文件

## 🆘 常见问题

**Q: 如何修改页面标题？**
A: 在 `pages/[date].js` 中修改 `<Head>` 标签内容

**Q: 如何添加新的内容模块？**
A: 1) 在 `components/` 中创建新组件 2) 在 `pages/[date].js` 中引入并使用

**Q: 数据文件可以放在其他地方吗？**
A: 可以，需要修改 `pages/[date].js` 中的数据加载路径

**Q: 如何自定义主题颜色？**
A: 在各组件的 `<style jsx>` 中搜索替换颜色值