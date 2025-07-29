// src/components/layout/ThemeProvider.tsx

'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { ThemeProviderProps } from 'next-themes';

/**
 * ThemeProvider 组件
 * 
 * 这个组件封装了 `next-themes` 库的 ThemeProvider，为其提供了一个统一的入口。
 * 它负责管理应用的主题状态（如暗黑模式、浅色模式或其他自定义主题），
 * 并通过上下文（Context）将其提供给应用中的所有子组件。
 * 
 * @param {ThemeProviderProps} props - 接收所有 `next-themes` 的 ThemeProvider 所支持的 props。
 * @returns {React.ReactNode} - 返回包裹了子组件的 NextThemesProvider。
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}