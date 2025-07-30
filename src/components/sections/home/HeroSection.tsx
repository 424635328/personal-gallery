// src/components/sections/home/HeroSection.tsx
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowDown, Send } from 'lucide-react';

// 动画变体
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 1) => ({
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.1, delayChildren: i * 0.1 },
  }),
};

const pageTitle = "用代码与设计，塑造交互新体验";

export const HeroSection = () => {
  return (
    <section 
      className={cn(
        "w-full max-w-5xl text-center flex flex-col items-center justify-center snap-start",
        // 保持这个公式，确保板块能填满 Header 下方的屏幕空间
        "min-h-[calc(90vh-var(--header-height))]",
        // 调整垂直内边距来控制内容与 Header 的距离
        "pt-10 pb-20 px-4" // 原来是 py-20
      )}
    >
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {/* 徽章 */}
        <div className={cn(
            "inline-block rounded-full px-4 py-1.5 text-sm font-medium",
            "bg-primary/10 text-primary", // 基础样式
            "theme-brutalist-glitch:bg-primary theme-brutalist-glitch:text-primary-foreground theme-brutalist-glitch:rounded-none theme-brutalist-glitch:border-2 theme-brutalist-glitch:border-foreground",
            "theme-retro-pixel:button-retro text-xs",
            "theme-acid-wave:acid-border rounded-sm",
            "theme-collage-punk:bg-white border-2 border-dashed border-foreground"
        )}>
          Tony.PGL
        </div>

        {/* 标题 */}
        <h1
          data-text={pageTitle} // 为 "glitch" 效果提供数据
          className={cn(
            "text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl",
            // 默认渐变文字效果
            "animated-gradient-text bg-gradient-to-r from-primary via-purple-500 to-pink-500 text-transparent bg-clip-text",
            // 主题覆盖样式
            "theme-warm-sunshine:text-shadow-warm theme-warm-sunshine:text-foreground theme-warm-sunshine:bg-none",
            "theme-dopamine-pop:text-shadow-pop theme-dopamine-pop:text-foreground theme-dopamine-pop:bg-none",
            "theme-zen-ink:text-foreground theme-zen-ink:bg-none",
            "theme-solarpunk-utopia:text-foreground theme-solarpunk-utopia:bg-none",
            "theme-rustic-artisan:text-foreground theme-rustic-artisan:bg-none",
            "theme-brutalist-glitch:glitch-text theme-brutalist-glitch:text-foreground theme-brutalist-glitch:bg-none",
            "theme-retro-pixel:text-shadow-pixel theme-retro-pixel:text-foreground theme-retro-pixel:bg-none",
            "theme-acid-wave:[text-shadow:_0_0_8px_hsl(var(--primary)),_0_0_15px_hsl(var(--secondary))] theme-acid-wave:tracking-wider theme-acid-wave:text-primary theme-acid-wave:bg-none",
            "theme-midnight-grimoire:[text-shadow:_0_0_8px_hsl(var(--primary))] theme-midnight-grimoire:text-primary theme-midnight-grimoire:bg-none",
            "theme-collage-punk:text-foreground theme-collage-punk:bg-none"
          )}
        >
          {pageTitle}
        </h1>

        {/* 副标题 */}
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl">
          一个热衷于前端开发、UI/UX设计和创意交互的全栈探索者。
        </p>

        {/* 行动号召按钮 */}
        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/projects" className={cn(
                buttonVariants({ size: 'lg' }),
                "theme-midnight-grimoire:button-grimoire",
                "theme-retro-pixel:button-retro",
                "theme-collage-punk:button-punk",
                "theme-dopamine-pop:shadow-[3px_3px_0px_hsl(var(--foreground))] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5",
                "theme-brutalist-glitch:rounded-none border-2 border-foreground",
                "theme-acid-wave:rounded-sm acid-border",
            )}>
              <ArrowDown className="mr-2 h-5 w-5" />
              查看我的作品
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/contact" className={cn(
                buttonVariants({ variant: 'ghost', size: 'lg' }),
                "theme-midnight-grimoire:button-grimoire",
                "theme-retro-pixel:button-retro",
                "theme-collage-punk:button-punk",
                 "theme-brutalist-glitch:rounded-none border-2 border-transparent hover:border-foreground",
            )}>
              <Send className="mr-2 h-5 w-5" />
              联系我
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};