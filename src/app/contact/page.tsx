'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Twitter, Copy } from 'lucide-react';
import { toast } from 'sonner';

// --- 动画变体 ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

// --- 联系方式数据 ---
const contactMethods = [
  {
    icon: <Mail className="h-8 w-8 text-primary" />,
    title: '电子邮件',
    description: '进行项目咨询或深入讨论的最佳方式。',
    value: 'your-email@example.com', // <-- 替换为你的邮箱
    isCopyable: true,
  },
  {
    icon: <Github className="h-8 w-8" />,
    title: 'GitHub',
    description: '查看我的开源项目和代码贡献。',
    value: 'https://github.com/424635328/personal-gallery',
    isCopyable: false,
  },
  {
    icon: <Linkedin className="h-8 w-8" />,
    title: 'LinkedIn',
    description: '了解我的专业背景和职业网络。',
    value: '#', // <-- 替换为你的LinkedIn主页链接
    isCopyable: false,
  },
  {
    icon: <Twitter className="h-8 w-8" />,
    title: 'Twitter / X',
    description: '关注我的日常分享和技术见解。',
    value: '#', // <-- 替换为你的Twitter主页链接
    isCopyable: false,
  },
];

export default function ContactPage() {

  // 点击复制邮箱的函数
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('邮箱地址已复制到剪贴板！');
  };

  return (
    <div className="container mx-auto px-4 py-24 sm:py-32">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-4xl mx-auto"
      >
        {/* 1. 页面标题和介绍 */}
        <div className="text-center mb-16">
          <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl font-bold text-foreground">
            保持联系
          </motion.h1>
          <motion.p variants={itemVariants} className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            我总是乐于接受新的挑战和合作机会。无论您是有项目想法，还是只想聊聊技术与设计，都欢迎随时与我联系。
          </motion.p>
        </div>

        {/* 2. 联系方式网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {contactMethods.map((method, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5, transition: { type: 'spring', stiffness: 300 } }}
            >
              <div className="group h-full p-8 rounded-2xl bg-black/20 border border-neutral-800 transition-all duration-300 hover:border-primary/50 hover:bg-black/40">
                <div className="flex items-start justify-between">
                  {method.icon}
                  {method.isCopyable ? (
                    <button
                      onClick={() => handleCopy(method.value)}
                      className="p-2 rounded-full text-muted-foreground bg-neutral-800/50 transition-all hover:bg-primary/20 hover:text-primary"
                      aria-label="复制"
                      title="复制"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                  ) : (
                    <a href={method.value} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full text-muted-foreground transition-all">
                      {/* 占位符，使布局统一 */}
                    </a>
                  )}
                </div>
                <h3 className="mt-4 text-2xl font-semibold text-foreground">{method.title}</h3>
                <p className="mt-2 text-muted-foreground">{method.description}</p>
                
                {method.isCopyable ? (
                  <p className="mt-4 font-mono text-sm text-primary break-all cursor-pointer" onClick={() => handleCopy(method.value)}>
                    {method.value}
                  </p>
                ) : (
                  <a href={method.value} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-sm text-primary hover:underline">
                    访问链接
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}