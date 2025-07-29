"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { navLinks } from "@/config/nav";
import { cn } from "@/lib/utils";

// 动画变体定义
const itemVariants = {
  closed: { opacity: 0, y: 20 },
  open: { opacity: 1, y: 0 },
};

const listVariants = {
  closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
  open: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
};

// 1. 定义 props 类型以接收点击处理器
interface MobileNavProps {
  onLinkClick: () => void;
}

// 2. 更新组件签名以接收 onLinkClick prop
export function MobileNav({ onLinkClick }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // 3. 创建一个组合的点击处理函数
  // 这个函数会先触发导航提示，然后关闭菜单
  const handleLinkClick = () => {
    onLinkClick();
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
              className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-background shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center p-6 border-b">
                {/* 4. 将新的点击处理器应用到 Logo 链接 */}
                <Link href="/" onClick={handleLinkClick}>
                  <Image
                    src="/logo.svg"
                    alt="Logo"
                    width={28}
                    height={28}
                  />
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
                className="p-6"
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
                                {/* 4. 将新的点击处理器应用到下拉菜单链接 */}
                                <Link
                                  href={item.href}
                                  onClick={handleLinkClick}
                                  className={cn(
                                    "block px-3 py-2 rounded-md text-lg",
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
                        // 4. 将新的点击处理器应用到标准链接
                        <Link
                          href={link.href}
                          onClick={handleLinkClick}
                          className={cn(
                            "block px-3 py-2 rounded-md text-lg font-medium",
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
                <motion.div
                  className="mt-8 pt-6 border-t"
                  variants={itemVariants}
                >
                  {/* 4. 将新的点击处理器应用到 “联系我” 链接 */}
                  <Link
                    href="/contact"
                    onClick={handleLinkClick}
                    className={cn(
                      "w-full flex items-center justify-center gap-2",
                      "text-lg font-medium",
                      "py-3",
                    )}
                  >
                    联系我
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}