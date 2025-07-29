// src/components/ui/sonner.tsx
"use client"; // 确保这是客户端组件

import { Toaster as Sonner, toast } from "sonner"; // 直接从 'sonner' 库导入 toast 函数
import React, { useEffect, useRef } from "react";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  // 使用 useRef 来存储当前活跃的导航 toast 的 ID
  // useRef 比 useState 更适合这里，因为我们不需要在每次更新时触发重新渲染，
  // 只是需要一个在组件实例生命周期内持久化的可变值。
  const activeNavigationToastId = useRef<string | number | null>(null);

  useEffect(() => {
    // 处理导航开始的自定义事件
    const handleNavigationStart = (event: Event) => {
      // 检查 event 是否为 CustomEvent 并包含 detail
      if (event instanceof CustomEvent && event.detail && event.detail.toastId) {
        // 如果有正在进行的导航 toast，先清除它（以防快速点击）
        if (activeNavigationToastId.current) {
          toast.dismiss(activeNavigationToastId.current);
        }
        // 存储新的导航 toast ID
        activeNavigationToastId.current = event.detail.toastId;
      }
    };

    // 处理导航完成的事件
    const handleNavigationComplete = () => {
      // 如果存在一个由导航启动的 toast，则关闭它
      if (activeNavigationToastId.current) {
        toast.dismiss(activeNavigationToastId.current);
        activeNavigationToastId.current = null; // 清除 ID
      }
    };

    // 添加事件监听器
    // 我们定义一个特定的事件名称，例如 'offerScoreNavigationStart'
    // 确保这个事件名称是唯一的，以避免与其他自定义事件冲突
    window.addEventListener('offerScoreNavigationStart', handleNavigationStart as EventListener);
    window.addEventListener('navigationComplete', handleNavigationComplete);

    // 清理函数：组件卸载时移除事件监听器
    return () => {
      window.removeEventListener('offerScoreNavigationStart', handleNavigationStart as EventListener);
      window.removeEventListener('navigationComplete', handleNavigationComplete);
    };
  }, []); // 空依赖数组表示只在组件挂载和卸载时运行

  return (
    <Sonner
      theme="system"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
// 为了允许其他文件直接使用 toast，我们也可以选择在这里重新导出它，
// 但更好的做法是让它们直接从 'sonner' 导入。
export { toast }; // 如果你需要从 @/components/ui/sonner 导入 toast