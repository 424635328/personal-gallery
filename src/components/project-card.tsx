// src/components/project-card.tsx

'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  ArrowUpRight,
  Calendar,
  CheckCircle,
  Clock,
  Archive,
  Star,
  Github,
  Globe,
  Briefcase,
} from 'lucide-react';
import type { Project } from '@/data/projects';
import { getFormattedDate } from '@/data/projects';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const StatusBadge = ({ status }: { status: Project['status'] }) => {
  const statusMap = {
    completed: { text: '已完成', icon: <CheckCircle className="h-3 w-3" />, color: 'text-green-400 bg-green-500/10' },
    'in-progress': { text: '进行中', icon: <Clock className="h-3 w-3" />, color: 'text-blue-400 bg-blue-500/10' },
    archived: { text: '已归档', icon: <Archive className="h-3 w-3" />, color: 'text-neutral-400 bg-neutral-500/10' },
  };
  const currentStatus = statusMap[status];

  return (
    <div className={cn("flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full shrink-0", currentStatus.color)}>
      {currentStatus.icon}
      <span>{currentStatus.text}</span>
    </div>
  );
};

// 按钮组件，用于源码和在线预览链接
const ActionButton = ({ href, icon, text }: { href: string; icon: React.ReactNode; text: string }) => (
  <Button asChild variant="secondary" size="sm">
    <Link href={href} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
      {icon}
      <span>{text}</span>
    </Link>
  </Button>
);

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 100, damping: 20 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], ['6deg', '-6deg']);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], ['-6deg', '6deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - left) / width - 0.5);
    mouseY.set((e.clientY - top) / height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const hasLink = project.liveUrl || project.sourceUrl;

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative w-full max-w-5xl aspect-[16/9] md:aspect-[2/1] cursor-pointer"
      // 使用 onClick 导航，让整个卡片都可点击 (如果只有一个链接)
      onClick={() => {
        if (project.liveUrl) window.open(project.liveUrl, '_blank');
        else if (project.sourceUrl) window.open(project.sourceUrl, '_blank');
      }}
    >
      <motion.div
        style={{ transformStyle: 'preserve-3d', rotateX, rotateY }}
        className="relative w-full h-full rounded-3xl bg-card border border-border/60 shadow-lg transition-shadow duration-300 group-hover:shadow-2xl group-hover:shadow-primary/20"
      >
        {/* 辉光效果 */}
        <div className="absolute inset-0 rounded-3xl border-2 border-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ transform: 'translateZ(30px)' }} />

        {/* 内容区 */}
        <div className="p-8 md:p-10 flex flex-col md:flex-row gap-8 w-full h-full" style={{ transform: 'translateZ(50px)' }}>
          {/* 左侧图片 */}
          <div className="md:w-[45%] h-1/2 md:h-full relative rounded-2xl overflow-hidden shadow-md border border-border/50 shrink-0">
            <Image
              src={project.imageUrl}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 90vw, 40vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent" />
          </div>

          {/* 右侧信息 */}
          <div className="md:w-[55%] h-1/2 md:h-full flex flex-col">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-card-foreground tracking-tight">
                  {project.title}
                </h3>
                <p className="text-sm text-primary font-medium mt-1">{project.subtitle}</p>
              </div>
              <StatusBadge status={project.status} />
            </div>

            <div className="mt-4 flex items-center flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
              {project.client && (
                <div className="flex items-center gap-1.5"><Briefcase className="h-3 w-3" /><span>{project.client}</span></div>
              )}
              <div className="flex items-center gap-1.5"><Calendar className="h-3 w-3" /><span>{getFormattedDate(project.date)}</span></div>
            </div>
            
            {/* 核心亮点 */}
            <div className="mt-5 space-y-2 text-sm text-muted-foreground">
              {project.highlights.map((highlight, index) => (
                <div key={index} className="flex items-start gap-2">
                  <Star className="h-4 w-4 text-primary/80 mt-0.5 shrink-0" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>

            {/* 底部区域: 技术标签和操作按钮 */}
            <div className="mt-auto pt-4 space-y-4">
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="px-2.5 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-3">
                {project.liveUrl && <ActionButton href={project.liveUrl} icon={<Globe className="h-4 w-4 mr-1.5" />} text="在线体验" />}
                {project.sourceUrl && <ActionButton href={project.sourceUrl} icon={<Github className="h-4 w-4 mr-1.5" />} text="查看源码" />}
              </div>
            </div>
          </div>
        </div>
        
        {hasLink && (
            <ArrowUpRight className="absolute top-6 right-6 h-6 w-6 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ transform: 'translateZ(80px)' }} />
        )}
      </motion.div>
    </div>
  );
}