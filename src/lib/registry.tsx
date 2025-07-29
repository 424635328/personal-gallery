// src/lib/registry.tsx

'use client';

import React, { useState } from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';

/* Styled Components 服务端渲染注册器 */
export default function StyledComponentsRegistry({ children }: { children: React.ReactNode }) {
  // 延迟初始化样式表
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement();
    // @ts-ignore
    styledComponentsStyleSheet.instance.clearTag();
    return <>{styles}</>;
  });

  // 客户端直接返回子组件
  if (typeof window !== 'undefined') return <>{children}</>;

  // 服务端使用样式表管理器
  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
      {children}
    </StyleSheetManager>
  );
}