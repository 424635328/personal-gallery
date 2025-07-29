'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Lightbulb, Code, Palette, Sparkles, Briefcase, GraduationCap, Award } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

// --- 动画变体 ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// --- 数据定义 (方便修改) ---
const skills = {
  '前端技术': ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Redux/Zustand'],
  'UI/UX 设计': ['Figma', '组件化设计', '用户研究', '原型制作'],
  '后端 & 数据库': ['Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'Prisma'],
  '工具 & 协作': ['Git', 'Docker', 'Vercel', 'Jira', 'Notion'],
};

const timeline = [
  {
    icon: <Briefcase />,
    date: '2022 - 至今',
    title: '高级前端工程师 @ 某科技公司',
    description: '负责核心产品的架构设计与开发，主导重构项目，并引入组件化测试流程，提升了30%的开发效率。'
  },
  {
    icon: <GraduationCap />,
    date: '2018 - 2022',
    title: '计算机科学学士 @ 某大学',
    description: '系统学习了计算机基础、算法与数据结构，并完成了多个课程设计项目。'
  },
  {
    icon: <Award />,
    date: '2021',
    title: '全国大学生编程竞赛一等奖',
    description: '在团队中担任核心算法实现角色，解决了关键的性能瓶颈问题。'
  },
];

// --- 主页面组件 ---
export default function AboutPage() {
  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="container mx-auto px-4 py-24 sm:py-32"
    >
      <div className="max-w-4xl mx-auto">
        
        {/* 1. 个人简介 (图文结合) */}
        <motion.section variants={itemVariants} className="grid md:grid-cols-3 gap-12 items-center">
          <div className="md:col-span-1">
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              transition={{ type: 'spring', stiffness: 300 }}
              className="relative aspect-square rounded-full overflow-hidden shadow-2xl shadow-primary/20"
            >
              <Image 
                src="/images/profile-photo.jpg" // <-- 替换为你自己的头像图片
                alt="[你的名字] 的头像"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
          <div className="md:col-span-2">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground">关于我</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              你好，我是 [你的名字]，一名对技术充满热情、对设计抱有执念的前端开发者和UI/UX设计师。
            </p>
            <p className="mt-4 text-muted-foreground">
              我坚信，最好的产品诞生于技术与艺术的完美交汇点。我享受将复杂的逻辑转化为简洁、直观且富有美感的用户界面的过程，并致力于通过代码为用户创造价值和愉悦。
            </p>
          </div>
        </motion.section>

        {/* 2. 工作理念 */}
        <motion.section variants={itemVariants} className="mt-20">
          <h2 className="text-3xl font-bold text-center text-foreground">我的工作理念</h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 text-center rounded-2xl bg-black/20">
              <Lightbulb className="mx-auto h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold">用户至上</h3>
              <p className="mt-2 text-sm text-muted-foreground">始终从用户角度出发，设计易于理解和使用的产品。</p>
            </div>
            <div className="p-6 text-center rounded-2xl bg-black/20">
              <Code className="mx-auto h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold">代码如诗</h3>
              <p className="mt-2 text-sm text-muted-foreground">追求代码的健壮性、可读性和优雅性，编写可维护的程序。</p>
            </div>
            <div className="p-6 text-center rounded-2xl bg-black/20">
              <Palette className="mx-auto h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold">像素完美</h3>
              <p className="mt-2 text-sm text-muted-foreground">关注设计细节，确保最终实现与设计稿的高度一致。</p>
            </div>
          </div>
        </motion.section>

        {/* 3. 技能栈 */}
        <motion.section variants={itemVariants} className="mt-20">
          <h2 className="text-3xl font-bold text-center text-foreground">我的技能栈</h2>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {Object.entries(skills).map(([category, items]) => (
              <div key={category} className="p-6 rounded-2xl bg-black/20 border border-neutral-800">
                <h3 className="text-lg font-semibold text-primary mb-4">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {items.map(skill => (
                    <span key={skill} className="px-3 py-1 text-sm bg-neutral-800 text-neutral-300 rounded-full">{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* 4. 职业经历时间轴 */}
        <motion.section variants={itemVariants} className="mt-20">
          <h2 className="text-3xl font-bold text-center text-foreground">我的足迹</h2>
          <div className="mt-12 relative border-l-2 border-primary/20 ml-6">
            <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-0"></div>
            {timeline.map((item, index) => (
              <div key={index} className="mb-10 ml-12">
                <div className="absolute w-8 h-8 bg-neutral-800 rounded-full -left-4 border-4 border-background flex items-center justify-center text-primary">{item.icon}</div>
                <p className="text-sm text-muted-foreground">{item.date}</p>
                <h3 className="text-xl font-semibold mt-1 text-foreground">{item.title}</h3>
                <p className="mt-2 text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* 5. 行动号召 (CTA) */}
        <motion.section variants={itemVariants} className="mt-20 text-center">
          <h2 className="text-3xl font-bold text-foreground">让我们一起创造！</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
            我已经准备好迎接新的挑战。如果我的技能和热情正是您所寻找的，请不要犹豫，与我联系。
          </p>
          <Button asChild size="lg" className="mt-8">
            <Link href="/contact">联系我</Link>
          </Button>
        </motion.section>
        
      </div>
    </motion.div>
  );
}