// src/components/sections/home/TechnologyShowcase.tsx (修复版)

// 增加了 useEffect 和 useState
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, animate, useTransform, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';
import { 
  SiNextdotjs, SiReact, SiTypescript, SiNodedotjs, SiPrisma, 
  SiTailwindcss, SiFramer, SiFigma, SiVercel, SiGit, SiDocker, SiPostgresql 
} from 'react-icons/si';

const technologies = [
    { name: "React", icon: SiReact, philosophy: "构建声明式、组件化的用户界面，是现代Web的基石。" },
    { name: "Next.js", icon: SiNextdotjs, philosophy: "全栈React框架，将开发体验与生产性能推向极致。" },
    { name: "TypeScript", icon: SiTypescript, philosophy: "为JavaScript注入类型安全，构建大型应用的信心之源。" },
    { name: "Tailwind CSS", icon: SiTailwindcss, philosophy: "原子化CSS，将设计约束直接融入开发流程，高效且一致。" },
    { name: "Framer Motion", icon: SiFramer, philosophy: "富有表现力的动画库，让Web充满生命力与愉悦感。" },
    { name: "Node.js", icon: SiNodedotjs, philosophy: "将JavaScript的能量从浏览器延伸到服务端，实现全栈统一。" },
    { name: "Prisma", icon: SiPrisma, philosophy: "下一代ORM，让数据库操作变得类型安全且直观易懂。" },
    { name: "Figma", icon: SiFigma, philosophy: "协作式界面设计工具，是连接设计与开发的无缝桥梁。" },
    { name: "Vercel", icon: SiVercel, philosophy: "为前端开发者打造的终极平台，提供无与伦比的部署体验。" },
    { name: "Git", icon: SiGit, philosophy: "分布式版本控制系统，是现代软件开发的协作核心。" },
    { name: "Docker", icon: SiDocker, philosophy: "容器化技术，确保从开发到生产的环境一致性与可移植性。" },
    { name: "PostgreSQL", icon: SiPostgresql, philosophy: "功能强大、可靠的开源对象关系数据库系统。" },
];

const containerSize = 500;
const iconSize = 60;
const interactionRadius = 100;

const getGridPositions = (count: number, radius: number) => {
    const positions = [];
    const innerCount = 5;
    const outerCount = count - innerCount;
    const innerRadius = radius * 0.55;
    const outerRadius = radius * 0.9;
    for (let i = 0; i < innerCount; i++) {
        const angle = (i / innerCount) * 2 * Math.PI;
        positions.push({ x: innerRadius * Math.cos(angle), y: innerRadius * Math.sin(angle) });
    }
    for (let i = 0; i < outerCount; i++) {
        const angle = (i / outerCount) * 2 * Math.PI + (Math.PI / outerCount);
        positions.push({ x: outerRadius * Math.cos(angle), y: outerRadius * Math.sin(angle) });
    }
    return positions;
};

const initialPositions = getGridPositions(technologies.length, containerSize / 2 - iconSize / 2);

export const TechnologyShowcase = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(containerSize / 2);
  const mouseY = useMotionValue(containerSize / 2);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // 1. 添加一个状态来追踪组件是否已在客户端挂载
  const [isMounted, setIsMounted] = useState(false);

  // 2. 使用 useEffect 在组件挂载后将状态设置为 true
  useEffect(() => {
    setIsMounted(true);
  }, []); // 空依赖数组确保此 effect 只运行一次

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    }
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
    animate(mouseX, containerSize / 2, { duration: 0.5, ease: "easeOut" });
    animate(mouseY, containerSize / 2, { duration: 0.5, ease: "easeOut" });
  };

  const activeTechnology = activeIndex !== null ? technologies[activeIndex] : null;

  return (
    <section 
      className="w-full flex flex-col snap-start overflow-hidden px-4 pt-16 pb-8"
      style={{ minHeight: 'calc(100vh - var(--header-height))' }}
    >
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full text-center"
      >
        <h1 className="text-7xl md:text-8xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70 mb-4">
          Gallery
        </h1>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">我的核心工具箱</h2>
        <p className="mt-2 max-w-2xl mx-auto text-muted-foreground">
          一个由我信赖和热爱的技术构成的动态宇宙，将鼠标悬停于图标上查看详情。
        </p>
      </motion.div>

      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative flex-grow w-full flex items-center justify-center mt-4"
        style={{ minHeight: '500px' }}
      >
        <div className="absolute inset-0 bg-grid-pattern opacity-10 [mask-image:radial-gradient(circle_at_center,black_30%,transparent_80%)]"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-secondary/10 opacity-50 rounded-full blur-2xl"></div>

        <div className="absolute w-1/2 h-1/2 flex items-center justify-center text-center pointer-events-none">
          <AnimatePresence mode="wait">
            {activeTechnology ? (
              <motion.div
                key={activeTechnology.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="flex flex-col items-center justify-center p-4"
              >
                <p className="text-xl font-bold text-foreground mb-2">{activeTechnology.name}</p>
                <p className="text-sm text-muted-foreground">{activeTechnology.philosophy}</p>
              </motion.div>
            ) : (
              <motion.div
                key="prompt"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 1 } }}
                exit={{ opacity: 0 }}
                className="text-muted-foreground"
              >
                <p>将鼠标悬停于技术图标上</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 3. 只有在组件挂载后才渲染这些图标 */}
        {isMounted && technologies.map((tech, i) => (
          <TechIcon 
            key={tech.name}
            mouseX={mouseX}
            mouseY={mouseY}
            initialPosition={initialPositions[i]}
            tech={tech}
            onHoverStart={() => setActiveIndex(i)}
            isActive={activeIndex === i}
            isSomeoneActive={activeIndex !== null}
          />
        ))}
      </div>
    </section>
  );
};


interface TechIconProps {
    mouseX: ReturnType<typeof useMotionValue<number>>;
    mouseY: ReturnType<typeof useMotionValue<number>>;
    initialPosition: { x: number; y: number };
    tech: (typeof technologies)[0];
    onHoverStart: () => void;
    isActive: boolean;
    isSomeoneActive: boolean;
  }
  
  const TechIcon = ({ mouseX, mouseY, initialPosition, tech, onHoverStart, isActive, isSomeoneActive }: TechIconProps) => {
      const displacement = useTransform<number[], { dx: number; dy: number }>(
          [mouseX, mouseY],
          ([latestMouseX, latestMouseY]) => {
          const iconCenterX = containerSize / 2 + initialPosition.x;
          const iconCenterY = containerSize / 2 + initialPosition.y;
          const dx = (typeof latestMouseX === 'number' ? latestMouseX : 0) - iconCenterX;
          const dy = (typeof latestMouseY === 'number' ? latestMouseY : 0) - iconCenterY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const force = Math.max(0, interactionRadius - distance);
          const angle = Math.atan2(dy, dx);
          return { dx: force * Math.cos(angle), dy: force * Math.sin(angle) };
          }
      );
  
      const springConfig = { stiffness: 350, damping: 25, mass: 0.7 };
      const transformedX = useTransform(displacement, (d) => initialPosition.x - d.dx);
      const transformedY = useTransform(displacement, (d) => initialPosition.y - d.dy);
      const x = useSpring(transformedX, springConfig);
      const y = useSpring(transformedY, springConfig);
  
      return (
          <motion.div
            animate={{ 
                scale: isActive ? 1.25 : 1,
                opacity: isSomeoneActive ? (isActive ? 1 : 0.4) : 1,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            style={{ 
                position: 'absolute', 
                x, 
                y, 
                left: `calc(50% - ${iconSize / 2}px)`,
                top: `calc(50% - ${iconSize / 2}px)`,
                width: iconSize,
                height: iconSize,
                zIndex: isActive ? 10 : 1,
            }}
            className="flex items-center justify-center cursor-pointer"
            onHoverStart={onHoverStart}
            >
            <tech.icon className={cn(
                "w-8 h-8 transition-colors duration-300",
                isActive ? "text-foreground" : "text-muted-foreground"
            )} />
          </motion.div>
      );
  };