# ✨ Personal Gallery - 现代化开发者作品集

[![使用 Vercel 部署](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2F424635328%2Fpersonal-gallery&project-name=my-personal-gallery&repository-name=my-personal-gallery)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![GitHub Stars](https://img.shields.io/github/stars/424635328/personal-gallery?style=for-the-badge&logo=github&color=FFD700)](https://github.com/424635328/personal-gallery/stargazers)

这是一个使用 Next.js, TypeScript, 和 Framer Motion 构建的，具有高度交互性和现代设计感的个人作品集网站。项目旨在通过优雅的动画和清晰的信息架构，全方位展示开发者的技术实力与个人品牌。

**🚀 在线体验:** [https://your-gallery-url.vercel.app](https://your-gallery-url.vercel.app)  <!-- 请将此链接替换为您部署后的地址 -->

![项目截图预览](public/images/project-preview.png)
<!-- 建议您截取一张网站的精美截图，并命名为 project-preview.png 放在 public/images/ 目录下 -->

---

## 核心特性

- **沉浸式全屏页面**: 采用 CSS `scroll-snap` 技术，实现引人入胜的全屏滚动浏览体验，尤其在“关于”页面。
- **3D 交互式卡片**: “项目”页面中的卡片会对鼠标悬停做出响应，产生平滑的 3D 倾斜效果，并带有辉光反馈。
- **动态数据驱动**: 整个网站的内容（项目、技能、博客、个人信息）均由 `src/data` 目录下的 TypeScript 文件驱动，易于集中管理和更新。
- **杂志风格博客**: 采用非对称网格布局，包含醒目的精选文章和带流畅动画的动态分类筛选功能。
- **企业级技能矩阵**: 多维度、可视化地展示硬技能与软技能，包含熟练度条，全面展现个人能力。
- **故事化个人介绍**: “关于”页面通过精美的职业生涯时间线，讲述开发者的成长故事。
- **开发者友好型联系方式**: 将反馈和交流渠道直接引导至 GitHub Issues，拥抱开源协作模式。
- **优雅的动画与过渡**: 全站广泛使用 Framer Motion 实现页面过渡、元素入场和令人愉悦的微交互动画。
- **无缝页面导航**: 集成 `NProgress` 库，在页面切换时提供一个轻量、无干扰的顶部加载条，提升用户体验。
- **响应式设计**: 为桌面和移动设备分别设计了导航栏，确保在所有设备上都有一致的优质体验。

## 🛠️ 技术栈

| 类别             | 技术/库                                                                  | 用途说明                                           |
| ---------------- | ------------------------------------------------------------------------ | -------------------------------------------------- |
| **核心框架**     | [Next.js](https://nextjs.org/) (App Router) & [React](https://react.dev/) | 构建高性能、支持服务端渲染的现代化 Web 应用。        |
| **语言**         | [TypeScript](https://www.typescriptlang.org/)                            | 提供静态类型检查，提升代码健壮性和可维护性。       |
| **UI & 样式**    | [Tailwind CSS](https://tailwindcss.com/)                                 | 用于快速构建响应式界面的原子化 CSS 框架。          |
| **UI 组件**      | [shadcn/ui](https://ui.shadcn.com/)                                      | 可组合、可访问的组件库，易于定制。                 |
| **动画**         | [Framer Motion](https://www.framer.com/motion/)                          | 实现声明式的、富有表现力的动画效果。               |
| **图标**         | [Lucide React](https://lucide.dev/)                                      | 简洁、一致、可定制的图标库。                       |
| **日期处理**     | [date-fns](https://date-fns.org/)                                        | 用于格式化日期，如博客和项目时间。                 |
| **导航进度条**   | [NProgress](https://github.com/rstacruz/nprogress)                       | 用于在客户端页面跳转时显示一个纤细的加载进度条。   |
| **主题切换**     | [next-themes](https://github.com/pacocoursey/next-themes)                | 在 Next.js 中轻松实现暗黑模式和主题管理。          |
| **部署**         | [Vercel](https://vercel.com/)                                            | 专为 Next.js 优化的全球化 Serverless 部署平台。    |

## 📂 项目结构

项目遵循功能驱动的结构，将相关的逻辑、组件和数据组织在一起，便于查找和维护。

```
personal-gallery/
├── public/
│   ├── images/              # 存放所有静态图片资源 (头像, 项目封面等)
│   └── favicon.ico          # 网站图标
│
├── src/
│   ├── app/                 # Next.js App Router 核心目录，包含所有页面和布局
│   │   ├── about/           # “关于”页面
│   │   ├── blog/            # “博客”页面
│   │   ├── contact/         # “联系”页面
│   │   ├── projects/        # “项目”页面
│   │   ├── skills/          # “技能”页面
│   │   ├── globals.css      # 全局样式
│   │   ├── layout.tsx       # 全局根布局
│   │   └── page.tsx         # 网站首页 (Landing Page)
│   │
│   ├── components/
│   │   ├── about/           # “关于”页面的专属组件 (e.g., timeline-item.tsx)
│   │   ├── layout/          # 布局相关组件
│   │   │   ├── header/      # 导航栏组件
│   │   │   │   ├── DesktopNav.tsx
│   │   │   │   ├── Header.tsx
│   │   │   │   └── MobileNav.tsx
│   │   │   ├── AnimatedGradientBackground.tsx # 动画渐变背景
│   │   │   ├── AuroraBackground.tsx           # 极光背景
│   │   │   ├── NavigationEvents.tsx         # 导航事件监听器 (用于NProgress)
│   │   │   ├── NProgressProvider.tsx          # NProgress 提供者
│   │   │   ├── ThemeProvider.tsx              # 主题提供者 (用于 next-themes)
│   │   │   └── ThemeToggle.tsx                # 主题切换按钮
│   │   ├── ui/              # shadcn/ui 生成的基础 UI 组件
│   │   └── project-card.tsx   # 项目卡片组件
│   │
│   ├── config/
│   │   └── nav.ts             # 导航栏链接配置数据
│   │
│   ├── data/                # ❗️ 核心内容数据源
│   │   ├── blog-data.ts     # 博客文章数据
│   │   ├── projects.ts      # 项目列表数据
│   │   └── skills-data.ts   # 技能矩阵数据
│   │
│   └── lib/
│       └── utils.ts         # 工具函数 (e.g., cn for classnames)
│
├── package.json
└── README.md
```

## 🚀 快速开始 (本地开发)

### 1. 先决条件

- [Node.js](https://nodejs.org/en/) (v18.x 或更高版本)
- [pnpm](https://pnpm.io/) (推荐), `npm`, 或 `yarn`

### 2. 安装步骤

1. **克隆仓库**

    ```bash
    git clone https://github.com/424635328/personal-gallery.git
    cd personal-gallery
    ```

2. **安装依赖**

    ```bash
    pnpm install
    # 或者 npm install / yarn install
    ```

3. **准备静态资源**
    - 确保 `public/images/` 目录下有项目所需的图片。如果没有，应用可能会因图片路径错误而构建失败。
    - 至少需要一个 `public/images/avatar.png` 作为头像。
    - 项目和博客数据中引用的图片也需要放置在对应路径下。

4. **运行开发服务器**

    ```bash
    pnpm dev
    # 或者 npm run dev / yarn dev
    ```

    在浏览器中打开 `http://localhost:3000` 即可看到您的作品集网站。

## 💡 内容管理指南 (非常重要!)

本项目的核心设计理念是“数据与视图分离”。您**几乎不需要修改页面组件**来更新内容，只需要编辑 `src/data/` 和 `src/config` 目录下的 TypeScript 文件。

### 更新导航栏

编辑 `src/config/nav.ts` 文件来添加、删除或修改导航链接。

### 更新项目 (`/projects`)

编辑 `src/data/projects.ts` 文件。`Project` 对象的结构如下：

```typescript
// 示例
{
  id: 'proj-offerscore',
  title: 'OfferScore™',
  subtitle: '数据驱动的职业决策智能助手',
  description: '...',
  imageUrl: '/images/project-01.png', // 确保图片存在于 public/images/
  tags: ['Next.js', 'TypeScript', 'Supabase'],
  highlights: [
    '十余种沉浸式动态主题...',
    '六维度权重智能评估模型...',
  ],
  liveUrl: 'https://offerscore.vercel.app/',
  sourceUrl: 'https://github.com/424635328/OfferScore',
  status: 'completed',
  date: '2024-05-01',
  client: '个人全栈项目',
}
```

### 更新技能 (`/skills`)

编辑 `src/data/skills-data.ts` 文件。您可以修改 `skillCategories` (硬技能) 和 `softSkills` (软技能)。熟练度等级 (`level`) 为 1 到 5。

```typescript
// 示例
{
  name: '前端工程',
  icon: <Code className="h-6 w-6" />,
  skills: [
    { name: 'TypeScript', level: 5, description: '...' },
    { name: 'React & Next.js', level: 5, description: '...' },
  ],
}
```

### 更新博客 (`/blog`)

编辑 `src/data/blog-data.ts` 文件。`featured: true` 的文章将作为精选文章在博客页顶部展示。

```typescript
// 示例
{
  id: 'post-01',
  slug: 'mastering-react-hooks-in-depth', // 用于生成 URL
  title: '深入理解 React Hooks...',
  excerpt: '...',
  imageUrl: '/images/blog/blog-react-hooks.png',
  category: '技术深潜',
  date: '2024-05-15',
  readingTime: 12, // 阅读时间（分钟）
  featured: true,
}
```

### 更新个人信息 (`/about`)

直接修改 `src/app/about/page.tsx` 中的文本内容和 `TimelineItem` 组件的数据。

## 部署

本项目已为 Vercel 部署进行全面优化。

1. 将您的仓库推送到 GitHub。
2. 登录 Vercel 并选择 "Add New... -> Project"。
3. 导入您的 GitHub 仓库。
4. Vercel 会自动识别为 Next.js 项目并使用正确的配置。
5. 点击 "Deploy"。部署将在几分钟内完成。

## 🤝 贡献

欢迎任何形式的贡献！如果您有任何建议或发现 Bug，请随时：

- Fork 本仓库。
- 创建一个新的功能分支 (`git checkout -b feature/AmazingFeature`)。
- 提交您的更改 (`git commit -m 'feat: Add some AmazingFeature'`)。
- 推送到分支 (`git push origin feature/AmazingFeature`)。
- **开启一个 Pull Request**。

或者，您可以直接通过 [GitHub Issues](https://github.com/424635328/personal-gallery/issues) 提出您的想法。

## 📄 许可证

本项目采用 [MIT](LICENSE) 许可证。
