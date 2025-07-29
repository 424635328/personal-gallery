// src/components/layout/Header.tsx

'use client';

import React, { useState } from 'react'; 
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X, ChevronDown, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ThemeToggle } from './ThemeToggle';
import { cn } from '@/lib/utils';

// --- 结构化的导航数据 ---
// 定义更精确的类型，以帮助 TypeScript 理解数据结构
type NavItem = {
  href: string;
  label: string;
  isDropdown?: false; // 明确普通链接没有 isDropdown
};

type DropdownItem = {
  label: string;
  isDropdown: true;
  href?: undefined; // 明确下拉菜单父项没有 href
  items: NavItem[];
};

type NavLink = NavItem | DropdownItem;

const navLinks: NavLink[] = [
  { href: '/', label: '首页' },
  { href: '/projects', label: '我的作品' },
  { 
    label: '关于',
    isDropdown: true,
    items: [
      { href: '/about', label: '关于我' },
      { href: '/#', label: '我的博客' }, // 占位符
      { href: '/#', label: '技能栈' }, // 占位符
    ],
  },
];

export function Header() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // 滚动感知逻辑
  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 10);
  });

  return (
    <motion.header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-border/20 bg-background/80 backdrop-blur-lg shadow-md"
          : "bg-transparent border-b-transparent"
      )}
    >
      <div className="container flex h-16 items-center">
        
        {/* Logo */}
        <Link href="/" className="mr-8 flex items-center space-x-2">
          <Image src="/logo.svg" alt="Logo" width={28} height={28} className="h-7 w-7" />
          <span className="text-xl font-semibold">Gallery</span>
        </Link>
        
        {/* 桌面端导航 */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navLinks.map((link) => 
            link.isDropdown ? (
              // 如果是下拉菜单
              <DropdownMenu key={link.label}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-1 text-muted-foreground hover:text-primary">
                    {link.label} <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {link.items.map(item => (
                    <DropdownMenuItem key={item.label} asChild>
                      {/* 这里的 item.href 是明确存在的 */}
                      <Link href={item.href}>{item.label}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              // 如果是普通链接
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "transition-colors hover:text-primary",
                  pathname === link.href ? "text-primary font-semibold" : "text-muted-foreground"
                )}
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        {/* 右侧操作区 */}
        <div className="ml-auto flex items-center space-x-2">
          <ThemeToggle />
          <Button asChild className="hidden sm:inline-flex">
            <Link href="/contact">
              <Send className="mr-2 h-4 w-4" /> 联系我
            </Link>
          </Button>
          
          {/* 移动端菜单 */}
          <div className="md:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full">
                <div className="flex justify-between items-center mb-8">
                  <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center space-x-2">
                    <Image src="/logo.svg" alt="Logo" width={24} height={24} />
                    <span className="font-bold">Gallery</span>
                  </Link>
                  <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                    <X className="h-6 w-6" />
                  </Button>
                </div>
                <nav className="flex flex-col space-y-2">
                  {navLinks.flatMap(link => 
                    link.isDropdown ? [
                      <p key={link.label} className="px-4 pt-4 pb-2 font-semibold text-muted-foreground">{link.label}</p>,
                      ...link.items.map(item => 
                        <Link key={item.label} href={item.href} onClick={() => setMobileMenuOpen(false)} className="px-4 py-2 text-lg rounded-md hover:bg-accent">{item.label}</Link>
                      )
                    ] : [
                      <Link key={link.label} href={link.href} onClick={() => setMobileMenuOpen(false)} className="px-4 py-2 text-lg rounded-md hover:bg-accent">{link.label}</Link>
                    ]
                  )}
                </nav>
                <div className="absolute bottom-8 left-0 right-0 px-8">
                  <Button asChild className="w-full">
                    <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>联系我</Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  );
}

export default Header;