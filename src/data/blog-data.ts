// src/data/blog-data.ts

export interface Post {
  id: string;
  slug: string; // 用于生成文章页面的URL, e.g., /blog/mastering-react-hooks
  title: string;
  excerpt: string; // 文章摘要
  imageUrl: string;
  category: '技术深潜' | '设计思考' | '职业成长' | '项目复盘';
  date: string;
  readingTime: number; // in minutes
  featured?: boolean; // 是否为精选文章
}

export const blogPosts: Post[] = [
  {
    id: 'post-01',
    slug: 'mastering-react-hooks-in-depth',
    title: '深入理解 React Hooks：从原理到最佳实践',
    excerpt: 'Hooks 是 React 的一项革命性功能，但要真正掌握它并非易事。本文将带你深入其设计哲学、实现原理，并探讨常见的性能陷阱与最佳实践。',
    imageUrl: '/panels/panel-1.jpg', // 请准备相应的图片
    category: '技术深潜',
    date: '2024-05-15',
    readingTime: 12,
    featured: true, // 这是我们的精选文章
  },
  {
    id: 'post-02',
    slug: 'the-art-of-ui-ux-microinteractions',
    title: '设计的灵魂：UI/UX 中的微交互艺术',
    excerpt: '一个按钮的悬停效果，一次成功的提交反馈...正是这些微小的交互细节，构成了卓越的用户体验。本文探讨了微交互的设计原则与实现技巧。',
    imageUrl: '/panels/panel-2.jpg',
    category: '设计思考',
    date: '2024-04-22',
    readingTime: 8,
  },
  {
    id: 'post-03',
    slug: 'building-a-scalable-backend-with-serverless',
    title: '用 Serverless 构建可扩展的后端服务',
    excerpt: 'Serverless 架构正在改变我们构建后端的方式。本文将分享我使用 Vercel Functions 和 Supabase 构建高可用、低成本后端服务的实战经验。',
    imageUrl: '/panels/panel-3.jpg',
    category: '技术深潜',
    date: '2024-03-18',
    readingTime: 10,
  },
  {
    id: 'post-04',
    slug: 'from-developer-to-architect',
    title: '从开发者到架构师的演进之路',
    excerpt: '成为架构师不仅仅是技术能力的提升，更是思维模式的转变。本文记录了我对系统设计、技术选型和团队领导力的一些思考。',
    imageUrl: '/panels/panel-4.jpg',
    category: '职业成长',
    date: '2024-02-25',
    readingTime: 9,
  },
  {
    id: 'post-05',
    slug: 'offerscore-project-retrospective',
    title: 'OfferScore™ 项目复盘：从创意到上线的全过程',
    excerpt: '一个成功的个人项目背后有哪些思考和权衡？本文将复盘 OfferScore™ 项目，分享从需求分析、技术选型到部署运维的完整心路历程。',
    imageUrl: '/panels/panel-1.jpg', // 复用项目图片
    category: '项目复盘',
    date: '2024-06-01',
    readingTime: 15,
  },
];

export const blogCategories = ['All', '技术深潜', '设计思考', '职业成长', '项目复盘'];