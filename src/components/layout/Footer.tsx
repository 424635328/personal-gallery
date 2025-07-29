'use client';

import React from 'react';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

// 定义你的社交链接
const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/424635328/personal-gallery', icon: <Github /> },
  { name: 'LinkedIn', href: '#', icon: <Linkedin /> },
  { name: 'Twitter', href: '#', icon: <Twitter /> },
  { name: 'Email', href: 'mailto:your-email@example.com', icon: <Mail /> },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, name: string) => {
    if (href === '#') {
      e.preventDefault();
      toast.info(`敬请期待`, { description: `我的 ${name} 主页正在准备中！` });
    }
  };

  return (
    // 与 Header 保持一致的视觉风格
    <footer className={cn(
      "w-full border-t border-border/20 bg-background/80 backdrop-blur-lg",
      // 特定主题的微调
      "theme-brutalist-glitch:border-foreground theme-brutalist-glitch:bg-background",
      "theme-retro-pixel:border-foreground theme-retro-pixel:bg-background"
    )}>
      <div className="container mx-auto px-4 py-1">
        {/* --- 核心修改: 采用居中布局，更简洁现代 --- */}
        <div className="flex flex-col items-center space-y-2">
          
          {/* 社交链接 */}
          <div className="flex items-center space-x-6">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href, link.name)}
                target={link.href.startsWith('http') || link.href.startsWith('mailto:') ? '_blank' : undefined}
                rel="noopener noreferrer"
                aria-label={link.name}
                title={link.name}
                // --- 交互优化: 添加 hover 效果 ---
                className="text-muted-foreground transition-all hover:text-primary hover:scale-110"
              >
                {/* 统一图标大小 */}
                {React.cloneElement(link.icon, { className: 'h-6 w-6' })}
              </a>
            ))}
          </div>

          {/* 版权信息 */}
          <p className="text-sm text-muted-foreground">
            © {currentYear} Tony. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;