// src/components/sections/home/FeatureCards.tsx

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, PenTool, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

const features = [
  { 
    icon: Code, 
    title: "前端架构与开发", 
    description: "构建可扩展、高性能、用户体验一流的现代 Web 应用。",
    details: [
      "精通 React, Next.js, Vue",
      "熟练运用 TypeScript 保障类型安全",
      "使用 Tailwind CSS 进行原子化、响应式设计",
      "借助 Framer Motion 创造流畅的交互动画"
    ]
  },
  { 
    icon: PenTool, 
    title: "UI/UX 设计", 
    description: "从用户研究到像素完美，打造符合直觉且美观的数字产品。",
    details: [
      "遵循以用户为中心的设计（UCD）原则",
      "使用 Figma 进行高保真原型设计与协作",
      "构建与维护设计系统（Design Systems）",
      "关注 Web 可访问性（WCAG）标准"
    ]
  },
  { 
    icon: Zap, 
    title: "全栈能力与后端", 
    description: "打通前后端，提供从数据到视图的完整解决方案。",
    details: [
      "使用 Node.js 和 Express/Fastify 构建 API",
      "通过 Prisma ORM 与数据库（PostgreSQL, MySQL）交互",
      "掌握 RESTful API 和 GraphQL 的设计与实现",
      "熟悉 Vercel, Netlify 等平台的部署与运维"
    ]
  },
];

export const FeatureCards = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section 
      className={cn(
        "w-full max-w-6xl text-center snap-start flex flex-col items-center justify-center",
        // 1. 统一最小高度
        "min-h-[calc(90vh-var(--header-height))]",
        // 2. 统一内边距 (与 HeroSection 一致)
        "pt-10 pb-20 px-4"
      )}
    >
      {/* 标题部分 */}
      <motion.div initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }}>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">我的技术栈与理念</h2>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">我相信卓越的产品源于深度思考与精湛技艺的结合。</p>
      </motion.div>

      {/* 左右分栏布局 */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-12 w-full">

        {/* 左侧：技能选项卡 */}
        <motion.div 
          className="flex md:flex-col gap-4"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          {features.map((feature, index) => (
            <button
              key={feature.title}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "relative w-full p-4 text-left rounded-lg transition-colors duration-300",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                activeIndex === index ? "text-foreground" : "text-muted-foreground hover:bg-muted/50 hover:text-foreground/80"
              )}
            >
              <div className="flex items-center gap-4">
                <feature.icon className={cn("h-6 w-6 transition-colors", activeIndex === index && "text-primary")} />
                <span className="font-semibold">{feature.title}</span>
              </div>
              {/* 平滑的活动指示器动画 */}
              {activeIndex === index && (
                <motion.div
                  layoutId="active-feature-indicator"
                  className={cn(
                    "absolute inset-0 -z-10 rounded-lg",
                    "bg-muted",
                    "theme-acid-wave:bg-primary/20 theme-acid-wave:shadow-[0_0_15px_hsl(var(--primary)/0.5)]",
                    "theme-midnight-grimoire:bg-secondary/50 theme-midnight-grimoire:border theme-midnight-grimoire:border-primary/50",
                    "theme-retro-pixel:bg-primary/20",
                    "theme-collage-punk:bg-[url('/tape-texture.png')] bg-blend-multiply bg-white/80 border-2 border-dashed border-foreground/50",
                    "theme-brutalist-glitch:bg-primary/20"
                  )}
                  initial={false}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* 右侧：内容展示区 */}
        <div className="md:col-span-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={cn(
                  "h-full w-full rounded-lg p-8 border text-left",
                  "bg-card/50 border-border/20 backdrop-blur-sm",
                  "theme-midnight-grimoire:card-grimoire",
                  "theme-warm-sunshine:bg-card/80 theme-warm-sunshine:shadow-[3px_3px_0px_hsl(var(--secondary))]",
                  "theme-dopamine-pop:bg-card theme-dopamine-pop:border-2 theme-dopamine-pop:border-foreground shadow-[4px_4px_0px_hsl(var(--foreground))]",
                  "theme-zen-ink:card-zen bg-transparent backdrop-blur-none border-border/50",
                  "theme-solarpunk-utopia:bg-card/90 border-primary/20 shadow-lg",
                  "theme-rustic-artisan:bg-card/90 border-2 border-foreground/10 shadow-inner",
                  "theme-brutalist-glitch:bg-transparent border-2 border-foreground rounded-none",
                  "theme-retro-pixel:card-retro",
                  "theme-acid-wave:acid-border",
                  "theme-collage-punk:card-punk paper-tear-border bg-card"
              )}
            >
              <h3 className="text-2xl font-bold text-primary">{features[activeIndex].title}</h3>
              <p className="mt-2 text-muted-foreground">{features[activeIndex].description}</p>
              <ul className="mt-6 space-y-3">
                {features[activeIndex].details.map((detail) => (
                  <li key={detail} className="flex items-start gap-3">
                    <CheckCircleIcon className="h-5 w-5 mt-0.5 text-primary/80 shrink-0" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};

// 辅助图标组件
const CheckCircleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);