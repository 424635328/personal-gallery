// src/components/project-card.tsx

'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight, Calendar, User, CheckCircle, Clock, Archive } from 'lucide-react';
import type { Project } from '@/data/projects';
import { getFormattedDate } from '@/data/projects';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

/* 项目状态标签组件 */
const StatusBadge = ({ status }: { status: Project['status'] }) => {
  const statusMap = {
    completed: { text: '已完成', icon: <CheckCircle className="h-3 w-3" />, color: 'text-green-400 bg-green-500/10' },
    'in-progress': { text: '进行中', icon: <Clock className="h-3 w-3" />, color: 'text-blue-400 bg-blue-500/10' },
    archived: { text: '已归档', icon: <Archive className="h-3 w-3" />, color: 'text-neutral-400 bg-neutral-500/10' },
  };
  const currentStatus = statusMap[status];

  return (
    <div className={cn("flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full", currentStatus.color)}>
      {currentStatus.icon}
      <span>{currentStatus.text}</span>
    </div>
  );
};

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="group w-full max-w-4xl grid md:grid-cols-2 items-center gap-8 md:gap-16 bg-neutral-900/40 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-2xl shadow-black/20"
    >
      {/* 作品图片部分 */}
      <motion.div
        whileHover={{ scale: 1.03 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="relative aspect-[4/3] rounded-2xl overflow-hidden"
      >
        <Image
          src={project.imageUrl}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 90vw, 40vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
      </motion.div>

      {/* 作品信息部分 */}
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-300">
            {project.title}
          </h3>
          <StatusBadge status={project.status} />
        </div>

        <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
          {project.client && (
            <div className="flex items-center gap-1.5">
              <User className="h-4 w-4" /> <span>{project.client}</span>
            </div>
          )}
          <div className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4" /> <span>{getFormattedDate(project.date)}</span>
          </div>
        </div>

        <p className="mt-4 text-neutral-300 flex-grow">
          {project.description}
        </p>

        {/* 标签列表 */}
        <div className="mt-6 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <motion.span
              key={tag}
              whileHover={{ y: -2 }}
              className="px-3 py-1 text-sm bg-white/10 text-neutral-300 rounded-full cursor-pointer"
            >
              {tag}
            </motion.span>
          ))}
        </div>

        {/* 外部链接按钮 */}
        {project.link && (
          <Button asChild className="mt-8 w-fit group/button">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              访问项目
              <ArrowUpRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover/button:rotate-45" />
            </a>
          </Button>
        )}
      </div>
    </motion.div>
  );
}