import * as React from "react"

import { cn } from "@/lib/utils"

// 定义组件的 props 类型
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

// 使用 React.forwardRef 包装组件
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        data-slot="input"
        className={cn(
          // 您提供的所有自定义样式都将保留
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          className
        )}
        // 将转发的 ref 附加到真正的 input 元素上
        ref={ref}
        {...props}
      />
    )
  }
)
// 为组件设置一个显示名称，便于调试
Input.displayName = "Input"

export { Input }