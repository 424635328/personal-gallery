// src/components/sections/home/WorkflowSection.tsx

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Compass, PencilRuler, Code, Rocket } from 'lucide-react';
import { cn } from '@/lib/utils';

const workflowSteps = [
  {
    icon: Compass,
    title: "01. 探索与定义",
    description: "深入理解项目目标、用户需求和业务场景，通过竞品分析和用户研究，明确产品方向和核心功能。",
  },
  {
    icon: PencilRuler,
    title: "02. 设计与原型",
    description: "基于探索阶段的结论，构建信息架构和用户流程图。使用 Figma 创作高保真UI原型，并建立可复用的设计系统。",
  },
  {
    icon: Code,
    title: "03. 开发与实现",
    description: "采用敏捷开发模式，将设计稿转化为高质量、高性能的前端代码。编写清晰、可维护的组件，并进行充分的测试。",
  },
  {
    icon: Rocket,
    title: "04. 部署与迭代",
    description: "通过自动化CI/CD流程将应用部署上线。上线后，持续监控产品表现，收集用户反馈，进行快速迭代和优化。",
  },
];

export const Testimonial = () => { // 建议重命名为 WorkflowSection
  const containerRef = useRef<HTMLDivElement>(null);

  // 1. 设置滚动关联动画
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end end"],
  });
  
  // 动态计算高亮线的长度
  const highlightHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section 
      className={cn(
        "w-full max-w-4xl px-4 snap-start flex flex-col items-center justify-center",
        "min-h-[calc(100vh-var(--header-height))]",
        "pt-10 pb-20"
      )}
    >
      <motion.div 
        className="text-center mb-16" // 增加了标题和描述的下边距
        initial={{ opacity: 0, y: -20 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        viewport={{ once: true, amount: 0.5 }}
      >
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">我的工作哲学</h2>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">一套系统化的流程，确保从想法到产品的每一步都精准、高效。</p>
      </motion.div>

      <div ref={containerRef} className="w-full">
        <div className="relative flex flex-col gap-16 pl-12">
          {/* 背景灰色线 */}
          <div className="absolute left-4 top-4 bottom-4 w-px bg-border/50"></div>
          
          {/* 2. 动态高亮线 */}
          <motion.div
            className={cn(
              "absolute left-4 top-4 w-px",
              // 主题化高亮线
              "bg-primary",
              "theme-acid-wave:bg-gradient-to-b from-secondary via-accent to-primary",
              "theme-midnight-grimoire:bg-gradient-to-b from-primary to-secondary",
              "theme-retro-pixel:bg-primary"
            )}
            style={{ height: highlightHeight }}
          />

          {workflowSteps.map((step, index) => {
            // 为每个步骤创建一个 transform，用于实时激活效果
            const stepProgress = useTransform(
              scrollYProgress,
              [index * 0.2, index * 0.2 + 0.2, index * 0.2 + 0.3],
              [0, 1, 0]
            );
            const scale = useTransform(stepProgress, [0, 1, 0], [1, 1.2, 1]);
            const color = useTransform(stepProgress, [0, 1, 0], ["hsl(var(--muted-foreground))", "hsl(var(--primary))", "hsl(var(--muted-foreground))"]);

            return (
              <motion.div
                key={index}
                className="relative flex items-start"
                initial={{ opacity: 0, x: 20, rotate: -2 }}
                whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5 }}
              >
                {/* 步骤图标 */}
                <motion.div
                  style={{ scale, borderColor: color }}
                  className="absolute left-0 top-0 -translate-x-1/2 mt-1 flex h-8 w-8 items-center justify-center rounded-full border-2 bg-background"
                >
                  <motion.div style={{ color }}>
                    <step.icon className="h-4 w-4" />
                  </motion.div>
                </motion.div>

                {/* 步骤内容 */}
                <div className="flex-1 text-left">
                  <h3 className="text-xl font-bold text-foreground">{step.title}</h3>
                  <p className="mt-2 text-muted-foreground">{step.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};