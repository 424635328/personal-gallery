// src/components/layout/NProgressProvider.tsx

'use client'; // 这必须是客户端组件

import React, { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css'; // 导入 NProgress 的默认 CSS 样式

interface NProgressProviderProps {
  children: React.ReactNode;
}

// 可选：自定义 NProgress 的颜色和阴影
NProgress.configure({
  showSpinner: false, // 不显示右上角的圈圈
  trickle: true,      // 进度条会一点点前进
  trickleSpeed: 200,  // 每次前进的速度
  minimum: 0.08,      // 最小进度
  easing: 'ease',     // 动画缓动函数
  speed: 200,         // 动画速度
  template: '<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>' // 自定义模板
});


export default function NProgressProvider({ children }: NProgressProviderProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // 当路由开始变化时，启动进度条
    NProgress.start();

    // 当路由变化完成时（组件渲染完毕），完成进度条
    // 这里我们用 useEffect 的 cleanup 函数来模拟路由结束
    // 实际 Next.js 13/14 App Router 中，更复杂的路由事件监听可能需要额外库或hack
    // 但对于一般的页面加载，这种方式结合 NProgress 的内部逻辑通常足够
    const handleComplete = () => {
      NProgress.done();
    };

    // 假设每次 pathname 或 searchParams 变化都代表一次页面导航完成
    handleComplete(); 
    return () => {
      // 这里的 return 函数会在组件卸载或依赖项变化前执行
      NProgress.done(); // 确保在组件重新渲染或卸载时完成进度条
    };

  }, [pathname, searchParams]); // 监听 pathname 和 searchParams 的变化

  return <>{children}</>;
}