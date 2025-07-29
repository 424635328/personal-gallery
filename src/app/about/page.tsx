// src/app/about/page.tsx

'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowDown, Code, Palette, Server, Cpu, Building, School } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import TimelineItem from '@/components/about/timeline-item';

const fadeIn = (direction: 'up' | 'down' | 'left' | 'right' = 'up', delay: number = 0.2) => ({
    hidden: {
        opacity: 0,
        y: direction === 'up' ? 20 : direction === 'down' ? -20 : 0,
        x: direction === 'left' ? 20 : direction === 'right' ? -20 : 0,
    },
    visible: {
        opacity: 1,
        y: 0,
        x: 0,
        transition: {
            duration: 0.6,
            delay,
            ease: 'easeOut',
        },
    },
});

const staggerContainer = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.2,
        },
    },
};

const SkillCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
    <motion.div
        className="bg-card/50 p-6 rounded-xl border border-border/50 flex flex-col items-center text-center shadow-sm hover:shadow-primary/10 hover:border-primary/30 transition-all transform hover:-translate-y-1"
        variants={fadeIn('up')}
    >
        <div className="p-3 bg-primary/10 rounded-full mb-4">{icon}</div>
        <h3 className="font-bold text-lg text-foreground">{title}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
    </motion.div>
);


export default function AboutPage() {
  return (
    <main className="h-full w-full snap-y snap-mandatory overflow-y-scroll">
      
      {/* Section 1: Hero - 首屏 */}
      <section className="h-full w-full snap-start flex flex-col items-center justify-center text-center p-4 relative">
        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-3xl">
          <motion.div variants={fadeIn('down')}>
            <Image
              src="/images/avatar.png"
              alt="Tony 的头像"
              width={144}
              height={144}
              className="rounded-full object-cover border-4 border-primary/20 shadow-lg mx-auto"
              priority
            />
          </motion.div>
          <motion.h1 variants={fadeIn('up', 0.4)} className="mt-6 text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tighter text-foreground">
            你好，我是 Tony
          </motion.h1>
          <motion.p variants={fadeIn('up', 0.6)} className="mt-4 text-lg text-primary font-semibold max-w-2xl mx-auto">
            全栈工程师 | 数字工匠 | 终身学习者
          </motion.p>
          <motion.p variants={fadeIn('up', 0.7)} className="mt-2 text-md text-muted-foreground max-w-xl mx-auto">
            我热衷于构建从后端到前端、从逻辑到像素都无可挑剔的解决方案。
          </motion.p>
          <motion.div variants={fadeIn('up', 0.8)} className="mt-8 flex items-center justify-center gap-4">
            <Button asChild>
              <Link href="/projects">查看我的作品</Link>
            </Button>
            <Button asChild variant="outline">
              <a href="https://github.com/424635328" target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4 mr-2" /> GitHub
              </a>
            </Button>
          </motion.div>
        </motion.div>
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
            <ArrowDown className="h-6 w-6 text-muted-foreground animate-bounce" />
        </motion.div>
      </section>

      {/* Section 2: 关于我 & 职业生涯 */}
      <section className="h-full w-full snap-start flex items-center justify-center p-4 sm:p-8 md:p-12">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* 左侧：文字描述 */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <motion.h2 variants={fadeIn('right')} className="text-3xl font-bold text-foreground mb-4">我的开发者之旅</motion.h2>
            <motion.p variants={fadeIn('right', 0.4)} className="text-muted-foreground mb-4 leading-relaxed">
              我的旅程始于对 C++ 和底层系统性能的痴迷，这为我打下了坚实的工程基础。然而，我很快意识到，卓越的技术最终需要通过优雅的用户界面和流畅的交互来传递价值。这种认知驱动我跨越技术栈，从后端架构一路探索到前端设计，成为一名真正的“全栈”开发者。
            </motion.p>
            <motion.p variants={fadeIn('right', 0.6)} className="text-muted-foreground leading-relaxed">
              我享受解决复杂问题的过程——无论是优化一个数据库查询，还是为一个按钮设计完美的悬停动画。对我而言，代码不仅是指令的集合，更是创造和表达的媒介。
            </motion.p>
            <motion.div variants={fadeIn('right', 0.8)} className="mt-8 flex gap-4">
                 <Button asChild variant="outline">
                    <a href="https://www.linkedin.com/in/tony-zhang-dev" target="_blank" rel="noopener noreferrer">
                        <Linkedin className="h-4 w-4 mr-2" /> LinkedIn
                    </a>
                </Button>
                <Button asChild variant="outline">
                    <a href="mailto:424635328@qq.com">
                        <Mail className="h-4 w-4 mr-2" /> 给我写信
                    </a>
                </Button>
            </motion.div>
          </motion.div>

          {/* 右侧：职业生涯时间线 */}
          <div className="space-y-12">
            <TimelineItem
              date="2023 - 至今"
              title="独立全栈开发"
              subtitle="个人项目 & 开源贡献"
              description="主导多个全栈SaaS项目的设计与开发，如 OfferScore™。深入研究现代Web技术，并积极为开源社区贡献代码和解决方案。"
              icon={<Building className="h-5 w-5" />}
            />
            <TimelineItem
              date="2021 - 2023"
              title="软件开发工程师"
              subtitle="*****有限公司"
              description="作为核心团队成员，参与企业级数据中台的后端开发。负责设计和实现多个核心微服务，并通过性能调优将关键API响应时间降低了30%。"
              icon={<Building className="h-5 w-5" />}
            />
            <TimelineItem
              date="2020 - 2021"
              title="华中科技大学"
              subtitle="计算机科学与技术"
              description="以优异成绩完成学业，系统掌握了计算机核心理论。期间开发了基于FFmpeg的Android播放器，项目获得课程设计最高分。"
              icon={<School className="h-5 w-5" />}
              isLast={true}
            />
          </div>
        </div>
      </section>

      {/* Section 3: 核心能力 */}
      <section className="h-full w-full snap-start flex flex-col items-center justify-center p-4 sm:p-8 md:p-12">
        <motion.div
            className="text-center max-w-3xl mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn('down')}
        >
            <h2 className="text-4xl font-bold text-foreground">技术与理念的融合</h2>
            <p className="mt-4 text-muted-foreground">
                我相信，卓越的产品是精湛技术、用户同理心和前瞻性设计的结晶。以下是我构建产品的四大支柱：
            </p>
        </motion.div>
        <motion.div
            className="max-w-5xl w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
        >
          <SkillCard
            icon={<Code className="h-8 w-8 text-primary" />}
            title="前端工程化"
            description="构建可扩展、类型安全、性能卓越的Web应用。从组件设计到状态管理，追求代码的极致优雅与可维护性。"
          />
          <SkillCard
            icon={<Server className="h-8 w-8 text-primary" />}
            title="稳健的后端"
            description="设计高可用、安全的API和数据模型。擅长使用Serverless和云原生技术，实现快速迭代和弹性伸缩。"
          />
          <SkillCard
            icon={<Cpu className="h-8 w-8 text-primary" />}
            title="性能与底层"
            description="深入理解系统运行原理，从C++底层优化到多线程并发控制，确保应用程序发挥硬件的极致性能。"
          />
          <SkillCard
            icon={<Palette className="h-8 w-8 text-primary" />}
            title="用户为中心的设计"
            description="不仅仅是写代码，更是创造体验。痴迷于流畅的动画、直观的交互和富有情感的UI，让技术真正服务于人。"
          />
        </motion.div>
      </section>
      
      {/* Section 4: 行动号召 (CTA) */}
      <section className="h-full w-full snap-start flex items-center justify-center text-center p-4 bg-card/20">
        <motion.div
          className="max-w-2xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn('up')}
        >
          <h2 className="text-4xl font-bold text-foreground">有想法？让我们把它变成现实。</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            我一直在寻找能激发我创造力的挑战。如果您有一个激动人心的项目，或者正在寻找一位能为您的团队带来价值的工程师，我非常期待与您交流。
          </p>
          <div className="mt-8">
            <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-primary/40 transition-shadow">
              <Link href="/contact">开始对话</Link>
            </Button>
          </div>
        </motion.div>
      </section>
    </main>
  );
}