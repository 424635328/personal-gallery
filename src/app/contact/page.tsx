// src/app/contact/page.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Github, Linkedin, Mail, MessageSquarePlus, ExternalLink } from 'lucide-react';

// 动画变体
const fadeIn = (delay: number) => ({
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay } },
});

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

// 定义一个可复用的联系方式卡片组件
const ContactCard = ({
  icon,
  title,
  content,
  href,
  isPrimary = false,
}: {
  icon: React.ReactNode;
  title: string;
  content: string;
  href: string;
  isPrimary?: boolean;
}) => (
  <motion.div variants={fadeIn(0.2)}>
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={
        isPrimary
          ? "block p-8 rounded-xl bg-primary/10 border-2 border-primary/50 shadow-lg hover:shadow-primary/20 transition-all transform hover:-translate-y-1"
          : "block p-6 rounded-xl bg-card/50 border border-border/50 hover:bg-primary/5 hover:border-primary/30 transition-all"
      }
    >
      <div className="flex items-start gap-4">
        <div className={isPrimary ? "text-primary" : "text-muted-foreground"}>{icon}</div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-foreground">{title}</h3>
          <p className="mt-1 text-muted-foreground">{content}</p>
          <div className="mt-4 flex items-center text-sm font-medium text-primary">
            {isPrimary ? '前往创建 Issue' : '立即联系'}
            <ExternalLink className="ml-1.5 h-4 w-4" />
          </div>
        </div>
      </div>
    </Link>
  </motion.div>
);

export default function ContactPage() {
  const issuesUrl = "https://github.com/424635328/personal-gallery/issues/new/choose";

  return (
    <div className="h-full w-full overflow-y-auto px-4 sm:px-8 md:px-16 lg:px-24 py-12">
      <motion.div
        className="max-w-4xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <motion.div variants={fadeIn(0)} className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tighter text-foreground">
            保持联系
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            我乐于接收任何形式的反馈、建议或合作机会。最高效的交流方式是通过 GitHub Issues，期待您的声音。
          </p>
        </motion.div>

        {/* 主要行动号召：GitHub Issues */}
        <ContactCard
          isPrimary
          icon={<MessageSquarePlus className="h-8 w-8" />}
          title="建议、Bug反馈或任何想法？"
          content="欢迎在本项目的 GitHub Issues 页面提出。无论是功能建议、发现的Bug，还是单纯想讨论技术，这里都是最佳的交流平台。"
          href={issuesUrl}
        />
        
        <motion.div variants={fadeIn(0.4)} className="my-12 flex items-center justify-center gap-4">
            <div className="h-px flex-1 bg-border"></div>
            <span className="text-muted-foreground text-sm">或者，通过其他方式联系我</span>
            <div className="h-px flex-1 bg-border"></div>
        </motion.div>

        {/* 其他联系方式 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ContactCard
                icon={<Mail className="h-6 w-6"/>}
                title="电子邮件"
                content="对于私人或紧急事宜，您可以通过邮件联系我。"
                href="mailto:424635328@qq.com"
            />
            <ContactCard
                icon={<Linkedin className="h-6 w-6"/>}
                title="LinkedIn"
                content="关注我的职业动态，或通过平台发送商务合作邀请。"
                href="https://www.linkedin.com/in/tony-zhang-dev"
            />
            {/* 可以保留 GitHub 主页链接，作为个人品牌的展示 */}
            <ContactCard
                icon={<Github className="h-6 w-6"/>}
                title="GitHub 主页"
                content="探索我的其他开源项目和代码贡献。"
                href="https://github.com/424635328"
            />
        </div>
      </motion.div>
    </div>
  );
}