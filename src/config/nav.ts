// src/config/nav.ts

import { Home, FolderGit2, Sparkles, User, Rss, LucideIcon } from "lucide-react";

// ✨ 1. 定义更具体的类型，为 NavLink 和 NavItem 添加可选的 icon 属性
export interface NavItem {
  label: string;
  href: string;
  icon?: LucideIcon; // icon 是一个 Lucide 图标组件
}

export type NavLink = {
  isDropdown: false;
  label: string;
  href: string;
  icon?: LucideIcon;
} | {
  isDropdown: true;
  label: string;
  items: NavItem[];
  icon?: LucideIcon;
};

export const navLinks: NavLink[] = [
  {
    isDropdown: false,
    label: "首页",
    href: "/",
    icon: Home,
  },
  {
    isDropdown: false,
    label: "我的作品",
    href: "/projects",
    icon: FolderGit2,
  },
  {
    isDropdown: true,
    label: "关于",
    icon: Sparkles,
    items: [
      {
        label: "关于我",
        href: "/about",
        icon: User,
      },
      {
        label: "技能图谱",
        href: "/skills",
        icon: Sparkles,
      },
      {
        label: "博客文章",
        href: "/blog",
        icon: Rss,
      },
    ],
  },
];