// src/components/sections/home/HeroSection.tsx
import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowDown, Send } from 'lucide-react';

// ------------------------------------------------------------------
// 动画变体 (Variants)
// ------------------------------------------------------------------

// 容器变体，用于编排子元素动画
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // 子元素依次出现的间隔
      delayChildren: 0.3,   // 容器动画开始前的延迟
    },
  },
};

// 标题单词的入场动画
const wordVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 12,
      stiffness: 100,
    },
  },
};

// 其他元素（徽章、按钮等）的淡入动画
const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// ------------------------------------------------------------------
// 主组件
// ------------------------------------------------------------------

const slogan = "用代码--塑造交互新体验";

export const HeroSection = () => {
  const controls = useAnimation();

  // 辉光跟随鼠标效果
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY, currentTarget } = e;
      const rect = (currentTarget as HTMLElement).getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      controls.start({
        '--mouse-x': `${x}px`,
        '--mouse-y': `${y}px`,
        opacity: 1,
      });
    };
    
    const section = document.getElementById('hero-section');
    section?.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      section?.removeEventListener('mousemove', handleMouseMove);
    };
  }, [controls]);


  return (
    <section 
      id="hero-section"
      className={cn(
        "relative w-full max-w-6xl text-center flex flex-col items-center justify-center snap-start overflow-hidden",
        "min-h-[calc(95vh-var(--header-height))]", // 确保填满屏幕
        "pt-10 pb-20 px-4"
      )}
      onMouseLeave={() => controls.start({ opacity: 0 })}
    >
      {/* 交互式辉光背景 */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: 'radial-gradient(400px at var(--mouse-x) var(--mouse-y), hsla(var(--primary)/0.2), transparent 80%)',
        }}
        initial={{ opacity: 0 }}
        animate={controls}
        transition={{ duration: 0.3, ease: 'linear' }}
      />
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="z-10 flex flex-col items-center space-y-8" // 增加了 space-y
      >
        {/* 徽章 */}
        <motion.div variants={itemVariants} className={cn(
            "inline-block rounded-full px-4 py-1.5 text-sm font-medium",
            "bg-primary/10 text-primary",
            "theme-brutalist-glitch:bg-primary theme-brutalist-glitch:text-primary-foreground theme-brutalist-glitch:rounded-none theme-brutalist-glitch:border-2 theme-brutalist-glitch:border-foreground",
            "theme-retro-pixel:button-retro text-xs",
            "theme-acid-wave:acid-border rounded-sm",
            "theme-collage-punk:bg-white border-2 border-dashed border-foreground"
        )}>
          Tony.PGL
        </motion.div>

        {/* 主标题 - 动态编排 */}
        <h1
          data-text={slogan} // 保持glitch效果的数据源
          className={cn(
            "text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl",
            // 主题化样式，保持不变
            "animated-gradient-text bg-gradient-to-r from-primary via-purple-500 to-pink-500 text-transparent bg-clip-text",
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
         
          <motion.div variants={itemVariants} className="block mt-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
            {slogan}
          </motion.div>
        </h1>
        
        {/* 副标题 */}
        <motion.p variants={itemVariants} className="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl">
          点击“我的作品”进行探索
        </motion.p>

        {/* 行动号召按钮 */}
        <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4 pt-4">
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
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* 向下滚动提示 */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'easeInOut',
          }}
        >
          <ArrowDown size={24} />
        </motion.div>
        <span className="text-xs tracking-widest">向下滚动</span>
      </motion.div>
    </section>
  );
};