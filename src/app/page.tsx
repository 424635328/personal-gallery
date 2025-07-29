// src/app/page.tsx
// 首页组件，展示应用的主要内容和功能

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowDown, Code, PenTool, Sparkles, Send } from 'lucide-react';

// --- 动画变体  ---
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
    // 1. 主容器: 占据父级(main)的所有空间，并成为新的 Flex 容器
    <div className={cn(
      "w-full h-full flex flex-col items-center justify-center text-center relative overflow-hidden px-4",
      "font-sans",
      "theme-warm-sunshine:font-serif", "theme-dopamine-pop:font-dopamine", "theme-zen-ink:font-sans",
      "theme-solarpunk-utopia:font-solarpunk", "theme-rustic-artisan:font-artisan",
      "theme-brutalist-glitch:font-brutalist theme-brutalist-glitch:uppercase",
      "theme-retro-pixel:font-brutalist theme-retro-pixel:uppercase", "theme-acid-wave:font-sans theme-acid-wave:uppercase"
    )}>
      
      {/* 2. 背景效果: 依然使用绝对定位，相对于主容器 */}
      <div className="absolute top-0 left-0 -z-20 h-full w-full bg-background/55">
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
          <motion.div variants={fadeIn} className={cn("inline-block rounded-full px-4 py-1.5 text-sm font-medium", "bg-neutral-800/60 border border-neutral-700 text-neutral-300")}>
            Tony.PGL
          </motion.div>
          
          <motion.h1 variants={fadeIn} className={cn(
              "text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl",
              "text-neutral-800", 
              "dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-blue-400 dark:via-purple-500 dark:to-pink-500",
              "dark:animate-aurora dark:[background-size:200%_200%]"
            )}>
            用代码与设计，塑造交互新体验
          </motion.h1>
        </motion.div>

        {/* 核心能力卡片 */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3 max-w-4xl"
        >
          {[
            { icon: <Code className="h-6 w-6 text-neutral-400 group-hover:text-white transition-colors" />, title: "前端开发", description: "精通现代前端技术栈，构建高性能应用。" },
            { icon: <PenTool className="h-6 w-6 text-neutral-400 group-hover:text-white transition-colors" />, title: "UI/UX 设计", description: "注重用户体验，打造直观优雅的界面。" },
            { icon: <Sparkles className="h-6 w-6 text-neutral-400 group-hover:text-white transition-colors" />, title: "创意交互", description: "热衷于通过动效为产品注入生命力。" },
          ].map((feature, index) => (
            <motion.div key={index} variants={fadeIn} whileHover={{ y: -5, transition: { type: 'spring', stiffness: 400, damping: 20 } }}>
              <div className={cn("group flex h-full flex-col items-center justify-center text-center gap-4 rounded-2xl p-8 transition-all duration-300", "bg-black/30 border border-neutral-800 hover:border-neutral-700 hover:bg-black/50")}>
                {feature.icon}
                <div>
                  <h3 className="font-semibold text-neutral-200">{feature.title}</h3>
                  <p className="mt-1 text-sm text-neutral-400">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* 行动号召按钮 */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.6 }}
          className="mt-12 flex flex-wrap justify-center gap-4"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/projects"
              className={cn(
                buttonVariants({ size: 'lg' }),
                "bg-white text-black hover:bg-neutral-200"
              )}
            >
              <ArrowDown className="mr-2 h-5 w-5" />
              查看我的作品
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ variant: 'ghost', size: 'lg' }),
                "hover:bg-white/10 hover:text-white"
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