// src/components/sections/home/FinalCta.tsx

import React, { useRef, useState } from 'react';
import { motion, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Mail, Briefcase, Github, ArrowRight, type LucideIcon } from 'lucide-react';

type OrbitalNodeProps = {
  index: number;
  total: number;
  mousePosition: { x: number; y: number; };
  containerSize: number;
  icon: LucideIcon;
  text: string;
  subtext: string;
  href: string;
  isExternal: boolean;
};

type CosmicBackgroundProps = {
  mousePosition: { x: number; y: number; };
};


const ctaItems = [
  {
    icon: Mail,
    text: "邮件联系",
    subtext: "开启对话",
    href: "mailto:your-email@example.com",
    isExternal: true,
  },
  {
    icon: Briefcase,
    text: "我的作品",
    subtext: "深入了解",
    href: "/projects",
    isExternal: false,
  },
  {
    icon: Github,
    text: "GitHub",
    subtext: "查看源码",
    href: "https://github.com/your-username",
    isExternal: true,
  },
];

const ORBIT_RADIUS = 250;
const ICON_SIZE = 64;
const REPULSION_RADIUS = 120;
const REPULSION_STRENGTH = 80;

export const FinalCta = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };
  
  const handleMouseLeave = () => {
    if (!containerRef.current) return;
    const { width, height } = containerRef.current.getBoundingClientRect();
    setMousePosition({ x: width / 2, y: height / 2 });
  }

  return (
    <section 
      className={cn(
        "w-full snap-start flex flex-col items-center justify-start relative",
        "pt-32 pb-16 px-4 overflow-hidden" // 调整了 padding 和 justify
      )}
      style={{ minHeight: 'calc(100vh - var(--header-height))' }} // 适应 Header 高度
    >
      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full h-[600px] flex items-center justify-center"
      >
        <CosmicBackground mousePosition={mousePosition} />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 text-center"
        >
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
            Let's Create Together
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-muted-foreground">
            一个伟大的想法值得一个卓越的实现。我很乐意听到你的声音。
          </p>
        </motion.div>

        {ctaItems.map((item, i) => (
          <OrbitalNode 
            key={item.text}
            index={i}
            total={ctaItems.length}
            mousePosition={mousePosition}
            containerSize={600}
            {...item}
          />
        ))}

      </div>
    </section>
  );
};

const OrbitalNode = ({
  index,
  total,
  mousePosition,
  containerSize,
  icon: Icon,
  text,
  subtext,
  href,
  isExternal,
}: OrbitalNodeProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const angle = (index / total) * 2 * Math.PI;
  
  const initialX = ORBIT_RADIUS * Math.cos(angle);
  const initialY = ORBIT_RADIUS * Math.sin(angle);
  
  const centerX = containerSize / 2;
  const centerY = containerSize / 2;

  const dx = mousePosition.x - (centerX + initialX);
  const dy = mousePosition.y - (centerY + initialY);
  const distance = Math.sqrt(dx * dx + dy * dy);

  const force = Math.max(0, REPULSION_RADIUS - distance);
  const repulsionAngle = Math.atan2(dy, dx);

  const finalX = initialX - force * Math.cos(repulsionAngle) * REPULSION_STRENGTH / 100;
  const finalY = initialY - force * Math.sin(repulsionAngle) * REPULSION_STRENGTH / 100;
  
  const x = useSpring(finalX, { stiffness: 300, damping: 20, mass: 0.5 });
  const y = useSpring(finalY, { stiffness: 300, damping: 20, mass: 0.5 });

  const Wrapper = isExternal ? 'a' : Link;

  return (
    <motion.div
      style={{
        position: 'absolute',
        x, y,
        left: `calc(50% - ${ICON_SIZE / 2}px)`,
        top: `calc(50% - ${ICON_SIZE / 2}px)`,
        width: ICON_SIZE,
        height: ICON_SIZE,
      }}
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.5 + index * 0.1, ease: "easeOut" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="z-20 group"
    >
      <Wrapper 
        href={href}
        {...(isExternal && { target: '_blank', rel: 'noopener noreferrer' })}
        className="w-full h-full"
      >
        <motion.div 
          animate={{ scale: isHovered ? 1.2 : 1 }}
          className={cn(
            "w-full h-full rounded-full border flex items-center justify-center cursor-pointer",
            "bg-background/50 border-border/30 backdrop-blur-md",
            "group-hover:border-primary transition-colors duration-300"
          )}
        >
          <Icon className="w-7 h-7 text-muted-foreground transition-colors duration-300 group-hover:text-primary" />
        </motion.div>
      </Wrapper>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="absolute top-full mt-4 w-48 left-1/2 -translate-x-1/2 p-3 rounded-lg text-center bg-card/80 border border-border/50 backdrop-blur-lg shadow-xl"
          >
            <p className="font-bold text-foreground">{text}</p>
            <p className="text-sm text-muted-foreground">{subtext}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const CosmicBackground = ({mousePosition}: CosmicBackgroundProps) => {
  const glowX = useSpring(mousePosition.x, { stiffness: 200, damping: 30 });
  const glowY = useSpring(mousePosition.y, { stiffness: 200, damping: 30 });

  return (
    <>
      <div className="absolute inset-0 bg-grid-pattern opacity-10 [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_70%)]" />
      <motion.div 
        className="absolute w-96 h-96 rounded-full bg-primary/20 blur-3xl"
        style={{
          x: useTransform(glowX, val => val - 192),
          y: useTransform(glowY, val => val - 192)
        }}
      />
       {[...Array(30)].map((_, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute rounded-full bg-primary/50"
          initial={{ 
            x: Math.random() * 600, 
            y: Math.random() * 600,
            scale: 0
          }}
          animate={{ 
            scale: [0, Math.random() * 1.5, 0],
            transition: {
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "linear"
            }
          }}
          style={{
            width: `${Math.random() * 2 + 1}px`,
            height: `${Math.random() * 2 + 1}px`,
          }}
        />
      ))}
    </>
  );
}