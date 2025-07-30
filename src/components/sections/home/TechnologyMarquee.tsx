// src/components/sections/home/TechnologyMarquee.tsx

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { SiNextdotjs, SiReact, SiTypescript, SiNodedotjs, SiPrisma, SiTailwindcss, SiFramer, SiFigma, SiVercel } from 'react-icons/si';

const technologies = [
  { name: "React", icon: <SiReact size={32} /> },
  { name: "Next.js", icon: <SiNextdotjs size={32} /> },
  { name: "TypeScript", icon: <SiTypescript size={32} /> },
  { name: "Tailwind CSS", icon: <SiTailwindcss size={32} /> },
  { name: "Framer Motion", icon: <SiFramer size={32} /> },
  { name: "Node.js", icon: <SiNodedotjs size={32} /> },
  { name: "Prisma", icon: <SiPrisma size={32} /> },
  { name: "Figma", icon: <SiFigma size={32} /> },
  { name: "Vercel", icon: <SiVercel size={32} /> },
];

export const TechnologyMarquee = () => {
  const extendedTech = [...technologies, ...technologies];

  return (
    <section 
      className={cn(
        "w-full flex flex-col items-center justify-center overflow-hidden",
        "snap-start", // 添加吸附点
        "min-h-[calc(90vh-var(--header-height))]", // 添加最小高度
        // 1. 调整垂直内边距以匹配 HeroSection 标准
        "pt-10 pb-20 px-4" // 原来是 py-24
        // 2. 移除 min-h，因为它不是一个需要占满全屏的吸附点
      )}
    >
      <motion.div initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }}>
        <h2 className="text-3xl font-bold tracking-tight text-center sm:text-4xl">我信赖的工具与技术</h2>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground text-center">高效、可靠的工具是打造卓越产品的基石。</p>
      </motion.div>

      <div className="relative w-full max-w-6xl mt-16 [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
        <div className="flex flex-col gap-8">
          <MarqueeTrack items={extendedTech} />
          <MarqueeTrack items={extendedTech} direction="reverse" />
        </div>
      </div>
    </section>
  );
};


interface MarqueeTrackProps {
  items: typeof technologies;
  direction?: 'normal' | 'reverse';
}

const MarqueeTrack = ({ items, direction = 'normal' }: MarqueeTrackProps) => {
  const animationDirection = direction === 'reverse' ? 'animate-marquee-reverse' : 'animate-marquee';

  return (
    <div className="flex w-max gap-12 overflow-hidden">
      <div className={cn("flex shrink-0 gap-12", animationDirection)}>
        {items.map((tech, index) => (
          <TechCard key={`${tech.name}-${index}`} {...tech} />
        ))}
      </div>
      <div aria-hidden="true" className={cn("flex shrink-0 gap-12", animationDirection)}>
        {items.map((tech, index) => (
          <TechCard key={`${tech.name}-duplicate-${index}`} {...tech} />
        ))}
      </div>
    </div>
  );
};


interface TechCardProps {
  name: string;
  icon: React.ReactNode;
}

const TechCard = ({ name, icon }: TechCardProps) => {
  return (
    <div className={cn(
      "flex items-center justify-center gap-4 px-6 py-4 rounded-lg border",
      "bg-card/50 border-border/20 backdrop-blur-sm",
      "theme-midnight-grimoire:card-grimoire",
      "theme-warm-sunshine:bg-card/80 theme-warm-sunshine:shadow-sm",
      "theme-dopamine-pop:bg-card theme-dopamine-pop:border-2 theme-dopamine-pop:border-foreground/50",
      "theme-zen-ink:card-zen bg-transparent backdrop-blur-none border-border/30",
      "theme-solarpunk-utopia:bg-card/80 border-primary/10 shadow-md",
      "theme-rustic-artisan:bg-card/80 border-2 border-foreground/5",
      "theme-brutalist-glitch:bg-transparent border-2 border-foreground rounded-none",
      "theme-retro-pixel:card-retro",
      "theme-acid-wave:acid-border",
      "theme-collage-punk:card-punk paper-tear-border bg-card"
    )}>
      {icon}
      <span className="text-lg font-semibold text-muted-foreground">{name}</span>
    </div>
  );
};