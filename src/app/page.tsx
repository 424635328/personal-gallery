// src/app/page.tsx
// 首页组件，现在作为各个区块的装配器。

'use client';

import React from 'react';
import { cn } from '@/lib/utils';

// 导入新的、独立的区块组件
import { HeroSection } from '@/components/sections/home/HeroSection';
import { TechnologyShowcase } from '@/components/sections/home/TechnologyShowcase';
import { FeatureCards } from '@/components/sections/home/FeatureCards';
import { WorkflowSection } from '@/components/sections/home/WorkflowSection';
import { FinalCta } from '@/components/sections/home/FinalCta';

export default function HomePage() {
  return (
    // 主容器，应用全局主题字体和背景效果
    <main
      className={cn(
        'w-full flex flex-col items-center relative', 
        
        // --- 主题特定的字体类 ---
        'font-sans', // 默认字体
        'theme-warm-sunshine:font-serif',
        'theme-dopamine-pop:font-dopamine',
        'theme-zen-ink:font-sans',
        'theme-solarpunk-utopia:font-solarpunk',
        'theme-rustic-artisan:font-artisan',
        'theme-brutalist-glitch:font-brutalist theme-brutalist-glitch:uppercase',
        'theme-retro-pixel:font-brutalist theme-retro-pixel:uppercase',
        'theme-acid-wave:font-sans theme-acid-wave:uppercase',
        'theme-collage-punk:font-brutalist'
      )}
    >
      {/* --- 背景效果层 (z-index: -20) --- */}
      <div className={cn(
        "absolute top-0 left-0 -z-20 h-full w-full",
        // 主题特定的背景
        "theme-solarpunk-utopia:hero-bg-solarpunk",
        "theme-midnight-grimoire:hero-bg-grimoire",
        "theme-collage-punk:bg-zine"
      )}>
        {/* 通用辉光效果 */}
        <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[20%] translate-y-[20%] rounded-full bg-gradient-radial from-primary/10 via-transparent to-transparent opacity-50 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 right-auto top-auto h-[400px] w-[400px] -translate-x-[20%] -translate-y-[20%] rounded-full bg-gradient-radial from-secondary/5 via-transparent to-transparent opacity-50 blur-3xl"></div>
      </div>

      {/* 
        * ====================================================================
        * 新增：毛玻璃蒙版层 (z-index: -10)
        * - `absolute inset-0`: 绝对定位并铺满父容器。
        * - `-z-10`: 层级介于背景(-20)和内容(默认0)之间。
        * - `backdrop-blur-2xl`: 应用强烈的毛玻璃效果。你可以调整 (e.g., -sm, -md, -lg)。
        * - `bg-background/10`: 添加一层极淡的、与主题匹配的背景色，增强效果。
        * ====================================================================
      */}
      <div className="absolute inset-0 -z-10  bg-background/65"></div>

      {/* --- 页面区块 (z-index: 默认 0) --- */}
      <div className="z-0 w-full flex flex-col items-center">
        <HeroSection />
        <TechnologyShowcase />
        <FeatureCards />
        <WorkflowSection />
        <FinalCta />
      </div>
    </main>
  );
}