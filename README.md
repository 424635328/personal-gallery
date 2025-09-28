<div align="center">
  <img src="public/logo.jpeg" alt="Project Logo" width="120" />
  <h1>✨ Personal Gallery - 现代交互式开发者作品集</h1>
  <p>一个为追求极致用户体验和视觉表达的开发者量身打造的现代化作品集模板。</p>
  
  [![使用 Vercel 部署](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2F424635328%2Fpersonal-gallery&project-name=my-personal-gallery&repository-name=my-personal-gallery)
  
  <p>
    <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge" alt="License: MIT"></a>
    <a href="https://github.com/424635328/personal-gallery/stargazers"><img src="https://img.shields.io/github/stars/424635328/personal-gallery?style=for-the-badge&logo=github&color=FFD700" alt="GitHub Stars"></a>
    <a href="https://github.com/424635328/personal-gallery/forks"><img src="https://img.shields.io/github/forks/424635328/personal-gallery?style=for-the-badge&logo=github&color=9cf" alt="GitHub Forks"></a>
  </p>
</div>

这是一个使用 **Next.js (App Router)**, **TypeScript**, 和 **Framer Motion** 构建的，具有高度交互性和深度主题化能力的个人作品集模板。它不仅是一个展示项目的平台，其本身就是一个精心雕琢的前端艺术品。

**🚀 在线体验:** [https://pgal.vercel.app/](https://pgal.vercel.app/)

---

## 🏛️ 设计哲学

- **代码即设计 (Code as Design)**: 我们相信最好的用户界面是通过代码精心实现的。本项目的每一个像素、每一个动画都由代码精确控制，确保了设计的保真度和性能的极致。
- **体验至上 (Experience First)**: 功能是基础，但体验决定高度。从全屏滚动吸附到微小的 `hover` 效果，所有设计都旨在为访问者创造一段流畅、愉悦、难忘的浏览旅程。
- **内容驱动 (Content-Driven)**: 视图应服务于内容。通过将所有核心内容（项目、技能、博客）数据化并与组件分离，我们使得内容的更新变得前所未有的简单，让开发者能更专注于展示自己，而非修改代码。
- **个性化与身份 (Personality & Identity)**: 一个作品集是开发者个人品牌的延伸。内置的深度主题化系统，允许用户通过简单的 CSS 变量修改，就能将网站变成完全符合自己个性的独特风格。

---

## 核心特性

#### 🎨 视觉与交互

- **沉浸式全屏滚动**: 采用 CSS `scroll-snap` 技术，将首页和“关于”页转化为如丝般顺滑的“幻灯片”式浏览体验，让故事的讲述更具沉浸感。
- **3D 辉光卡片**: “项目”页面的卡片不仅响应鼠标悬停产生 3D 倾斜，更带有一个跟随光标的辉光效果，创造出引人注目的视觉焦点。
- **动态主题系统**: 内置 **10+** 种风格迥异的动态主题，从“深空科技”到“禅意水墨”，所有组件、动画、甚至背景效果都能一键切换，完美适配。
- **滚动关联动画**: 页面元素能与用户的滚动行为实时同步。例如，“工作流”板块的进度条会随着滚动动态“激活”，提供强烈的视觉引导。

#### ⚙️ 功能与架构

- **数据驱动**: 整个网站的内容（项目、技能、博客）均由 `src/data` 目录下的 TypeScript 文件集中管理，更新内容无需触碰业务逻辑代码。
- **模块化区块**: 首页由多个独立的区块组件构成（如`HeroSection`, `FeatureCards`），结构清晰，可复用性强，便于二次开发。
- **企业级代码质量**: 采用 **ESLint** 和 **Prettier** 保证代码风格一致，通过 **Husky** 和 **lint-staged** 在提交前自动校验，确保入库代码的高质量。
- **无缝导航体验**: 集成 `NProgress` 库，在页面切换时提供顶部加载条；通过 **React Context** 共享滚动容器引用，实现了**滚动时自动隐藏/显示导航栏**和**一键返回顶部/底部**等高级功能。

#### 📱 兼容性与性能

- **完全响应式**: 精心设计的移动端专属导航和流式布局，确保在任何尺寸的设备上都有一致的、无妥协的优质体验。
- **性能优先**: 基于 Next.js 的服务端渲染 (SSR) 和静态站点生成 (SSG) 能力，结合 `next/image` 的自动图片优化，确保了极快的加载速度和优异的核心 Web 指标。

---

## 🛠️ 技术栈深度解析

| 类别          | 技术/库                                                                                                                                                           | 选型理由与深度应用                                                                                                    |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| **核心框架**  | [Next.js](https://nextjs.org/) (App Router) & [React](https://react.dev/)                                                                                         | 利用 App Router 实现更精细的布局控制和服务端/客户端组件混合渲染，最大化性能与开发效率。                               |
| **语言**      | [TypeScript](https://www.typescriptlang.org/)                                                                                                                     | 为所有数据结构（如项目、博客）提供强类型定义，使得内容管理安全、可预测，并提供卓越的 IDE 支持。                       |
| **UI & 样式** | [Tailwind CSS](https://tailwindcss.com/)                                                                                                                          | 通过原子化类和 `@apply` 指令，在 `globals.css` 中构建了一套强大的、基于 CSS 变量的主题系统。                          |
| **UI 组件**   | [shadcn/ui](https://ui.shadcn.com/)                                                                                                                               | 并非传统组件库，而是可直接复制代码进行二次开发的基础组件，提供了极高的灵活性和定制性。                                |
| **动画**      | [Framer Motion](https://www.framer.com/motion/)                                                                                                                   | 其强大的 `useScroll`, `useTransform` 等 Hooks 是实现滚动关联动画的核心；`layoutId` 则用于创建平滑的元素位置切换动画。 |
| **状态管理**  | [React Context](https://react.dev/learn/passing-data-deeply-with-context)                                                                                         | 轻量级地解决了跨层级组件通信问题，如将 `<main>` 滚动容器的引用共享给 `<Header>` 和 `<GoToTopBottom>` 组件。           |
| **代码质量**  | [ESLint](https://eslint.org/), [Prettier](https://prettier.io/), [Husky](https://typicode.github.io/husky/), [lint-staged](https://github.com/okonet/lint-staged) | 构成了一套完整的自动化代码规范工作流，从编码、暂存到提交，全程保障代码质量。                                          |
| **部署**      | [Vercel](https://vercel.com/)                                                                                                                                     | 作为 Next.js 的母公司，提供了无与伦比的集成度、全球 CDN 加速和简易的部署体验。                                        |

<details>
  <summary><strong>查看其他库...</strong></summary>
  
  | 类别             | 技术/库                                                                  | 用途说明                                         |
  | ---------------- | ------------------------------------------------------------------------ | ------------------------------------------------ |
  | **图标**         | [Lucide React](https://lucide.dev/), [React Icons](https://react-icons.github.io/react-icons/) | 提供了丰富、简洁、一致的图标资源。                     |
  | **日期处理**     | [date-fns](https://date-fns.org/)                                        | 用于格式化日期，如博客和项目时间。               |
  | **导航进度条**   | [NProgress](https://github.com/rstacruz/nprogress)                       | 用于在客户端页面跳转时显示一个纤细的加载进度条。 |
  | **主题切换**     | [next-themes](https://github.com/pacocoursey/next-themes)                | 在 Next.js 中轻松实现暗黑模式和主题管理。        |
</details>

---

## 📂 项目结构导览

```
personal-gallery/
├── public/                 # 静态资源 (图片, Logo, 字体文件等)
├── src/
│   ├── app/                # Next.js App Router
│   │   ├── (main)/          # 路由组, 用于共享布局
│   │   │   ├── about/       # “关于”页面
│   │   │   ├── blog/        # “博客”页面
│   │   │   ├── ...          # 其他页面
│   │   │   └── layout.tsx   # 客户端布局 (应用主题, 上下文等)
│   │   ├── api/             # API 路由 (如果需要)
│   │   ├── globals.css      # 🔥 全局样式 & 所有主题变量的定义之处
│   │   └── layout.tsx       # 根服务端布局 (定义<html>, <body>, 和 metadata)
│   │
│   ├── components/
│   │   ├── layout/          # 全局布局组件
│   │   │   ├── header/      # 导航栏 (包含滚动隐藏逻辑)
│   │   │   ├── GoToTopBottom.tsx # 返回顶部/底部按钮
│   │   │   └── ThemeToggle.tsx   # 主题切换组件
│   │   ├── sections/
│   │   │   └── home/        # ❗️ 首页的所有区块组件, 每个都是一个独立的故事章节
│   │   └── ui/              # shadcn/ui 基础 UI 组件
│   │
│   ├── contexts/
│   │   └── ScrollContext.tsx# ❗️ 全局滚动上下文, 实现 Header 等与主滚动区解耦
│   │
│   ├── data/                # ❗️ 核心内容数据源, 更新这里即可更新网站
│   │
│   └── lib/                 # 辅助函数和库的配置
│
├── .eslintrc.json           # ESLint 配置文件
├── .prettierrc.json         # Prettier 配置文件
├── next.config.js           # Next.js 配置文件
└── tailwind.config.ts       # Tailwind CSS 配置文件 (包含自定义动画)
```

---

## 🚀 快速开始

1.  **克隆仓库**

    ```bash
    git clone https://github.com/424635328/personal-gallery.git && cd personal-gallery
    ```

2.  **安装依赖**

    ```bash
    pnpm install
    ```

3.  **运行开发服务器**
    ```bash
    pnpm dev
    ```
    在浏览器中打开 `http://localhost:3000`。

---

## 💡 定制化指南

### 1. 修改主题或创建新主题

- **核心文件**: `src/app/globals.css`
- **修改现有主题**: 在 `@layer base` 中找到相应的主题 `class` (如 `.theme-zen-ink`)，调整其下的 CSS 变量即可实时预览效果。
- **创建新主题**:
  1.  在 `globals.css` 中复制一个现有主题，重命名 `class` 并调整颜色。
  2.  在 `src/components/layout/ThemeProvider.tsx` 的 `themes` 数组中添加你的新主题名。
  3.  在 `src/components/layout/ThemeToggle.tsx` 的 `themes` 数组中添加新主题的配置。

### 2. 更新内容

- **项目/技能/博客**: 直接修改 `src/data/` 目录下对应的 `*.ts` 文件即可。所有类型定义都已预设好，享受 TypeScript 带来的智能提示吧！
- **首页板块**: 每个板块的内容都在其对应的组件文件中（`src/components/sections/home/*.tsx`）。例如，要修改“工作流”的步骤，请编辑 `WorkflowSection.tsx` 中的 `workflowSteps` 数组。

### 3. 调整动画

- **Header 滚动灵敏度**: 编辑 `src/components/layout/header/Header.tsx`，在 `handleScroll` 函数中修改 `if (currentScrollY > 100)` 的阈值。
- **卡片 3D 效果**: 编辑 `src/components/project-card.tsx` (或其他卡片)，调整 `useTransform` 中的范围值来改变倾斜的幅度。

---

## 性能考量

- **代码分割**: Next.js App Router 自动按页面进行代码分割，只加载当前页面所需的 JavaScript。
- **图片优化**: 使用 `next/image` 自动处理图片大小、格式转换 (WebP) 和懒加载。
- **React Server Components**: 尽可能使用服务端组件来减少发送到客户端的 JavaScript 体积。
- **轻量级动画**: `Framer Motion` 针对性能进行了优化，尽可能使用硬件加速的 CSS `transform` 和 `opacity` 属性。

---

## 🤝 贡献

我们欢迎任何形式的贡献！如果您有任何建议或发现 Bug，请随时：

- Fork 本仓库。
- 创建您的功能分支 (`git checkout -b feature/YourAmazingFeature`)。
- 提交您的更改 (`git commit -m 'feat: Add some amazing feature'`)。
- 推送到分支 (`git push origin feature/YourAmazingFeature`)。
- **开启一个 Pull Request**。

或者，您可以直接通过 [**GitHub Issues**](https://github.com/424635328/personal-gallery/issues) 提出您的想法。

---

## 📄 许可证

本项目采用 [**MIT**](LICENSE) 许可证。
