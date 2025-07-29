// src/components/ui/BackToTopButton.tsx

'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

/**
 * 一个位于右下角、滚动时平滑出现的“返回顶部”按钮。
 * @param {object} props - 组件属性
 * @param {number} [props.showAt=200] - 滚动多少像素后显示按钮，默认为 200px。
 * @param {string} [props.className] - 允许传入额外的 className 来自定义样式。
 */
export function BackToTopButton({ showAt = 200, className }: { showAt?: number; className?: string; }) {
  const [isVisible, setIsVisible] = useState(false);

  // 监听滚动事件
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > showAt) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    // 组件卸载时移除监听器
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, [showAt]);

  // 平滑滚动到顶部的函数
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.5 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.5 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <Button
            size="icon"
            onClick={scrollToTop}
            aria-label="返回顶部"
            className={cn(
              "rounded-full h-12 w-12 shadow-lg transition-all duration-300",
              // --- 默认主题样式 ---
              "bg-primary text-primary-foreground hover:bg-primary/90",

              // --- 特定主题的样式覆盖 ---
              "theme-warm-sunshine:bg-primary theme-warm-sunshine:shadow-[3px_3px_0px_hsl(var(--foreground))]",
              "theme-dopamine-pop:bg-primary theme-dopamine-pop:shadow-pop-out hover:theme-dopamine-pop:scale-110",
              "theme-zen-ink:border theme-zen-ink:border-primary/50",
              "theme-solarpunk-utopia:bg-accent theme-solarpunk-utopia:text-accent-foreground",
              "theme-rustic-artisan:bg-secondary theme-rustic-artisan:text-secondary-foreground",
              "theme-brutalist-glitch:rounded-none theme-brutalist-glitch:border-2 theme-brutalist-glitch:border-foreground",
              "theme-retro-pixel:button-retro",
              "theme-acid-wave:acid-border theme-acid-wave:rounded-full",
              "theme-midnight-grimoire:button-grimoire",
              "theme-collage-punk:button-punk",
              className
            )}
          >
            <ArrowUp className="h-6 w-6" />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}