// src/components/layout/header/DesktopNav.tsx

"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { navLinks } from "@/config/nav";
import { cn } from "@/lib/utils";

// 1. 更新 props 类型定义，现在 onLinkClick 接收一个 href 字符串
interface DesktopNavProps {
  onLinkClick: (href: string) => void;
}

export function DesktopNav({ onLinkClick }: DesktopNavProps) {
  const pathname = usePathname();

  const isActive = (link: typeof navLinks[0]) => {
    if (link.isDropdown) {
      return link.items.some(item => pathname === item.href);
    }
    return pathname === link.href;
  };

  return (
    <nav className="hidden md:flex items-center space-x-2">
      {navLinks.map((link) => (
        <div key={link.label} className="relative">
          {link.isDropdown ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className={cn(
                    "flex items-center gap-1 px-4 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    isActive(link) ? "text-primary" : "text-muted-foreground hover:text-primary/80"
                  )}
                >
                  {link.label} <ChevronDown className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <AnimatePresence>
                <DropdownMenuContent asChild className="mt-2 w-48 origin-top">
                  <motion.div
                    layout // 添加 layout 属性以获得更好的动画效果
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                  >
                    {link.items.map((item) => (
                      <DropdownMenuItem key={item.href} asChild>
                        {/* 2. 更新 onClick 调用，传入 item.href */}
                        <Link href={item.href} onClick={() => onLinkClick(item.href)}>
                          {item.label}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </motion.div>
                </DropdownMenuContent>
              </AnimatePresence>
            </DropdownMenu>
          ) : (
            // 2. 更新 onClick 调用，传入 link.href
            <Link
              href={link.href}
              onClick={() => onLinkClick(link.href)}
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                isActive(link) ? "text-primary" : "text-muted-foreground hover:text-primary/80"
              )}
            >
              {link.label}
            </Link>
          )}
          
          {/* 活动下划线动画 */}
          {isActive(link) && (
            <motion.div
              layoutId="desktop-nav-underline"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
              initial={false} // 避免初始加载动画
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            />
          )}
        </div>
      ))}
    </nav>
  );
}