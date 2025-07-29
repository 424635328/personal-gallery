// src/components/layout/NavigationEvents.tsx
// 导航事件处理组件，在路由变化时触发自定义事件
'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export function NavigationEvents() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    window.dispatchEvent(new Event('navigationComplete'));

  }, [pathname, searchParams]);

  return null;
}