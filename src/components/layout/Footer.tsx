// src/components/layout/Footer.tsx

'use client';

import React from 'react';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

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
    <footer className={cn(
      "w-full border-t",
      "border-border/20 bg-background/80 backdrop-blur-lg",
      "theme-brutalist-glitch:bg-background theme-brutalist-glitch:border-foreground theme-brutalist-glitch:backdrop-blur-none",
      "theme-retro-pixel:bg-background theme-retro-pixel:border-foreground theme-retro-pixel:backdrop-blur-none",
      "theme-warm-sunshine:bg-background/95 theme-warm-sunshine:backdrop-blur-none",
      "theme-zen-ink:bg-background/95 theme-zen-ink:backdrop-blur-none"
    )}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col items-center space-y-3">
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
                className="text-muted-foreground transition-all hover:text-primary hover:scale-110"
              >
                {React.cloneElement(link.icon, { className: 'h-5 w-5' })}
              </a>
            ))}
          </div>

          <p className="text-sm text-muted-foreground">
            © {currentYear} Tony. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;