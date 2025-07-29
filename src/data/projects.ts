// src/data/projects.ts

import { format } from 'date-fns';

// --- 1. 更新 Project 接口，添加新字段 ---
export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  link?: string;
  // --- 新增字段 ---
  status: 'completed' | 'in-progress' | 'archived'; // 项目状态
  date: string; // 项目完成或开始日期，格式：'YYYY-MM-DD'
  client?: string; // 客户或项目类型，可选
}

// --- 2. 更新你的作品列表，为每个项目添加新数据 ---
export const projects: Project[] = [
  {
    id: 'proj-01',
    title: 'AI 图像生成器',
    description: '一个基于 DALL-E API 开发的图像生成应用，使用 React 和 Tailwind CSS 构建，实现了富有创意的用户体验。',
    imageUrl: '/images/project-01.png',
    tags: ['React', 'Next.js', 'AI', 'Tailwind CSS'],
    link: 'https://github.com/424635328/personal-gallery',
    // --- 添加新数据 ---
    status: 'completed',
    date: '2024-04-15',
    client: '个人项目'
  },
  {
    id: 'proj-02',
    title: '现代化数据仪表盘',
    description: '一个动态的数据可视化仪表盘，使用 Recharts 和 Next.js 构建，提供实时的业务洞察。',
    imageUrl: '/images/project-02.png',
    tags: ['Next.js', 'Recharts', 'Data-Viz'],
    link: 'https://github.com/424635328/personal-gallery',
    // --- 添加新数据 ---
    status: 'archived',
    date: '2023-11-20',
    client: '概念验证'
  },
  {
    id: 'proj-03',
    title: '个人作品集网站',
    description: '一个展示个人作品的动态画廊，注重交互和动画效果，使用 Framer Motion 和玻璃拟态风格。',
    imageUrl: '/images/project-03.png',
    tags: ['Framer Motion', 'Next.js', 'TypeScript'],
    // 这个项目没有 link，因为它就是当前网站
    // --- 添加新数据 ---
    status: 'in-progress',
    date: '2024-05-20',
    client: '个人项目'
  },
];


// --- 3. 新增辅助函数，供 ProjectCard 使用 ---
/**
 * 将日期字符串 (如 '2024-05-20') 格式化为更易读的格式 (如 '2024年 5月')
 * @param dateString - 日期字符串
 * @returns 格式化后的日期字符串
 */
export const getFormattedDate = (dateString: string): string => {
  try {
    // 使用 date-fns 的 format 函数
    return format(new Date(dateString), 'yyyy年 M月');
  } catch {
    console.error("Invalid date string:", dateString);
    return "未知日期";
  }
};