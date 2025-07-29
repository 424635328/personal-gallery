// src/app/layout.tsx

import type { Metadata } from 'next';
import { Inter as FontSans, Playfair_Display, Nunito, Noto_Serif_SC, Poppins, VT323, Orbitron } from 'next/font/google';
import { Suspense } from 'react';

import { cn } from '@/lib/utils';
import StyledComponentsRegistry from '@/lib/registry';
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import Header from '@/components/layout/header/Header';
import AuroraBackground from '@/components/layout/AuroraBackground';
import NProgressProvider from '@/components/layout/NProgressProvider';
import { Toaster } from '@/components/ui/sonner';
import { NavigationEvents } from '@/components/layout/NavigationEvents';

import './globals.css';

/* 字体定义 */
const fontSans = FontSans({ subsets: ['latin'], variable: '--font-sans' });
const fontSerif = Playfair_Display({ subsets: ['latin'], variable: '--font-serif' });
const fontDopamine = Nunito({ subsets: ['latin'], weight: ['400', '700', '900'], variable: '--font-dopamine' });
const fontZen = Noto_Serif_SC({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-zen' });
const fontSolarpunk = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-solarpunk' });
const fontBrutalist = VT323({ subsets: ['latin'], weight: ['400'], variable: '--font-brutalist' });
const fontNeon = Orbitron({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-neon' });

/* SEO 元数据 */
export const metadata: Metadata = {
  title: {
    default: 'Personal Gallery',
    template: '%s | Personal Gallery',
  },
  description: '一个展示个人创意项目与技术实践的交互式作品集。',
};

/* 根布局组件 - 应用主框架 */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    /* 设置 html 高度为视口高度 */
    <html lang="zh-CN" suppressHydrationWarning className="h-full">
      {/* body 作为主 Flex 容器 */}
      <body
        className={cn(
          'h-full bg-background font-sans antialiased',
          fontSans.variable, fontSerif.variable, fontDopamine.variable,
          fontZen.variable, fontSolarpunk.variable, fontBrutalist.variable, fontNeon.variable
        )}
      >
        <StyledComponentsRegistry>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            themes={[
              'dark', 'theme-midnight-grimoire', 'theme-warm-sunshine', 'theme-dopamine-pop',
              'theme-zen-ink', 'theme-solarpunk-utopia', 'theme-rustic-artisan',
              'theme-brutalist-glitch', 'theme-retro-pixel', 'theme-acid-wave', 'theme-collage-punk'
            ]}
            enableSystem={false}
            storageKey="personal-gallery-theme"
          >
            <AuroraBackground neonSignText="Gallery" rainCount={40} />

            {/* 主布局容器 - Flex 垂直布局 */}
            <div className="relative z-10 flex flex-col h-full">
              <Suspense fallback={null}>
                <NProgressProvider>
                  <Header />
                  
                  {/* 主内容区域 - 自动填充剩余空间 */}
                  <main className="flex-1 overflow-hidden">
                    {children}
                  </main>
                  
                </NProgressProvider>
                <NavigationEvents />
              </Suspense>
            </div>
            
            <Toaster richColors position="top-center" />
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}