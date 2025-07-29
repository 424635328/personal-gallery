// src/components/layout/NProgressProvider.tsx
// 导航进度条组件，在页面切换时显示加载进度
'use client';

import React, { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

interface NProgressProviderProps {
  children: React.ReactNode;
}

NProgress.configure({
  showSpinner: false,
  trickle: true,
  trickleSpeed: 200,
  minimum: 0.08,
  easing: 'ease',
  speed: 200,
  template: '<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
});

export default function NProgressProvider({ children }: NProgressProviderProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    NProgress.start();

    const handleComplete = () => {
      NProgress.done();
    };

    handleComplete();
    return () => {
      NProgress.done();
    };

  }, [pathname, searchParams]);

  return <>{children}</>;
}