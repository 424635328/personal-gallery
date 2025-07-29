import { cn } from "@/lib/utils";
import React from "react";

interface AuroraTextProps extends React.HTMLAttributes<HTMLHeadingElement> {
  text: string;
}

/**
 * AuroraText 组件
 * 
 * 创建一个带有动态极光渐变背景的文本。
 * 效果通过多个重叠的、带有模糊和动画的渐变背景实现。
 */
export const AuroraText = ({ text, className, ...props }: AuroraTextProps) => {
  return (
    <h1 className={cn(
      "relative inline-block text-transparent bg-clip-text", // 基础样式：让背景穿透文字
      "text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl", // 默认字体大小
      className // 允许外部传入自定义样式
    )} {...props}>
      {/* 
        背景层 1: 主要的、缓慢移动的极光背景。
        使用了自定义的 'aurora' 动画，需要在 tailwind.config.ts 中定义。
      */}
      <span
        className="absolute inset-0 z-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-80 animate-[aurora_8s_ease-in-out_infinite] blur-xl"
        style={{ backgroundSize: '200% 200%' }}
      />
      {/* 
        背景层 2: 一个更快的、脉冲式的亮点，增加动态感。
      */}
      <span
        className="absolute inset-0 z-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-60 animate-pulse blur-2xl"
      />
      {/* 
        文本内容，z-10 层级确保它在背景之上。
      */}
      <span className="relative z-10">
        {text}
      </span>
    </h1>
  );
};