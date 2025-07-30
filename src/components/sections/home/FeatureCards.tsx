// src/components/sections/home/FeatureCards.tsx

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutTemplate, Paintbrush, DatabaseZap, GitBranchPlus, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const features = [
  { 
    id: 1,
    icon: LayoutTemplate, 
    title: "匠心构建：前端架构与体验", 
    shortDescription: "将理念转化为可触摸、高性能的交互界面。",
    longDescription: "我坚信前端开发是工程与艺术的交汇点。一个优秀的应用不仅功能完备，更应在性能、可维护性和用户体验上达到极致。我致力于构建可扩展、组件化、类型安全的代码库，为用户创造流畅而愉悦的数字旅程。",
    details: [
      "精通 React 与 Next.js (App Router)，实现服务端渲染与静态生成的现代Web应用。",
      "运用 TypeScript 为大型项目提供坚实的类型安全保障。",
      "通过 Framer Motion 和 CSS Variables 创造富有表现力的微交互与主题化。",
      "深入理解 Web Vitals，持续优化应用性能，保障卓越用户体验。"
    ],
    accentColor: "from-sky-500/50 to-sky-500",
    shadowColor: "shadow-sky-500/20",
  },
  { 
    id: 2,
    icon: Paintbrush, 
    title: "视觉叙事：UI/UX 与设计系统", 
    shortDescription: "用设计语言沟通，构建美观、直观且一致的数字产品。",
    longDescription: "我相信好的设计是隐形的，它让用户自然而然地完成任务，并在此过程中感到愉悦。我从用户研究出发，通过线框图和高保真原型探索解决方案，并热衷于将这些方案沉淀为可复用的设计系统，确保品牌一致性与开发效率。",
    details: [
      "遵循以用户为中心的设计（UCD）原则，进行用户访谈与可用性测试。",
      "使用 Figma 进行高保真原型设计、组件化与团队协作。",
      "构建与维护设计系统（Design Systems），统一视觉与交互语言。",
      "关注 Web 可访问性（WCAG），确保产品对所有用户都友好。"
    ],
    accentColor: "from-emerald-500/50 to-emerald-500",
    shadowColor: "shadow-emerald-500/20",
  },
  { 
    id: 3,
    icon: DatabaseZap, 
    title: "贯通全栈：从 API 到云端部署", 
    shortDescription: "打通前后端任督二脉，交付端到端的完整解决方案。",
    longDescription: "对技术的全局视野使我能够不仅限于前端。我能够设计和实现健壮的后端服务，管理数据库，并将其无缝部署到云端。这种全栈能力让我能更高效地解决问题，并从系统层面思考应用的架构与性能。",
    details: [
      "使用 Node.js (Express/Fastify) 构建高效、可扩展的 RESTful API 与 GraphQL 服务。",
      "通过 Prisma ORM 与数据库（PostgreSQL, MySQL）进行安全、高效的交互。",
      "熟悉 Docker 容器化技术，简化开发与部署流程。",
      "在 Vercel, Netlify, AWS 等云平台上进行自动化部署与持续集成（CI/CD）。"
    ],
    accentColor: "from-amber-500/50 to-amber-500",
    shadowColor: "shadow-amber-500/20",
  },
  { 
    id: 4,
    icon: GitBranchPlus, 
    title: "工程美学：自动化与高效工作流", 
    shortDescription: "追求极致的开发效率与代码质量，打造优雅的工程实践。",
    longDescription: "我相信优雅的代码和高效的流程同样是艺术品。我热衷于利用工具和自动化流程来消除重复性工作，保障代码质量，并促进团队协作。一个干净、自动化、文档齐全的工作流是交付高质量产品的基石。",
    details: [
      "配置 ESLint, Prettier, Husky, lint-staged 建立自动化代码规范与质量门禁。",
      "采用 Git Flow / GitHub Flow 等分支管理策略，进行高效的团队协作。",
      "编写清晰的文档（README, ADRs），降低新成员的上手成本。",
      "积极参与 Code Review，分享知识，共同提升代码质量。"
    ],
    accentColor: "from-violet-500/50 to-violet-500",
    shadowColor: "shadow-violet-500/20",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut"
    },
  }),
};

const detailVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

export const FeatureCards = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const selectedFeature = features.find(f => f.id === selectedId);

  return (
    <section 
      className={cn(
        "relative w-full max-w-6xl mx-auto text-center snap-start flex flex-col items-center justify-center",
        "min-h-[calc(90vh-var(--header-height))]",
        "pt-10 pb-20 px-4"
      )}
    >
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
        className="mb-16"
      >
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">我的技能宇宙</h2>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">探索我的核心能力领域，每一次点击都是一次新的发现。</p>
      </motion.div>

      <div className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, i) => (
          <motion.div
            key={feature.id}
            layoutId={String(feature.id)}
            onClick={() => setSelectedId(feature.id)}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            custom={i}
            viewport={{ once: true, amount: 0.3 }}
            className={cn(
              "relative p-8 text-left bg-card/50 rounded-2xl cursor-pointer overflow-hidden group",
              "border border-border/20 backdrop-blur-sm",
              "transition-all duration-300 hover:!border-primary/50 hover:shadow-2xl",
              feature.shadowColor
            )}
          >
            <div className={cn("absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-l opacity-10 group-hover:opacity-20 transition-opacity duration-500", feature.accentColor)}></div>
            <div className="relative z-10">
              <feature.icon className="w-10 h-10 mb-4 text-primary" />
              <h3 className="text-xl font-bold text-foreground">{feature.title}</h3>
              <p className="mt-2 text-muted-foreground">{feature.shortDescription}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedId && selectedFeature && (
          <motion.div
            className="fixed inset-0 bg-background/80 backdrop-blur-lg flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedId(null)}
          >
            <motion.div
              layoutId={String(selectedId)}
              onClick={(e) => e.stopPropagation()}
              variants={detailVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={cn(
                "relative w-full max-w-3xl max-h-[90vh] bg-card rounded-2xl overflow-y-auto",
                "border border-border shadow-2xl",
                selectedFeature.shadowColor
              )}
            >
              <div className="p-8 sm:p-12 text-left">
                <motion.button
                  onClick={() => setSelectedId(null)}
                  className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ArrowLeft className="w-6 h-6" />
                </motion.button>
                
                <motion.div variants={itemVariants}>
                  <selectedFeature.icon className="w-12 h-12 mb-6 text-primary" />
                </motion.div>
                
                <motion.h2 variants={itemVariants} className="text-3xl font-bold text-foreground">
                  {selectedFeature.title}
                </motion.h2>
                
                <motion.p variants={itemVariants} className="mt-4 text-muted-foreground leading-relaxed">
                  {selectedFeature.longDescription}
                </motion.p>
                
                <motion.div variants={itemVariants} className="my-8 h-px bg-border"></motion.div>

                <motion.ul variants={itemVariants} className="space-y-4">
                  {selectedFeature.details.map((detail, index) => (
                    <motion.li key={index} variants={itemVariants} className="flex items-start gap-4">
                      <CheckCircle2 className="w-5 h-5 mt-1 text-primary/80 shrink-0" />
                      <span className="text-foreground/90">{detail}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};