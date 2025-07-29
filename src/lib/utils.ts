// src/lib/utils.ts

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/* 合并 classNames 的工具函数 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
