// src/contexts/ScrollContext.tsx
"use client";

import React, { createContext, useContext, useRef, ReactNode } from 'react';

// 1. 定义 Context 将提供的数据类型
interface ScrollContextType {
  // 修改这里：类型应该是 React.RefObject<HTMLElement>
  // 虽然 useRef(null) 的初始值是 null, 但我们最终期望它指向一个 HTMLElement
  mainRef: React.RefObject<HTMLElement>;
}

const ScrollContext = createContext<ScrollContextType | undefined>(undefined);

// 3. 创建 Provider 组件
export const ScrollProvider = ({ children }: { children: ReactNode }) => {
  const mainRef = useRef<HTMLElement>(null);

  // 我们在这里断言 value 的类型是符合 ScrollContextType 的
  // 因为我们知道 mainRef 最终会被附加到一个 HTMLElement 上
  const value = {
    mainRef: mainRef as React.RefObject<HTMLElement>,
  };

  return (
    <ScrollContext.Provider value={value}>
      {children}
    </ScrollContext.Provider>
  );
};

export const useScrollContainer = (): ScrollContextType => {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error('useScrollContainer must be used within a ScrollProvider');
  }
  return context;
};