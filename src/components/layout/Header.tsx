// src/components/layout/Header.tsx

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X, ChevronDown, Send } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";

// --- 结构化的导航数据  ---
type NavItem = {
  href: string;
  label: string;
  isDropdown?: false;
};

type DropdownItem = {
  label: string;
  isDropdown: true;
  href?: undefined;
  items: NavItem[];
};

type NavLink = NavItem | DropdownItem;

const navLinks: NavLink[] = [
  { href: "/", label: "首页" },
  { href: "/projects", label: "我的作品" },
  {
    label: "关于",
    isDropdown: true,
    items: [
      { href: "/about", label: "关于我" },
      { href: "/blog", label: "我的博客" },
      { href: "/skills", label: "技能栈" },
    ],
  },
];

export function Header() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // 监听滚动事件，优化性能
  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50); // 调整触发滚动效果的阈值
  });

  // 处理导航链接点击
  const handleNavLinkClick = () => {
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };

  // 渲染导航菜单项
  const renderNavItems = () => {
    return navLinks.map((link) =>
      link.isDropdown ? (
        <DropdownMenu key={link.label}>
          <DropdownMenuTrigger
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "flex items-center gap-1 text-muted-foreground hover:text-primary",
              pathname.startsWith(getDropdownPath(link.items))
                ? "text-primary font-medium"
                : ""
            )}
          >
            {link.label} <ChevronDown className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48">
            {link.items.map((item) => (
              <DropdownMenuItem key={item.label} asChild>
                <Link href={item.href} onClick={handleNavLinkClick}>
                  <div
                    className={cn(
                      "px-3 py-2 rounded-md",
                      pathname === item.href
                        ? "bg-accent text-primary"
                        : "hover:bg-accent/20"
                    )}
                  >
                    {item.label}
                  </div>
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link
          key={link.label}
          href={link.href}
          onClick={handleNavLinkClick}
          className={cn(
            "transition-colors duration-200 hover:text-primary",
            pathname === link.href
              ? "text-primary font-medium"
              : "text-muted-foreground"
          )}
        >
          {link.label}
        </Link>
      )
    );
  };

  // 获取下拉菜单的基础路径
  const getDropdownPath = (items: NavItem[]) => {
    const firstItem = items[0];
    if (!firstItem) return "";
    return firstItem.href.split("/").slice(0, 2).join("/");
  };

  return (
    <motion.header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-border/20 bg-background/95 backdrop-blur-xl shadow-sm"
          : "bg-transparent border-b-transparent"
      )}
      style={{
        backdropFilter: scrolled ? "blur(16px)" : "none",
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo区域 */}
          <Link href="/" className="flex items-center space-x-2 group">
            <Image
              src="/logo.svg"
              alt="Gallery Logo"
              width={32}
              height={32}
              className="h-8 w-8 transition-transform duration-500 group-hover:rotate-6"
              priority
            />
            <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500 animate-pulse-slow">
              Gallery
            </span>
          </Link>

          {/* 桌面端导航 */}
          <nav className="hidden md:flex items-center space-x-8">
            {renderNavItems()}
          </nav>

          {/* 右侧操作区 */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />

            <Link
              href="/contact"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "hidden sm:flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-md"
              )}
            >
              <Send className="mr-2 h-4 w-4" /> 联系我
            </Link>

            {/* 移动端菜单按钮 */}
            <div className="md:hidden">
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full max-w-md">
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-8">
                      <Link href="/" className="flex items-center space-x-2">
                        <Image
                          src="/logo.svg"
                          alt="Logo"
                          width={28}
                          height={28}
                        />
                        <span className="text-xl font-bold">Gallery</span>
                      </Link>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <X className="h-6 w-6" />
                      </Button>
                    </div>

                    <nav className="space-y-4">
                      {navLinks.map((link) =>
                        link.isDropdown ? (
                          <div key={link.label}>
                            <h3 className="px-3 py-2 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                              {link.label}
                            </h3>
                            <div className="space-y-1 pl-3">
                              {link.items.map((item) => (
                                <Link
                                  key={item.label}
                                  href={item.href}
                                  onClick={() => setMobileMenuOpen(false)}
                                  className={cn(
                                    "block px-3 py-2 rounded-md text-base",
                                    pathname === item.href
                                      ? "bg-accent text-primary"
                                      : "hover:bg-accent/20"
                                  )}
                                >
                                  {item.label}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <Link
                            key={link.label}
                            href={link.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className={cn(
                              "block px-3 py-3 rounded-md text-base font-medium",
                              pathname === link.href
                                ? "bg-accent text-primary"
                                : "hover:bg-accent/20"
                            )}
                          >
                            {link.label}
                          </Link>
                        )
                      )}
                    </nav>

                    <div className="mt-8 pt-6 border-t border-border/20">
                      <Link
                        href="/contact"
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          buttonVariants({ variant: "outline" }),
                          "w-full py-3"
                        )}
                      >
                        联系我
                      </Link>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}

export default Header;
