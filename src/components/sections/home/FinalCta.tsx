// src/components/sections/home/FinalCta.tsx

import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Mail, Briefcase, Github } from 'lucide-react';

export const FinalCta = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 150, mass: 0.5 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothMouseY, [-200, 200], [-15, 15]);
  const rotateY = useTransform(smoothMouseX, [-200, 200], [15, -15]);
  const scale = useSpring(1, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - left - width / 2);
    mouseY.set(e.clientY - top - height / 2);
  };

  const handleMouseEnter = () => scale.set(1.02);
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    scale.set(1);
  };

  return (
    <section 
      className={cn(
        "w-full snap-start flex flex-col items-center justify-center",
        // 1. 统一最小高度
        "min-h-[calc(100vh-var(--header-height))]",
        // 2. 统一内边距
        "pt-10 pb-20 px-4"
      )}
    >
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-4xl"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ perspective: '1000px' }}
      >
        <motion.div
          style={{ rotateX, rotateY, scale }}
          className={cn(
            "relative w-full text-center flex flex-col items-center gap-8 rounded-2xl p-10 md:p-16 border overflow-hidden",
            "bg-card/50 border-border/20 backdrop-blur-sm",
            "theme-midnight-grimoire:card-grimoire",
            "theme-retro-pixel:card-retro",
            "theme-acid-wave:acid-border",
            "theme-collage-punk:paper-tear-border bg-card"
          )}
        >
          <motion.div
            className="absolute -z-10 w-64 h-64 rounded-full opacity-50 blur-3xl"
            style={{ 
              x: smoothMouseX, 
              y: smoothMouseY,
              background: 'hsl(var(--primary))'
            }}
          />

          <div className="relative z-10">
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">Let's Create Together</h2>
            <p className="mt-4 max-w-xl mx-auto text-muted-foreground">
              对我的作品感兴趣，或是有项目想合作？我很乐意听到你的声音。
            </p>
          </div>

          <div className="relative z-10 flex flex-wrap justify-center items-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="mailto:your-email@example.com"
                className={cn(
                  buttonVariants({ size: 'lg' }),
                  "theme-midnight-grimoire:button-grimoire",
                  "theme-retro-pixel:button-retro",
                  "theme-collage-punk:button-punk",
                  "theme-dopamine-pop:shadow-[3px_3px_0px_hsl(var(--foreground))] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5",
                  "theme-brutalist-glitch:rounded-none border-2 border-foreground",
                  "theme-acid-wave:rounded-sm acid-border",
                )}
              >
                <Mail className="mr-2 h-5 w-5" />
                邮件联系
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/projects"
                className={cn(
                  buttonVariants({ variant: "outline", size: 'lg' }),
                  "theme-midnight-grimoire:button-grimoire",
                  "theme-retro-pixel:button-retro",
                  "theme-collage-punk:button-punk",
                )}
              >
                <Briefcase className="mr-2 h-5 w-5" />
                查看我的作品
              </Link>
            </motion.div>

             <motion.a 
              href="https://github.com/your-username"
              target="_blank" 
              rel="noopener noreferrer" 
              whileHover={{ scale: 1.1 }} 
              whileTap={{ scale: 0.9 }}
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="GitHub Profile"
            >
              <Github size={24} />
            </motion.a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};