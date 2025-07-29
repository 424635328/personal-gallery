// src/data/skills-data.ts

// 确保在你的 page.tsx 的 iconMap 中添加这些新图标
// ShoppingCart, Users, Megaphone, Milestone, Lightbulb
import {
  Code, Database, Server, Cloud, PenTool, BrainCircuit, TestTube2, GitBranch,
  Palette, Component, ShoppingCart, Users, Megaphone, Milestone, Lightbulb
} from 'lucide-react';

// --- 类型定义 ---
export interface Skill {
  name: string;
  iconName: string;
  level: number;
  levelText: '探索中' | '熟练' | '精通' | '专家' | '布道师';
  description: string;
  strengths: {
    title: string;
    description: string;
  }[];
  philosophy: string;
  bestPairedWith?: string[];
  learningNote: string;
  funFact?: string;
  projects?: string[];
}

export interface SkillCategory {
  name:string;
  iconName: string;
  skills: Skill[];
}

// --- 核心数据 ---
export const skillsData: SkillCategory[] = [
  {
    name: '前端工程',
    iconName: 'Code',
    skills: [
      {
        name: 'TypeScript',
        iconName: 'Code',
        level: 95,
        levelText: '专家',
        description: '作为大型应用开发的基石，TypeScript 为 JavaScript 注入了静态类型的严谨性，让代码在编写阶段就能规避大量潜在错误。',
        strengths: [
          { title: '类型安全', description: '构建健壮、可预测的系统，重构时信心十足。' },
          { title: '卓越的工具链', description: '享受顶级的自动补全、代码导航和智能提示。' },
          { title: '渐进式集成', description: '可以与现有 JavaScript 项目无缝协作，逐步迁移。' },
        ],
        philosophy: '“代码即文档”的终极体现。类型定义是最好的注释，也是最可靠的契约。',
        bestPairedWith: ['React', 'Node.js', 'VS Code', 'Zod'],
        learningNote: '真正的挑战在于设计恰到好处的类型，而非过度工程化。避免滥用 `any` 是纪律，更是艺术。',
        funFact: 'TypeScript 的创造者 Anders Hejlsberg 也是 C# 和 Delphi 的首席架构师。可谓是大师手笔！',
        projects: ['proj-offerscore', 'proj-gallery']
      },
      {
        name: 'React & Next.js',
        iconName: 'Component',
        level: 95,
        levelText: '专家',
        description: 'React 是声明式 UI 的王者，而 Next.js 则将其能力从客户端扩展至全栈，提供了从简单网站到复杂企业级应用的最佳实践。',
        strengths: [
          { title: '组件化思维', description: '将复杂UI拆解为独立、可复用的部分，逻辑清晰。' },
          { title: '混合渲染模式', description: '自由选择 SSR, SSG, ISR, CSR，为不同场景找到性能最优解。' },
          { title: '庞大且活跃的生态', description: '几乎所有你能想到的功能都有成熟的解决方案。' },
        ],
        philosophy: 'UI 是状态的映射。管理好状态，UI 自然水到渠成。',
        bestPairedWith: ['TypeScript', 'Vercel', 'Tailwind CSS', 'Framer Motion'],
        learningNote: '警惕“Prop-drilling地狱”。适时引入 Context或状态管理库是保持代码整洁的关键。',
        funFact: 'React 最初是 Facebook 内部项目，用于解决其信息流的 UI 更新问题，项目代号 "FaxJS"。',
        projects: ['proj-offerscore', 'proj-gallery']
      },
      {
        name: 'UI & 动画',
        iconName: 'Palette',
        level: 90,
        levelText: '精通',
        description: '利用 Tailwind CSS 的原子化能力快速构建美观、一致的界面，再通过 Framer Motion 为静态的UI注入有意义的、流畅的动态效果。',
        strengths: [
          { title: '开发速度', description: '无需在CSS和JS文件间切换，心流编程体验。' },
          { title: '声明式动画', description: '用简单的API描述复杂的动画逻辑，代码直观易懂。' },
          { title: '性能优化', description: 'Framer Motion 智能地使用硬件加速，确保动画流畅。' },
        ],
        philosophy: '动画不是装饰，而是引导。好的动效应服务于用户认知，而非分散注意力。',
        bestPairedWith: ['React', 'Next.js', 'shadcn/ui', 'Lucide Icons'],
        learningNote: '避免“动画泛滥”。每个动效都应该有其存在的理由，或解释状态变化，或提供操作反馈。',
        projects: ['proj-gallery']
      },
    ],
  },
  {
    name: '后端与云原生',
    iconName: 'Server',
    skills: [
      {
        name: 'Node.js & Deno',
        iconName: 'Server',
        level: 85,
        levelText: '精通',
        description: '利用 JavaScript/TypeScript 的强大生态构建快速、可扩展的网络应用。Deno 则以其现代化的特性和安全性，成为我探索的新领域。',
        strengths: [
          { title: '非阻塞I/O', description: '非常适合处理高并发、数据密集型的实时应用。' },
          { title: '全栈同构', description: '前后端使用同一种语言，降低心智负担，便于代码复用。' },
          { title: 'Deno 的安全性', description: '默认安全的权限模型，让运行第三方代码更加放心。' },
        ],
        philosophy: '用最合适的工具解决问题。Node.js 生态成熟，Deno 面向未来，两者互为补充。',
        bestPairedWith: ['TypeScript', 'Docker', 'PostgreSQL', 'Redis'],
        learningNote: '深入理解事件循环（Event Loop）是掌握 Node.js 性能调优的钥匙。',
        funFact: 'Deno 是 Node.js 的创造者 Ryan Dahl 的新作品，旨在修复他认为在 Node.js 中犯下的设计错误。Deno 是 "Node" 字母的重新排列。',
      },
      {
        name: '数据库 (SQL & NoSQL)',
        iconName: 'Database',
        level: 85,
        levelText: '精通',
        description: '根据业务场景选择最合适的数据库。常用 PostgreSQL 处理关系型数据，利用其稳定性和强大的功能；同时也会使用 Redis 作为高速缓存和键值存储。',
        strengths: [
          { title: '关系型设计', description: '精通 PostgreSQL 的范式设计、索引优化和事务处理。' },
          { title: '类型安全 ORM', description: '重度使用 Prisma，享受无与伦比的数据库操作体验和类型安全。' },
          { title: '高速缓存', description: '利用 Redis 缓存热点数据，显著降低数据库压力，提升响应速度。' },
        ],
        philosophy: '数据是应用的血液。数据库的设计直接决定了应用的性能上限和可扩展性。',
        bestPairedWith: ['Prisma', 'Node.js', 'Docker', 'Supabase'],
        learningNote: 'N+1 查询是性能杀手。ORM虽好，但仍需理解其生成的SQL语句，避免不必要的性能损耗。',
        projects: ['proj-offerscore']
      },
      {
        name: 'CI/CD & DevOps',
        iconName: 'Cloud',
        level: 90,
        levelText: '精通',
        description: '自动化是现代软件开发的灵魂。通过 GitHub Actions 和 Vercel，将测试、构建、部署流程完全自动化，实现高效、可靠的交付。',
        strengths: [
          { title: '工作流自动化', description: '使用 GitHub Actions 编写 YAML 文件，自动化重复性任务。' },
          { title: '一键部署', description: '深度集成 Vercel，实现 Git Push 即部署的丝滑体验。' },
          { title: '容器化', description: '使用 Docker 封装应用，确保开发、测试、生产环境的绝对一致。' },
        ],
        philosophy: '让机器做重复的事，让人类专注于创造。',
        bestPairedWith: ['Git', 'Vercel', 'Docker', 'Sentry (监控)'],
        learningNote: '密钥管理是CI/CD中的重中之重。务必使用平台的 Secrets 功能，绝不将敏感信息硬编码。',
        projects: ['proj-gallery', 'proj-offerscore']
      },
    ],
  },
  {
    name: '设计与产品',
    iconName: 'Lightbulb',
    skills: [
      {
        name: 'UI/UX 设计',
        iconName: 'PenTool',
        level: 80,
        levelText: '精通',
        description: '我相信好的产品始于对用户的深刻理解。我使用 Figma 进行界面设计、原型制作和设计系统构建，确保设计稿能100%精准地在代码中实现。',
        strengths: [
          { title: '高保真原型', description: '使用 Figma 创建可交互原型，在开发前验证用户流程。' },
          { title: '设计系统', description: '建立和维护组件库，确保品牌一致性，提升开发效率。' },
          { title: '用户为中心', description: '从用户需求出发，遵循尼尔森十大可用性原则等设计准则。' },
        ],
        philosophy: '设计不仅是好看，更是好用。一个像素的偏移都可能影响用户的心情。',
        bestPairedWith: ['Figma', 'User Research', 'A/B Testing', 'Tailwind CSS'],
        learningNote: '作为开发者，懂设计能让你更好地理解产品需求，并提出更具建设性的技术方案。',
      },
      {
        name: '产品思维',
        iconName: 'Milestone',
        level: 85,
        levelText: '精通',
        description: '我不仅仅满足于实现功能，更关心“为什么做”和“为谁做”。我能从商业目标和用户价值出发，参与需求分析、功能规划和版本迭代。',
        strengths: [
          { title: '需求拆解', description: '将模糊的业务需求转化为清晰、可执行的技术任务。' },
          { title: '最小可行产品(MVP)', description: '规划 MVP 范围，快速验证核心假设，小步快跑。' },
          { title: '数据驱动决策', description: '关注用户行为数据，用数据指导产品优化方向。' },
        ],
        philosophy: '用工程师的严谨，去解决产品经理的困惑。',
        bestPairedWith: ['Agile/Scrum', 'Jira/Linear', 'User Stories', 'Analytics Tools'],
        learningNote: '技术选型时，除了考虑“酷不酷”，更要考虑它是否符合当前的产品阶段和团队能力。',
      },
    ]
  },
  {
    name: '软技能与协作',
    iconName: 'Users',
    skills: [
       {
        name: '沟通与协作',
        iconName: 'Megaphone',
        level: 95,
        levelText: '专家',
        description: '清晰、主动的沟通是高效团队的基石。我擅长向不同背景的同事（技术/非技术）阐述复杂的概念，并积极参与 Code Review，共同提升代码质量。',
        strengths: [
          { title: '技术布道', description: '能将复杂技术原理用简单的语言解释给非技术人员。' },
          { title: '建设性反馈', description: '在 Code Review 中，对事不对人，提出有价值的改进建议。' },
          { title: '文档撰写', description: '热爱编写清晰的文档，降低团队协作成本。' },
        ],
        philosophy: 'Talk is cheap, show me the code. But great code needs great communication to shine.',
        bestPairedWith: ['Git & GitHub', 'Slack/Discord', 'Notion/Confluence', 'Pair Programming'],
        learningNote: '最好的协作是“异步友好”的。写下清晰的 issue 和 comment，能极大减少不必要的会议。',
      },
    ]
  },
];