// src/app/page.tsx
// 首页组件，展示应用的主要内容和功能

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowDown, Code, PenTool, Sparkles, Send } from 'lucide-react';

// --- 动画变体 (保持不变) ---
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

export default function HomePage() {
  return (
    // 1. 主容器: 注入了模板中的多主题字体切换逻辑
    <div className={cn(
      "w-full h-full flex flex-col items-center justify-center text-center relative overflow-hidden px-4",
      // 主题切换的字体类名
      "font-sans",
      "theme-warm-sunshine:font-serif",
      "theme-dopamine-pop:font-dopamine",
      "theme-zen-ink:font-sans",
      "theme-solarpunk-utopia:font-solarpunk",
      "theme-rustic-artisan:font-artisan",
      "theme-brutalist-glitch:font-brutalist theme-brutalist-glitch:uppercase",
      "theme-retro-pixel:font-brutalist theme-retro-pixel:uppercase",
      "theme-acid-wave:font-sans theme-acid-wave:uppercase"
    )}>
      
      {/* 2. 背景效果: 保持不变 */}
      <div className="absolute top-0 left-0 -z-20 h-full w-full bg-background/10">
        <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[20%] translate-y-[20%] rounded-full bg-gradient-radial from-primary/10 via-transparent to-transparent opacity-50 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 right-auto top-auto h-[400px] w-[400px] -translate-x-[20%] -translate-y-[20%] rounded-full bg-gradient-radial from-purple-500/05 via-transparent to-transparent opacity-50 blur-3xl"></div>
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-6xl h-48 -z-10 bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-indigo-500/50 opacity-20 blur-3xl animate-[aurora_12s_ease-in-out_infinite_alternate]" />
        
      {/* 3. 内容层: 所有内容都放在这里 */}
      <div className="relative z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="space-y-6"
        >
          {/* 徽章: 注入了模板中的多主题样式 */}
          <motion.div variants={fadeIn} className={cn(
                "inline-block rounded-full px-4 py-1.5 text-sm font-medium",
                "bg-primary/10 text-primary", // 基础样式来自模板
                "theme-warm-sunshine:bg-primary/20 theme-warm-sunshine:text-primary theme-warm-sunshine:rounded-[var(--radius)]",
                "theme-dopamine-pop:bg-primary/20 theme-dopamine-pop:text-primary theme-dopamine-pop:rounded-[var(--radius)] theme-dopamine-pop:border theme-dopamine-pop:border-primary",
                "theme-zen-ink:bg-primary/10 theme-zen-ink:text-primary theme-zen-ink:border theme-zen-ink:border-primary/50 theme-zen-ink:rounded-[var(--radius)]",
                "theme-solarpunk-utopia:bg-primary/10 theme-solarpunk-utopia:text-primary theme-solarpunk-utopia:rounded-full theme-solarpunk-utopia:border theme-solarpunk-utopia:border-primary/20",
                "theme-rustic-artisan:bg-primary/10 theme-rustic-artisan:text-primary theme-rustic-artisan:rounded-sm theme-rustic-artisan:border theme-rustic-artisan:border-primary/30",
                "theme-brutalist-glitch:bg-primary theme-brutalist-glitch:text-background theme-brutalist-glitch:rounded-none theme-brutalist-glitch:border theme-brutalist-glitch:border-foreground",
                "theme-retro-pixel:bg-secondary theme-retro-pixel:text-secondary-foreground theme-retro-pixel:rounded-none theme-retro-pixel:border-2 theme-retro-pixel:border-foreground",
                "theme-acid-wave:bg-primary/20 theme-acid-wave:text-primary theme-acid-wave:rounded-none theme-acid-wave:acid-border"
              )}>
            Tony.PGL
          </motion.div>
          
          {/* H1标题: 注入了模板中的多主题样式 */}
          <motion.h1 variants={fadeIn} className={cn(
              "text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl",
              // 基础样式来自模板
              "text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-pink-500",
              // 多主题覆盖样式
              "theme-warm-sunshine:font-serif",
              "theme-dopamine-pop:font-black",
              "theme-zen-ink:font-zen theme-zen-ink:font-bold",
              "theme-solarpunk-utopia:font-semibold theme-solarpunk-utopia:text-foreground",
              "theme-rustic-artisan:font-bold",
              "theme-brutalist-glitch:font-normal",
              "theme-retro-pixel:font-normal theme-retro-pixel:text-2xl sm:text-3xl md:text-4xl lg:text-5xl",
              "theme-acid-wave:[text-shadow:_0_0_5px_hsl(var(--primary)),_0_0_10px_hsl(var(--secondary))] theme-acid-wave:tracking-wider"
            )}>
            用代码与设计，塑造交互新体验
          </motion.h1>
          
          {/* 副标题: 注入了模板中的多主题样式 (新添加的元素，以匹配模板结构) */}
          <motion.p variants={fadeIn} className={cn(
              "mx-auto mt-6 max-w-2xl text-lg md:text-xl",
              "text-muted-foreground",
              "theme-warm-sunshine:text-foreground/80",
              "theme-dopamine-pop:text-foreground/90",
              "theme-zen-ink:text-foreground/70",
              "theme-solarpunk-utopia:text-muted-foreground",
              "theme-rustic-artisan:text-foreground/70",
              "theme-brutalist-glitch:text-foreground/80",
              "theme-retro-pixel:text-foreground/90",
              "theme-acid-wave:text-muted-foreground"
            )}>
              一个热衷于前端开发、UI/UX设计和创意交互的全栈探索者。
          </motion.p>
        </motion.div>

        {/* 核心能力卡片: 注入了模板中的多主题样式 */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3 max-w-4xl"
        >
          {[
            { icon: Code, title: "前端开发", description: "精通现代前端技术栈，构建高性能应用。" },
            { icon: PenTool, title: "UI/UX 设计", description: "注重用户体验，打造直观优雅的界面。" },
            { icon: Sparkles, title: "创意交互", description: "热衷于通过动效为产品注入生命力。" },
          ].map((feature, index) => (
            <motion.div key={index} variants={fadeIn} whileHover={{ y: -5, transition: { type: 'spring', stiffness: 400, damping: 20 } }}>
              <div className={cn(
                  "group flex h-full flex-col items-center justify-center text-center gap-4 rounded-lg p-8 border transition-all duration-300",
                  "bg-card/50 border-border/20 backdrop-blur-sm", // 基础样式
                  // 多主题覆盖样式
                  "theme-warm-sunshine:bg-card/80 theme-warm-sunshine:backdrop-blur-none theme-warm-sunshine:border-border theme-warm-sunshine:shadow-[4px_4px_0px_hsl(var(--foreground))]",
                  "theme-dopamine-pop:bg-white theme-dopamine-pop:border-2 theme-dopamine-pop:border-foreground theme-dopamine-pop:shadow-pop-out theme-dopamine-pop:transition-all theme-dopamine-pop:hover:shadow-none theme-dopamine-pop:hover:translate-x-1 theme-dopamine-pop:hover:translate-y-1",
                  "theme-zen-ink:bg-transparent theme-zen-ink:backdrop-blur-none theme-zen-ink:border-border/50 theme-zen-ink:shadow-none theme-zen-ink:hover:border-primary",
                  "theme-solarpunk-utopia:bg-card/90 theme-solarpunk-utopia:border-primary/20 theme-solarpunk-utopia:shadow-lg theme-solarpunk-utopia:rounded-[var(--radius)]",
                  "theme-rustic-artisan:bg-card/90 theme-rustic-artisan:border-4 theme-rustic-artisan:border-foreground/20 theme-rustic-artisan:shadow-inner",
                  "theme-brutalist-glitch:bg-transparent theme-brutalist-glitch:border-2 theme-brutalist-glitch:border-foreground theme-brutalist-glitch:rounded-none theme-brutalist-glitch:hover:animate-glitch",
                  "theme-retro-pixel:card-retro",
                  "theme-acid-wave:acid-border theme-acid-wave:rounded-[var(--radius)]"
                )}>
                <feature.icon className="h-6 w-6 text-primary transition-colors" />
                <div>
                  <h3 className={cn(
                      "font-semibold text-foreground transition-colors duration-300 group-hover:text-primary",
                      "theme-warm-sunshine:font-serif", "theme-dopamine-pop:font-bold", "theme-zen-ink:font-zen",
                      "theme-solarpunk-utopia:font-semibold", "theme-rustic-artisan:font-bold",
                      "theme-brutalist-glitch:font-normal", "theme-retro-pixel:font-normal", "theme-acid-wave:font-bold"
                    )}>{feature.title}</h3>
                  <p className={cn(
                      "mt-1 text-sm text-muted-foreground transition-colors duration-300 group-hover:text-foreground/90",
                      "theme-warm-sunshine:text-foreground/80", "theme-dopamine-pop:text-foreground/90",
                      "theme-zen-ink:text-foreground/70", "theme-solarpunk-utopia:text-muted-foreground",
                      "theme-rustic-artisan:text-foreground/70", "theme-brutalist-glitch:text-foreground/80",
                      "theme-retro-pixel:text-foreground/90", "theme-acid-wave:text-muted-foreground"
                    )}>{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* 行动号召按钮: 注入了模板中的多主题样式 */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.6 }}
          className="mt-12 flex flex-wrap justify-center gap-4"
        >
          {/* 主按钮 */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/projects"
              className={cn(
                buttonVariants({ size: 'lg' }),
                // 基础样式和多主题覆盖
                "bg-primary text-primary-foreground",
                "theme-warm-sunshine:bg-primary theme-warm-sunshine:text-primary-foreground theme-warm-sunshine:rounded-[var(--radius)]",
                "theme-dopamine-pop:bg-primary theme-dopamine-pop:text-primary-foreground theme-dopamine-pop:shadow-pop-out theme-dopamine-pop:hover:shadow-none theme-dopamine-pop:hover:translate-x-1 theme-dopamine-pop:hover:translate-y-1 theme-dopamine-pop:rounded-[var(--radius)]",
                "theme-zen-ink:bg-primary theme-zen-ink:text-primary-foreground theme-zen-ink:rounded-sm theme-zen-ink:border theme-zen-ink:border-primary/50",
                "theme-solarpunk-utopia:bg-primary theme-solarpunk-utopia:text-primary-foreground theme-solarpunk-utopia:rounded-full",
                "theme-rustic-artisan:bg-primary theme-rustic-artisan:text-primary-foreground theme-rustic-artisan:rounded-sm theme-rustic-artisan:border-2 theme-rustic-artisan:border-foreground/20",
                "theme-brutalist-glitch:bg-primary theme-brutalist-glitch:text-background theme-brutalist-glitch:rounded-none theme-brutalist-glitch:border theme-brutalist-glitch:border-foreground theme-brutalist-glitch:hover:animate-glitch",
                "theme-retro-pixel:button-retro",
                "theme-acid-wave:bg-primary theme-acid-wave:text-primary-foreground theme-acid-wave:rounded-none theme-acid-wave:acid-border theme-acid-wave:hover:text-primary-foreground",
                "theme-midnight-grimoire:button-grimoire"
              )}
            >
              <ArrowDown className="mr-2 h-5 w-5" />
              查看我的作品
            </Link>
          </motion.div>
          {/* 次要/幽灵按钮 */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ variant: 'ghost', size: 'lg' }),
                // 基础样式和多主题覆盖
                "text-muted-foreground hover:text-foreground",
                "theme-warm-sunshine:text-muted-foreground theme-warm-sunshine:hover:text-foreground theme-warm-sunshine:rounded-[var(--radius)]",
                "theme-dopamine-pop:text-muted-foreground theme-dopamine-pop:hover:text-foreground theme-dopamine-pop:rounded-[var(--radius)]",
                "theme-zen-ink:text-muted-foreground theme-zen-ink:hover:text-foreground theme-zen-ink:rounded-sm",
                "theme-solarpunk-utopia:text-muted-foreground theme-solarpunk-utopia:hover:text-foreground theme-solarpunk-utopia:rounded-full",
                "theme-rustic-artisan:text-muted-foreground theme-rustic-artisan:hover:text-foreground theme-rustic-artisan:rounded-sm",
                "theme-brutalist-glitch:text-muted-foreground theme-brutalist-glitch:hover:text-foreground theme-brutalist-glitch:rounded-none theme-brutalist-glitch:hover:animate-glitch",
                "theme-retro-pixel:button-retro",
                "theme-acid-wave:text-muted-foreground theme-acid-wave:rounded-none theme-acid-wave:hover:text-primary",
                "theme-midnight-grimoire:button-grimoire"
              )}
            >
              <Send className="mr-2 h-5 w-5" />
              联系我
            </Link>
          </motion.div> 
        </motion.div>
      </div>
    </div>
  );
}