// src/app/projects/page.tsx

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { projects } from '@/data/projects';
import { ProjectCard } from '@/components/project-card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function ProjectsPage() {
  return (
    // 1. 让 main 成为一个占据所有可用空间的滚动容器
    // h-full: 继承父级 flex-1 的高度
    // overflow-y-scroll: 允许 main 自身滚动
    <main className="h-full w-full snap-y snap-mandatory overflow-y-scroll">
      
      {projects.map((project) => (
        <section
          key={project.id}
          // 2. 每个 section 的高度就是其父容器 (main) 的高度
          className="h-full w-full snap-start flex items-center justify-center px-4 sm:px-8"
        >
          <ProjectCard project={project} />
        </section>
      ))}

      {/* 结尾屏也使用同样的高度 */}
      <section className="h-full w-full snap-start flex flex-col items-center justify-center text-center px-4 bg-black/20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="max-w-2xl"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">感谢您的探索</h2>
          <p className="mt-4 text-lg text-muted-foreground">期待与您交流更多关于技术与设计的想法。</p>
          <div className="mt-8">
            <Button size="lg" asChild>
              <Link href="/contact">联系我</Link>
            </Button>
          </div>
        </motion.div>
      </section>

    </main>
  );
}