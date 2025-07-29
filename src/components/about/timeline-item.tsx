// src/components/about/timeline-item.tsx

'use client';

import { motion } from 'framer-motion';

interface TimelineItemProps {
  date: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode; 
  isLast?: boolean;
}

const TimelineItem = ({ date, title, subtitle, description, icon, isLast = false }: TimelineItemProps) => {
  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      className="relative pl-12" // 稍微调整左内边距以适应图标
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      variants={itemVariants}
    >
      {/* 垂直线 */}
      {!isLast && <div className="absolute left-[18px] top-10 -bottom-8 w-0.5 bg-border -translate-x-1/2"></div>}
      
      {/* 图标圆点 */}
      <div className="absolute left-0 top-1.5 flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary border border-primary/20">
        {icon}
      </div>
      
      {/* 内容 */}
      <div className="flex flex-col sm:flex-row sm:items-baseline">
        <time className="sm:w-32 text-sm font-medium text-muted-foreground shrink-0">{date}</time>
        <div className="sm:ml-4">
          <h3 className="text-xl font-semibold text-foreground">{title}</h3>
          <h4 className="mt-1 text-md font-medium text-primary">{subtitle}</h4>
        </div>
      </div>
      <p className="mt-2 text-muted-foreground">{description}</p>
    </motion.div>
  );
};

export default TimelineItem;