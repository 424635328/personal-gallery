'use client';

import * as React from "react";
import { useTheme } from "next-themes";
import { toast } from "sonner"; // 引入 toast 用于反馈
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Sun, Moon, Palette, Smile, Brush, Leaf, Hammer, Terminal, Bot, Zap, BookOpen, Wand } from "lucide-react"; // 我为你多加了一个图标

// 定义主题列表，移除了 "needsReload" 属性
const themes = [
  { name: "dark", label: "深空科技", icon: <Moon className="h-4 w-4" /> },
  { name: "theme-solarpunk-utopia", label: "太阳朋克", icon: <Leaf className="h-4 w-4" /> },
  { name: "theme-warm-sunshine", label: "暖阳工坊", icon: <Sun className="h-4 w-4" /> },
  { name: "theme-dopamine-pop", label: "多巴胺波普", icon: <Smile className="h-4 w-4" /> },
  { name: "theme-zen-ink", label: "禅意水墨", icon: <Brush className="h-4 w-4" /> },
  { name: "theme-rustic-artisan", label: "质朴工匠", icon: <Hammer className="h-4 w-4" /> },
  { name: "theme-brutalist-glitch", label: "粗野主义", icon: <Terminal className="h-4 w-4" /> },
  { name: "theme-retro-pixel", label: "复古像素", icon: <Bot className="h-4 w-4" /> },
  { name: "theme-acid-wave", label: "酸性浪潮", icon: <Zap className="h-4 w-4" /> },
  { name: "theme-midnight-grimoire", label: "午夜秘典", icon: <BookOpen className="h-4 w-4" /> },
  { name: "theme-collage-punk", label: "拼贴朋克", icon: <Wand className="h-4 w-4" /> }, // 换了个更合适的图标
];

export function ThemeToggle() {
  // 使用 resolvedTheme 更可靠，它会返回实际应用的主题（例如当默认是'system'时）
  const { setTheme, resolvedTheme } = useTheme();

  // 简化后的主题切换处理函数
  const handleThemeChange = (newTheme: string) => {
    if (newTheme !== resolvedTheme) {
      setTheme(newTheme);
      // 直接在这里调用 toast，无需通过 props 回调
      const themeConfig = themes.find(t => t.name === newTheme);
      toast.success(`主题已切换: ${themeConfig?.label || newTheme}`);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Palette className="h-[1.2rem] w-[1.2rem] transition-all" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>选择一个视觉主题</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {themes.map((t) => (
          <DropdownMenuItem 
            key={t.name} 
            onClick={() => handleThemeChange(t.name)}
            // 通过比较 resolvedTheme 来高亮当前主题
            className={resolvedTheme === t.name ? "bg-accent" : "cursor-pointer"}
          >
            {t.icon}
            <span className="ml-2">{t.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}