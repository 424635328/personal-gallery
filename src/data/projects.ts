// src/data/projects.ts

import { format } from 'date-fns';
import { Github, Globe } from 'lucide-react';

/* 项目类型定义 */
export interface Project {
  id: string;
  title: string;
  subtitle: string; // 新增: 一句话概括
  description: string;
  imageUrl: string;
  tags: string[];
  highlights: string[]; // 新增: 核心亮点列表
  liveUrl?: string; // 新增: 在线体验地址
  sourceUrl?: string; // 重命名: 源码地址
  status: 'completed' | 'in-progress' | 'archived';
  date: string;
  client?: string;
}

/* 项目数据列表 (已根据您提供的README重构) */
export const projects: Project[] = [
  {
    id: 'proj-offerscore',
    title: 'OfferScore™',
    subtitle: '数据驱动的职业决策智能助手',
    description: '一个现代化的 Web 应用，旨在赋能用户量化和比较不同工作机会的真实价值，通过科学评分与智能分析，助您做出更明智的职业决策。',
    imageUrl: '/images/project-01.png', // 请替换为 OfferScore 的项目图片
    tags: ['Next.js', 'TypeScript', 'Supabase', 'Vercel KV', 'NextAuth.js'],
    highlights: [
      '十余种沉浸式动态主题，极致个性化体验',
      '六维度权重智能评估模型，结合短板效应',
      '集成速率限制与账户锁定的多层安全防御',
      '支持多格式导出与多 Offer 可视化对比',
    ],
    liveUrl: 'https://offerscore.vercel.app/',
    sourceUrl: 'https://github.com/424635328/OfferScore',
    status: 'completed',
    date: '2024-05-01',
    client: '个人全栈项目',
  },
  {
    id: 'proj-surveykit',
    title: 'SurveyKit',
    subtitle: '美学与功能兼备的多用户问卷 SaaS 平台',
    description: '一款现代、美观、功能强大的多用户问卷平台。提供从问卷创建、分享、数据分析到 AI 人格报告的全流程解决方案。',
    imageUrl: '/images/project-02.png', // 请替换为 SurveyKit 的项目图片
    tags: ['Node.js', 'JavaScript', 'Redis', 'JWT', 'Serverless'],
    highlights: [
      '火山方舟大模型驱动，一键生成 MBTI 风格人格报告',
      '所见即所得的可视化问卷编辑器与主题定制器',
      '基于 JWT + Redis 实现的安全多用户认证与管理系统',
      '全局命令面板 (⌘K) 与 3D 辉光卡片等极致交互体验',
    ],
    liveUrl: 'https://survey-kit.vercel.app/',
    sourceUrl: 'https://github.com/424635328/SurveyKit',
    status: 'completed',
    date: '2024-03-15',
    client: '个人全栈项目',
  },
  {
    id: 'proj-cpp-server',
    title: 'C++ 高性能服务器框架',
    subtitle: '基于 Boost.Asio 的轻量级异步 I/O 服务器框架',
    description: '一个基于 Boost.Asio 构建的轻量级、高性能服务器框架，采用模块化设计，通过线程池高效处理并发连接，并包含一个 HTTP 服务器示例。',
    imageUrl: '/images/project-03.png', // 请替换为 C++ Server 的项目图片
    tags: ['C++', 'Boost.Asio', '多线程', 'HTTP', 'CMake'],
    highlights: [
      '利用 Boost.Asio 实现异步非阻塞 I/O，高效处理并发',
      '基于线程池管理连接与请求，最大化吞吐量',
      '模块化设计，易于通过接口扩展协议与请求处理器',
      '跨平台兼容，支持 Windows 和 Linux',
    ],
    sourceUrl: 'https://github.com/424635328/cpp-asio-server',
    status: 'completed',
    date: '2024-01-10',
    client: '底层框架开发'
  },
  {
    id: 'proj-android-player',
    title: 'Android 自定义播放器',
    subtitle: '基于 FFmpeg 和 NDK 的音视频播放器',
    description: '一个展示如何使用 FFmpeg (解码) 和 OpenSL ES (音频) 构建自定义音视频播放器的示例 App。视频被预解码为 YUV 文件并渲染到 SurfaceView。',
    imageUrl: '/images/project-04.png', // 请替换为 Android Player 的项目图片
    tags: ['Android', 'JNI', 'NDK', 'FFmpeg', 'C++'],
    highlights: [
      '通过 JNI 桥接 Java 层与 C++ Native 层',
      '使用 FFmpeg 对视频流进行解码并保存为 YUV 文件',
      '在 Native 层读取 YUV 并渲染到 Android Surface',
      '实现音视频同步跳转 (Seek) 与多倍速播放控制',
    ],
    sourceUrl: 'https://github.com/424635328/MediaPlayer',
    status: 'archived',
    date: '2023-11-20',
    client: '技术学习与演示'
  },
];

/* 日期格式化工具 */
export const getFormattedDate = (dateString: string): string => {
  try {
    return format(new Date(dateString), 'yyyy年 M月');
  } catch {
    console.error("Invalid date string:", dateString);
    return "未知日期";
  }
};