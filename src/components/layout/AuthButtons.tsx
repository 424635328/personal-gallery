// src/components/layout/AuthButtons.tsx

'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation'; // 1. 导入 useRouter
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LogOut, LayoutDashboard, UserCircle } from 'lucide-react';

export default function AuthButtons() {
  const { data: session, status } = useSession();
  const router = useRouter(); // 2. 初始化 router

  // 3. 创建一个通用的、带 toast 提示的导航函数
  const navigateWithToast = (href: string, message: string) => {
    const promise = new Promise((resolve) => setTimeout(resolve, 400)); // 模拟网络延迟，让提示更明显

    toast.promise(promise, {
      loading: message,
      success: () => {
        router.push(href);
        return '即将跳转...'; // 此消息一闪而过，主要依赖加载中的提示
      },
      error: '跳转失败，请刷新后重试。',
    });
  };

  // 处理退出登录的函数 (已优化，使用 router.push)
  const handleSignOut = () => {
    // 异步执行 signOut
    const promise = signOut({ redirect: false });

    toast.promise(promise, {
      loading: '正在为您退出登录...',
      success: () => {
        // 使用 router.push 进行客户端导航，体验更佳
        router.push('/');
        router.refresh(); // 强制刷新服务器组件状态
        return '您已成功退出，即将返回首页。';
      },
      error: '退出登录时发生错误，请稍后再试。',
    });
  };

  // 加载状态时的占位符
  if (status === 'loading') {
    return (
        <div className="flex items-center gap-4">
            <div className="w-[58px] h-9 bg-muted animate-pulse rounded-md" />
            <div className="w-[58px] h-9 bg-muted animate-pulse rounded-md" />
        </div>
    );
  }

  // --- 已登录状态 ---
  if (session?.user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-9 w-9 rounded-full">
            <Avatar className="h-9 w-9 border">
              <AvatarImage src={session.user.image || ''} alt={session.user.name || "User"} />
              <AvatarFallback>
                {session.user.email?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">我的账户</p>
              <p className="text-xs leading-none text-muted-foreground">
                {session.user.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          
          {/* 4. 使用 onSelect 触发带 toast 的导航 */}
          <DropdownMenuItem onSelect={() => navigateWithToast('/dashboard', '正在加载您的报告...')}>
            <LayoutDashboard className="mr-2 h-4 w-4" />
            <span>我的报告</span>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => navigateWithToast('/profile', '正在打开个人主页...')}> 
            <UserCircle className="mr-2 h-4 w-4" />
            <span>个人主页</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          
          <DropdownMenuItem onSelect={handleSignOut}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>退出登录</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  // --- 未登录状态 ---
  return (
    <div className="flex items-center gap-4">
      {/* 5. 使用 onClick 触发带 toast 的导航 */}
      <Button variant="ghost" size="sm" onClick={() => navigateWithToast('/login', '正在前往登录页面...')}>
        登录
      </Button>
      <Button size="sm" onClick={() => navigateWithToast('/register', '正在为您准备注册...')}>
        注册
      </Button>
    </div>
  );
}