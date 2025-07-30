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

const pageTitle = "用代码与设计，塑造交互新体验";

export default function HomePage() {
  return (
    // 1. 主容器: 应用字体和主题特定的背景效果
    <div className={cn(
      "w-full min-h-full flex flex-col items-center justify-center text-center relative overflow-hidden px-4 py-16",
      // 主题切换的字体类名 (假设这些字体在 tailwind.config.js 中定义)
      "font-sans",
      "theme-warm-sunshine:font-serif",
      "theme-dopamine-pop:font-dopamine",
      "theme-zen-ink:font-sans",
      "theme-solarpunk-utopia:font-solarpunk",
      "theme-rustic-artisan:font-artisan",
      "theme-brutalist-glitch:font-brutalist theme-brutalist-glitch:uppercase",
      "theme-retro-pixel:font-brutalist theme-retro-pixel:uppercase",
      "theme-acid-wave:font-sans theme-acid-wave:uppercase",
      "theme-collage-punk:font-brutalist"
    )}>
      
      {/* 2. 背景效果层 */}
      <div className={cn(
        "absolute top-0 left-0 -z-20 h-full w-full",
        // 主题特定的背景
        "theme-solarpunk-utopia:hero-bg-solarpunk",
        "theme-midnight-grimoire:hero-bg-grimoire",
        "theme-collage-punk:bg-zine"
      )}>
        {/* 通用辉光效果 */}
        <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[20%] translate-y-[20%] rounded-full bg-gradient-radial from-primary/10 via-transparent to-transparent opacity-50 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 right-auto top-auto h-[400px] w-[400px] -translate-x-[20%] -translate-y-[20%] rounded-full bg-gradient-radial from-secondary/5 via-transparent to-transparent opacity-50 blur-3xl"></div>
      </div>
        
      {/* 3. 内容层: 所有内容都放在这里 */}
      <div className="relative z-10 w-full max-w-5xl">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="space-y-6"
        >
          {/* 徽章 */}
          <motion.div variants={fadeIn} className={cn(
                "inline-block rounded-full px-4 py-1.5 text-sm font-medium",
                "bg-primary/10 text-primary", // 基础样式
                "theme-midnight-grimoire:button-grimoire theme-midnight-grimoire:text-xs",
                "theme-warm-sunshine:bg-primary/20 theme-warm-sunshine:text-primary-foreground theme-warm-sunshine:rounded-[var(--radius)] theme-warm-sunshine:bg-primary",
                "theme-dopamine-pop:border-2 theme-dopamine-pop:border-current",
                "theme-zen-ink:border theme-zen-ink:border-primary/50",
                "theme-solarpunk-utopia:border theme-solarpunk-utopia:border-primary/20",
                "theme-rustic-artisan:bg-card theme-rustic-artisan:border-2 theme-rustic-artisan:border-current",
                "theme-brutalist-glitch:bg-primary theme-brutalist-glitch:text-primary-foreground theme-brutalist-glitch:rounded-none theme-brutalist-glitch:border-2 theme-brutalist-glitch:border-foreground",
                "theme-retro-pixel:button-retro theme-retro-pixel:text-xs",
                "theme-acid-wave:acid-border theme-acid-wave:rounded-sm",
                "theme-collage-punk:bg-white theme-collage-punk:border-2 theme-collage-punk:border-dashed theme-collage-punk:border-foreground"
              )}>
            Tony.PGL
          </motion.div>
          
          {/* H1标题 */}
          <motion.h1 
            variants={fadeIn} 
            data-text={pageTitle} // 为 glitch 效果提供数据
            className={cn(
              "text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl",
              // 特效类
              "animated-gradient-text bg-gradient-to-r from-primary via-purple-400 to-pink-500 text-transparent bg-clip-text", // 默认渐变
              "theme-warm-sunshine:text-shadow-warm theme-warm-sunshine:text-foreground theme-warm-sunshine:bg-none",
              "theme-dopamine-pop:text-shadow-pop theme-dopamine-pop:text-foreground theme-dopamine-pop:bg-none",
              "theme-zen-ink:text-foreground theme-zen-ink:font-bold theme-zen-ink:bg-none",
              "theme-solarpunk-utopia:text-foreground theme-solarpunk-utopia:bg-none",
              "theme-rustic-artisan:text-foreground theme-rustic-artisan:bg-none",
              "theme-brutalist-glitch:glitch-text theme-brutalist-glitch:text-foreground theme-brutalist-glitch:bg-none",
              "theme-retro-pixel:text-shadow-pixel theme-retro-pixel:text-foreground theme-retro-pixel:bg-none",
              "theme-acid-wave:[text-shadow:_0_0_8px_hsl(var(--primary)),_0_0_15px_hsl(var(--secondary))] theme-acid-wave:tracking-wider theme-acid-wave:text-primary theme-acid-wave:bg-none",
              "theme-midnight-grimoire:[text-shadow:_0_0_8px_hsl(var(--primary))] theme-midnight-grimoire:text-primary theme-midnight-grimoire:bg-none",
              "theme-collage-punk:text-foreground theme-collage-punk:bg-none"
            )}>
            {pageTitle}
          </motion.h1>
          
          {/* 副标题 */}
          <motion.p variants={fadeIn} className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
              一个热衷于前端开发、UI/UX设计和创意交互的全栈探索者。
          </motion.p>
        </motion.div>

        {/* 核心能力卡片 */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3 max-w-4xl mx-auto"
        >
          {[
            { icon: Code, title: "前端开发", description: "精通现代前端技术栈，构建高性能应用。" },
            { icon: PenTool, title: "UI/UX 设计", description: "注重用户体验，打造直观优雅的界面。" },
            { icon: Sparkles, title: "创意交互", description: "热衷于通过动效为产品注入生命力。" },
          ].map((feature, index) => (
            <motion.div key={index} variants={fadeIn} whileHover={{ y: -5, transition: { type: 'spring', stiffness: 400, damping: 20 } }}>
              <div className={cn(
                  "group flex h-full flex-col items-center justify-start text-center gap-4 rounded-lg p-6 border transition-all duration-300",
                  "bg-card/50 border-border/20 backdrop-blur-sm", // 基础样式
                  // 多主题覆盖样式
                  "theme-midnight-grimoire:card-grimoire",
                  "theme-warm-sunshine:bg-card/80 theme-warm-sunshine:backdrop-blur-none theme-warm-sunshine:border-border/80 theme-warm-sunshine:shadow-[3px_3px_0px_hsl(var(--secondary))] hover:shadow-[4px_4px_0px_hsl(var(--primary))]",
                  "theme-dopamine-pop:bg-card theme-dopamine-pop:border-2 theme-dopamine-pop:border-foreground shadow-[4px_4px_0px_hsl(var(--foreground))] hover:shadow-[0px_0px_0px_hsl(var(--foreground))]",
                  "theme-zen-ink:card-zen bg-transparent backdrop-blur-none border-border/50 shadow-none",
                  "theme-solarpunk-utopia:bg-card/90 border-primary/20 shadow-lg",
                  "theme-rustic-artisan:bg-card/90 border-2 border-foreground/10 shadow-inner",
                  "theme-brutalist-glitch:bg-transparent border-2 border-foreground rounded-none",
                  "theme-retro-pixel:card-retro",
                  "theme-acid-wave:acid-border",
                  "theme-collage-punk:card-punk paper-tear-border bg-card"
                )}>
                <feature.icon className="h-8 w-8 text-primary mb-2" />
                <div className='text-left w-full'>
                  <h3 className="font-semibold text-foreground transition-colors duration-300 group-hover:text-primary">{feature.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground transition-colors duration-300 group-hover:text-foreground/80">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* 行动号召按钮 */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-12 flex flex-wrap justify-center gap-4"
        >
          {[
            { href: "/projects", text: "查看我的作品", icon: ArrowDown, variant: "default" },
            { href: "/contact", text: "联系我", icon: Send, variant: "ghost" }
          ].map((btn) => (
            <motion.div key={btn.href} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href={btn.href}
                className={cn(
                  buttonVariants({ variant: btn.variant as any, size: 'lg' }),
                  // 特殊主题会完全覆盖按钮样式
                  "theme-midnight-grimoire:button-grimoire",
                  "theme-retro-pixel:button-retro",
                  "theme-collage-punk:button-punk",
                  // 其他主题在基础按钮上做调整
                  "theme-dopamine-pop:shadow-[2px_2px_0px_hsl(var(--foreground))] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5",
                  "theme-brutalist-glitch:rounded-none border-2 border-foreground",
                  "theme-acid-wave:rounded-sm",
                  "theme-acid-wave:[&.bg-primary]:acid-border" // 仅主按钮应用acid-border
                )}
              >
                <btn.icon className="mr-2 h-5 w-5" />
                {btn.text}
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}