// src/lib/AntdRegistry.tsx

'use client';

import React from 'react';
import { AntdRegistry } from '@ant-design/nextjs-registry';

/* Ant Design 组件注册器 */
const StyledComponentsRegistry = ({ children }: { children: React.ReactNode }) => {
  return <AntdRegistry>{children}</AntdRegistry>;
};

export default StyledComponentsRegistry;