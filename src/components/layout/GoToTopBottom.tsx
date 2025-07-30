// src/components/layout/GoToTopBottom.tsx

"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, ArrowDown } from 'lucide-react';

import { useScrollContainer } from '@/contexts/ScrollContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export const GoToTopBottom = () => {
  const { mainRef } = useScrollContainer();
  const [isVisible, setIsVisible] = useState(false);
  const [currentIcon, setCurrentIcon] = useState<'up' | 'down'>('down');
  
  // 使用 useRef 来存储状态，避免不必要的重渲染
  const isAtBottomRef = useRef(false);

  useEffect(() => {
    const mainEl = mainRef.current;
    
    // 如果 mainEl 尚未准备好，则不执行任何操作
    if (!mainEl) {
      // 可以在这里加一个延迟重试的逻辑，但通常情况下 useEffect 的依赖会处理
      return;
    }

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = mainEl;
      
      // 1. 更新可见性状态
      setIsVisible(scrollTop > 300);
      
      // 2. 更新是否在底部的状态
      const atBottom = scrollHeight - scrollTop - clientHeight < 50;
      if (atBottom !== isAtBottomRef.current) {
        isAtBottomRef.current = atBottom;
        setCurrentIcon(atBottom ? 'up' : 'down');
      }
    };

    // 添加事件监听
    mainEl.addEventListener('scroll', handleScroll, { passive: true });
    
    // 初始调用一次以设置初始状态
    handleScroll();

    // 清理函数
    return () => {
      mainEl.removeEventListener('scroll', handleScroll);
    };
    
    // 3. 依赖项包含了 mainRef.current，这样当 ref 变化时 effect 会重新运行
    // 这是一种常见的确保 ref 可用的模式
  }, [mainRef, mainRef.current]); 

  const handleClick = () => {
    const mainEl = mainRef.current;
    if (!mainEl) return;

    if (isAtBottomRef.current) {
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
              "theme-retro-pixel:button-retro",
              "theme-collage-punk:button-punk",
              "theme-brutalist-glitch:rounded-none border-2 border-foreground"
            )}
            aria-label={currentIcon === 'up' ? "返回顶部" : "滚动到底部"}
          >
            {/* 使用一个 state 来控制图标切换，确保动画流畅 */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIcon}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {currentIcon === 'up' ? (
                  <ArrowUp className="h-6 w-6" />
                ) : (
                  <ArrowDown className="h-6 w-6" />
                )}
              </motion.div>
            </AnimatePresence>
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};