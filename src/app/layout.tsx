import type { Metadata } from 'next';
import { Inter as FontSans, Playfair_Display, Nunito, Noto_Serif_SC, Poppins, VT323, Orbitron } from 'next/font/google';
import { Suspense } from 'react';

// 本地依赖和组件
import { cn } from '@/lib/utils';
import StyledComponentsRegistry from '@/lib/registry';
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AuroraBackground from '@/components/layout/AuroraBackground';
import NProgressProvider from '@/components/layout/NProgressProvider';
import { Toaster } from '@/components/ui/sonner';
import { NavigationEvents } from '@/components/layout/NavigationEvents';

import './globals.css';

// --- 字体定义 (不变) ---
const fontSans = FontSans({ subsets: ['latin'], variable: '--font-sans' });
const fontSerif = Playfair_Display({ subsets: ['latin'], variable: '--font-serif' });
const fontDopamine = Nunito({ subsets: ['latin'], weight: ['400', '700', '900'], variable: '--font-dopamine' });
const fontZen = Noto_Serif_SC({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-zen' });
const fontSolarpunk = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-solarpunk' });
const fontBrutalist = VT323({ subsets: ['latin'], weight: ['400'], variable: '--font-brutalist' });
const fontNeon = Orbitron({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-neon' });

// --- SEO 元数据 (不变) ---
export const metadata: Metadata = {
  title: {
    default: 'Personal Gallery',
    template: '%s | Personal Gallery',
  },
  description: '一个展示个人创意项目与技术实践的交互式作品集。',
};

// --- 根布局 (RootLayout) ---
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // 关键点 1: <html> 标签设置为 h-full，让其高度与视口同步
    <html lang="zh-CN" suppressHydrationWarning className="h-full">
      {/* 关键点 2: <body> 标签也设置为 h-full，并作为主 Flex 容器 */}
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

            {/* 关键点 3: 这个 div 是我们的主布局容器，设置为 flex 布局，并占据整个 body 高度 */}
            <div className="relative z-10 flex flex-col h-full">
              <Suspense fallback={null}>
                <NProgressProvider>
                  {/* Header 的高度由其内容决定 */}
                  <Header />
                  
                  {/* --- 核心修改点 --- */}
                  {/* 
                    main 元素:
                    1. flex-1: 自动填充 Header 和 Footer 之间的所有剩余垂直空间。
                    2. overflow-hidden: 关键！这会隐藏任何超出其边界的内容，从而阻止滚动条的出现。
                       为了让内容在 main 内部可以滚动（如果需要的话），可以改为 overflow-y-auto。
                       但根据你的要求“不要自动生成页面滚动条”，我们使用 overflow-hidden。
                  */}
                  <main className="flex-1 overflow-hidden">
                    {children}
                  </main>
                  
                  {/* 
                    Footer: 不再使用 fixed 定位。
                    它会自然地被推到 Flex 容器的底部。
                    其高度也由内容决定。
                  */}
                  <Footer />
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