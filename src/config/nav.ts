// src/config/nav.ts

export type NavItem = {
  href: string;
  label: string;
  isDropdown?: false;
};

export type DropdownItem = {
  id: string; // Add an ID for keying and logic
  label:string;
  isDropdown: true;
  href?: undefined;
  items: NavItem[];
};

export type NavLink = NavItem | DropdownItem;

export const navLinks: NavLink[] = [
  { href: "/", label: "首页" },
  { href: "/projects", label: "我的作品" },
  {
    id: "about",
    label: "关于",
    isDropdown: true,
    items: [
      { href: "/about", label: "关于我" },
      { href: "/blog", label: "我的博客" },
      { href: "/skills", label: "技能栈" },
    ],
  },
];