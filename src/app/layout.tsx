// src/app/layout.tsx

"use client";
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
// 2. 导入新的组件和 Provider
import { ScrollProvider, useScrollContainer } from '@/contexts/ScrollContext';
import { GoToTopBottom } from '@/components/layout/GoToTopBottom';


import './globals.css';

const fontSans = FontSans({ subsets: ['latin'], variable: '--font-sans' });
const fontSerif = Playfair_Display({ subsets: ['latin'], variable: '--font-serif' });
const fontDopamine = Nunito({ subsets: ['latin'], weight: ['400', '700', '900'], variable: '--font-dopamine' });
const fontZen = Noto_Serif_SC({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-zen' });
const fontSolarpunk = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-solarpunk' });
const fontBrutalist = VT323({ subsets: ['latin'], weight: ['400'], variable: '--font-brutalist' });
const fontNeon = Orbitron({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-neon' });


// 3. 创建一个内部 Client Component 来应用 ref 和 Context
const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { mainRef } = useScrollContainer(); // 在 Client Component 中使用 Hook

  return (
    <>
      <AuroraBackground neonSignText="Gallery" rainCount={40} />
      
      <div className="relative z-10 flex flex-col h-screen overflow-hidden">
        <Suspense fallback={null}>
          <NProgressProvider>
            <Header />
            
            <main 
              ref={mainRef} // 将 ref 应用到 main 元素
              className="flex-1 overflow-y-auto snap-y snap-mandatory scroll-pt-[var(--header-height)]"
            >
              {children}
            </main>
            
          </NProgressProvider>
          <NavigationEvents />
        </Suspense>
      </div>

      <Toaster richColors position="top-center" />
      
      {/* 5. 将按钮放在这里，它会读取 context 中的 ref */}
      <GoToTopBottom />
    </>
  );
};


/* 根布局组件 - 现在是一个 Client Component 以支持 Context Provider */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning className="h-full">
      <head>
        {/* 解决 metadata 问题: 手动添加 title 等 */}
        <title>Personal Gallery</title>
        <meta name="description" content="一个展示个人创意项目与技术实践的交互式作品集。" />
      </head>
      <body
        className={cn(
          'bg-background font-sans antialiased',
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
            {/* 4. 使用 ScrollProvider 包裹主布局 */}
            <ScrollProvider>
              <MainLayout>{children}</MainLayout>
            </ScrollProvider>
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}