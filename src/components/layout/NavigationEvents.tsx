// src/components/layout/NavigationEvents.tsx

'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export function NavigationEvents() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // 这里的逻辑是：当 pathname 或 searchParams 发生变化时，
    // useEffect 会在新的页面组件渲染完成后执行。
    // 这可以被视为一个可靠的“导航完成”信号。
    
    // 我们广播一个自定义的 DOM 事件
    window.dispatchEvent(new Event('navigationComplete'));

  }, [pathname, searchParams]); // 依赖项是 pathname 和 searchParams

  return null; // 这个组件不渲染任何东西
}