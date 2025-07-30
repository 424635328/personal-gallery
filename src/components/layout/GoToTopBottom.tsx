// src/components/layout/GoToTopBottom.tsx

"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, ArrowDown } from 'lucide-react';

import { useScrollContainer } from '@/contexts/ScrollContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export const GoToTopBottom = () => {
  const { mainRef } = useScrollContainer();
  const [isVisible, setIsVisible] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const mainEl = mainRef.current;
    if (!mainEl) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = mainEl;
      
      // 当滚动超过 300px 时显示按钮
      setIsVisible(scrollTop > 300);
      
      // 当滚动到距离底部 50px 以内时，认为是到达底部
      setIsAtBottom(scrollHeight - scrollTop - clientHeight < 50);
    };

    mainEl.addEventListener('scroll', handleScroll, { passive: true });
    // 初始检查一次
    handleScroll();

    return () => {
      mainEl.removeEventListener('scroll', handleScroll);
    };
  }, [mainRef]);

  const handleClick = () => {
    const mainEl = mainRef.current;
    if (!mainEl) return;

    if (isAtBottom) {
      // 如果在底部，则返回顶部
      mainEl.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // 否则，滚动到底部
      mainEl.scrollTo({ top: mainEl.scrollHeight, behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="fixed bottom-8 right-8 z-50"
        >
          <Button
            size="icon"
            onClick={handleClick}
            className={cn(
              "h-12 w-12 rounded-full shadow-lg",
              // 主题化
              "theme-retro-pixel:button-retro",
              "theme-collage-punk:button-punk",
              "theme-brutalist-glitch:rounded-none border-2 border-foreground"
            )}
            aria-label={isAtBottom ? "返回顶部" : "滚动到底部"}
          >
            {isAtBottom ? (
              <ArrowUp className="h-6 w-6" />
            ) : (
              <ArrowDown className="h-6 w-6" />
            )}
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};