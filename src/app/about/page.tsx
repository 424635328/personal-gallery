// src/app/about/page.tsx

'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Twitter, Twitch, ArrowDown, Zap, Crosshair, BrainCircuit, Users, Trophy, Shield, MousePointer } from 'lucide-react';
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
              // 建议替换成你的照片
              src="/images/avatar.png"
              alt="Donk 的头像"
              width={144}
              height={144}
              className="rounded-full object-cover border-4 border-primary/20 shadow-lg mx-auto"
              priority
            />
          </motion.div>
          <motion.h1 variants={fadeIn('up', 0.4)} className="mt-6 text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tighter text-foreground">
            Danil "donk" Kryshkovets
          </motion.h1>
          <motion.p variants={fadeIn('up', 0.6)} className="mt-4 text-lg text-primary font-semibold max-w-2xl mx-auto">
            CS2职业选手 | Team Spirit步枪手 | IEM卡托维兹2024 MVP
          </motion.p>
          <motion.p variants={fadeIn('up', 0.7)} className="mt-2 text-md text-muted-foreground max-w-xl mx-auto">
            我为胜利而来。在服务器里，我的唯一目标就是用最激进的打法和最精准的枪法撕碎对手的防线。
          </motion.p>
          <motion.div variants={fadeIn('up', 0.8)} className="mt-8 flex items-center justify-center gap-4">
            <Button asChild>
              <a href="https://www.youtube.com/results?search_query=donk+highlights" target="_blank" rel="noopener noreferrer">观看我的集锦</a>
            </Button>
            <Button asChild variant="outline">
              <a href="https://www.hltv.org/player/21115/donk" target="_blank" rel="noopener noreferrer">
                <Trophy className="h-4 w-4 mr-2" /> HLTV档案
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
            <motion.h2 variants={fadeIn('right')} className="text-3xl font-bold text-foreground mb-4">我的电竞之路</motion.h2>
            <motion.p variants={fadeIn('right', 0.4)} className="text-muted-foreground mb-4 leading-relaxed">
              我的旅程始于对胜利的渴望和对CS最纯粹的热爱。从无数小时的练习和战术研究开始，我磨练出了自己的风格——无畏、果断、直指核心。
            </motion.p>
            <motion.p variants={fadeIn('right', 0.6)} className="text-muted-foreground leading-relaxed">
              加入Team Spirit是我职业生涯的关键一步，在这里，我和队友们一起将潜力转化为冠军奖杯。对我而言，比赛不仅是技术的对抗，更是意志的较量。
            </motion.p>
            <motion.div variants={fadeIn('right', 0.8)} className="mt-8 flex gap-4">
                 <Button asChild variant="outline">
                    <a href="https://www.twitch.tv/donkcs" target="_blank" rel="noopener noreferrer">
                        <Twitch className="h-4 w-4 mr-2" /> Twitch
                    </a>
                </Button>
                <Button asChild variant="outline">
                    <a href="https://twitter.com/donkcsgo" target="_blank" rel="noopener noreferrer">
                        <Twitter className="h-4 w-4 mr-2" /> 关注我的Twitter
                    </a>
                </Button>
            </motion.div>
          </motion.div>

          {/* 右侧：职业生涯时间线 */}
          <div className="space-y-12">
            <TimelineItem
              date="2023 - 至今"
              title="Team Spirit 主力队员"
              subtitle="顶级赛场"
              description="在IEM卡托维兹2024上取得突破性胜利，荣膺MVP。以顶级的个人能力和团队协作，帮助队伍成为世界顶尖强队之一。"
              icon={<Trophy className="h-5 w-5" />}
            />
            <TimelineItem
              date="2021 - 2023"
              title="Team Spirit Academy"
              subtitle="青训时期"
              description="在青训队中崭露头角，系统性地学习职业比赛的战术和纪律，为进入一线队打下坚实基础。"
              icon={<Shield className="h-5 w-5" />}
            />
            <TimelineItem
              date="~ 2021"
              title="崭露头角的天才少年"
              subtitle="线上比赛 & FPL"
              description="在各大线上平台和FPL中以惊人的枪法和游戏理解闻名，吸引了职业战队的注意。"
              icon={<MousePointer className="h-5 w-5" />}
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
            <h2 className="text-4xl font-bold text-foreground">我的制胜之道</h2>
            <p className="mt-4 text-muted-foreground">
                我相信，胜利源于毫不妥协的苦练、对胜利的执着以及超前的游戏理解。以下是我在赛场上的四大信条：
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
            icon={<Zap className="h-8 w-8 text-primary" />}
            title="激进的突破"
            description="作为队伍的尖刀，我的任务是撕开防线，为队友创造空间。无畏的W键是我的名片。"
          />
          <SkillCard
            icon={<Crosshair className="h-8 w-8 text-primary" />}
            title="精准的枪法"
            description="成千上万小时的练习，只为每一次点击都是致命的。爆头是我追求的唯一艺术。"
          />
          <SkillCard
            icon={<BrainCircuit className="h-8 w-8 text-primary" />}
            title="沉着的残局"
            description="即使在1vN的绝境下，也能保持冷静的头脑和清晰的思路，将不可能变为可能。"
          />
          <SkillCard
            icon={<Users className="h-8 w-8 text-primary" />}
            title="团队协作"
            description="CS是五个人的游戏。我的个人能力服务于团队的最终胜利，完美的同步和沟通是夺冠的基石。"
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
          <h2 className="text-4xl font-bold text-foreground">在赛场上见！</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            感谢所有支持我的粉丝，你们的欢呼是我前进的动力。关注我的频道，和我一起见证我们捧起下一座奖杯。
          </p>
          <div className="mt-8">
            <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-primary/40 transition-shadow">
              <a href="https://www.twitch.tv/donkcs" target="_blank" rel="noopener noreferrer">关注我的Twitch频道</a>
            </Button>
          </div>
        </motion.div>
      </section>
    </main>
  );
}