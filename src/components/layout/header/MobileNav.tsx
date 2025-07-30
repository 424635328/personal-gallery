// src/components/layout/header/MobileNav.tsx

"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Send } from "lucide-react"; // Import Send icon

import { Button } from "@/components/ui/button";
import { navLinks } from "@/config/nav";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button"; // Import buttonVariants

const itemVariants = {
  closed: { opacity: 0, y: 20 },
  open: { opacity: 1, y: 0 },
};

const listVariants = {
  closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
  open: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
};

// 1. 更新 props 类型定义，现在 onLinkClick 接收一个 href 字符串
interface MobileNavProps {
  onLinkClick: (href: string) => void;
}

export function MobileNav({ onLinkClick }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // 2. 更新组合的点击处理函数，使其接受并传递 href
  const handleLinkClick = (href: string) => {
    onLinkClick(href);
    setIsOpen(false);
  };

  return (
    <div className="md:hidden">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(true)}
        aria-label="Open mobile menu"
      >
        <Menu className="h-6 w-6" />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-background shadow-lg flex flex-col" // 使用 flex-col
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center p-4 border-b">
                {/* 3. 更新 onClick 调用，传入 href */}
                <Link href="/" onClick={() => handleLinkClick("/")} className="flex items-center gap-2">
                  <Image
                    src="/LOGO.jpeg" // 统一 Logo 源
                    alt="Logo"
                    width={28}
                    height={28}
                    className="rounded-full"
                  />
                  <span className="font-bold text-foreground">Gallery</span>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close mobile menu"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>

              <motion.div
                className="p-4 flex-1 overflow-y-auto" // 使菜单内容可滚动
                initial="closed"
                animate="open"
                exit="closed"
                variants={listVariants}
              >
                <ul className="space-y-2">
                  {navLinks.map((link) => (
                    <motion.li key={link.label} variants={itemVariants}>
                      {link.isDropdown ? (
                        <div>
                          <h3 className="px-3 py-2 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                            {link.label}
                          </h3>
                          <ul className="space-y-1 pl-4">
                            {link.items.map((item) => (
                              <motion.li key={item.href} variants={itemVariants}>
                                {/* 3. 更新 onClick 调用，传入 href */}
                                <Link
                                  href={item.href}
                                  onClick={() => handleLinkClick(item.href)}
                                  className={cn(
                                    "block px-3 py-2 rounded-md text-base",
                                    pathname === item.href
                                      ? "font-semibold text-primary"
                                      : "text-foreground hover:bg-accent"
                                  )}
                                >
                                  {item.label}
                                </Link>
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      ) : (
                        // 3. 更新 onClick 调用，传入 href
                        <Link
                          href={link.href}
                          onClick={() => handleLinkClick(link.href)}
                          className={cn(
                            "block px-3 py-2 rounded-md text-base font-medium",
                            pathname === link.href
                              ? "text-primary bg-accent"
                              : "text-foreground hover:bg-accent"
                          )}
                        >
                          {link.label}
                        </Link>
                      )}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                className="p-4 mt-auto border-t" // mt-auto 将其推到底部
                variants={itemVariants}
              >
                {/* 3. 更新 onClick 调用，传入 href */}
                <Link
                  href="/contact"
                  onClick={() => handleLinkClick("/contact")}
                  className={cn(
                    buttonVariants({ size: "lg", className: "w-full" }),
                  )}
                >
                  <Send className="mr-2 h-4 w-4" />
                  联系我
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}