// src/components/layout/header/Header.tsx

"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { Send } from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";
import { useScrollContainer } from "@/contexts/ScrollContext";


export function Header() {
  const { mainRef } = useScrollContainer();
  const currentPathname = usePathname();
  
  const [isVisible, setIsVisible] = useState(true);
  // 使用 useRef 来存储上一次的滚动位置，避免不必要的重渲染
  const lastScrollY = useRef(0);

  // 使用 useEffect 监听滚动事件
  useEffect(() => {
    const mainEl = mainRef.current;
    if (!mainEl) return;

    const handleScroll = () => {
      const currentScrollY = mainEl.scrollTop;

      // 仅在滚动超过 Header 高度后才开始判断
      // 使用一个小的阈值（5px）来防止滚动抖动导致的频繁切换
      if (Math.abs(currentScrollY - lastScrollY.current) > 5) {
        if (currentScrollY > 100 && currentScrollY > lastScrollY.current) {
          // 向下滚动 -> 隐藏 Header
          setIsVisible(false);
        } else {
          // 向上滚动 -> 显示 Header
          setIsVisible(true);
        }
      }
      
      lastScrollY.current = currentScrollY;
    };

    mainEl.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      mainEl.removeEventListener('scroll', handleScroll);
    };
  }, [mainRef]);

  // 导航点击处理器
  const handleNavigationStart = (href: string) => {
    // 核心检查：如果目标路径与当前路径相同，则不执行任何操作
    if (href === currentPathname) {
      return;
    }

    const toastId = toast.loading("正在加载页面...");
    window.dispatchEvent(
      new CustomEvent('offerScoreNavigationStart', {
        detail: { toastId },
      })
    );
  };

  return (
    <motion.header
      className="sticky top-0 z-50 w-full  bg-background/10 backdrop-blur-lg"
      animate={isVisible ? "visible" : "hidden"}
      initial="visible" // 保证初始加载时可见
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* Logo 区域 */}
          <Link 
            href="/" 
            className="flex items-center space-x-2.5 group"
            onClick={() => handleNavigationStart("/")}
          >
            <motion.div
              whileHover={{ rotate: 15, scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <Image
                src="/logo.jpeg"
                alt="Gallery Logo"
                width={36}
                height={36}
                priority
                className="rounded-full"
              />
            </motion.div>
            <span className={cn(
              "text-xl font-bold tracking-tight text-foreground",
              "theme-zen-ink:text-primary",
              "theme-solarpunk-utopia:text-primary"
            )}>
              Gallery
            </span>
          </Link>

          {/* 桌面导航 */}
          <DesktopNav onLinkClick={handleNavigationStart} />

          {/* 右侧操作区 */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <ThemeToggle />
            
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ variant: "default", size: "default" }),
                "hidden sm:flex items-center gap-2"
              )}
              onClick={() => handleNavigationStart("/contact")}
            >
              <Send className="h-4 w-4" />
              联系我
            </Link>

            {/* 移动端导航 */}
            <MobileNav onLinkClick={handleNavigationStart} />
          </div>
        </div>
      </div>
    </motion.header>
  );
}

export default Header;