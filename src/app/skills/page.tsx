// src/app/skills/page.tsx

'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Code, Database, Server, Cloud, PenTool, BrainCircuit, TestTube2, GitBranch,
  Palette, Component, X, CheckCircle2, Star, LucideIcon, ShoppingCart,
  Users, Megaphone, Milestone, Lightbulb, ChevronDown
} from 'lucide-react';
import { skillsData, type Skill } from '@/data/skills-data';
import { cn } from '@/lib/utils';

// --- 可复用的可折叠区域组件 ---
const CollapsibleSection = ({
  title,
  icon: Icon,
  children,
  defaultOpen = false
}: {
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center font-semibold text-white mb-3"
      >
        <div className="flex items-center gap-2">
          <Icon size={18} className="text-primary" />
          {title}
        </div>
        <ChevronDown className={cn("w-5 h-5 transition-transform duration-300", isOpen && "rotate-180")} />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: 'auto', marginTop: '0.5rem' },
              collapsed: { opacity: 0, height: 0, marginTop: '0rem' },
            }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// 动态图标映射表
const iconMap: { [key: string]: LucideIcon } = { Code, Database, Server, Cloud, PenTool, BrainCircuit, TestTube2, GitBranch, Palette, Component, ShoppingCart, Users, Megaphone, Milestone, Lightbulb };

// 动画容器 variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.2,
    },
  },
};

// 单个项目的动画 variants
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function SkillsPage() {
  const [activeCategory, setActiveCategory] = useState<string>(skillsData[0].name);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(skillsData[0].skills[0]);
  const [progress, setProgress] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedSkill) {
      const timer = setTimeout(() => setProgress(selectedSkill.level), 100);
      // 当技能切换时，重置面板滚动条到顶部
      if (panelRef.current) {
        panelRef.current.scrollTop = 0;
      }
      return () => clearTimeout(timer);
    }
  }, [selectedSkill]);

  const activeSkills = useMemo(() => skillsData.find((cat) => cat.name === activeCategory)?.skills || [], [activeCategory]);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-background/10 text-white">
      {/* 背景效果 */}
      <div className="absolute top-0 left-0 -z-20 h-full w-full bg-background/10">
        <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[20%] translate-y-[20%] rounded-full bg-gradient-radial from-primary/15 via-transparent to-transparent opacity-50 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 right-auto top-auto h-[400px] w-[400px] -translate-x-[20%] -translate-y-[20%] rounded-full bg-gradient-radial from-purple-500/10 via-transparent to-transparent opacity-50 blur-3xl"></div>
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-6xl h-48 -z-10 bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-indigo-500/50 opacity-10 blur-3xl animate-[aurora_12s_ease-in-out_infinite_alternate]" />

      <div className="relative z-10 p-4 sm:p-8 flex flex-col lg:flex-row gap-8">
        <motion.aside initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5, ease: 'easeInOut' }} className="lg:w-1/4 xl:w-1/5 lg:sticky lg:top-8 lg:self-start">
          <div className="p-6 bg-black/30 backdrop-blur-lg rounded-2xl border border-white/10 shadow-lg">
            <h1 className="text-3xl font-bold mb-6 text-white">能力图谱</h1>
            <nav className="space-y-2">
              {skillsData.map((category) => {
                const CategoryIcon = iconMap[category.iconName];
                return (<button key={category.name} onClick={() => { setActiveCategory(category.name); setSelectedSkill(skillsData.find(c => c.name === category.name)?.skills[0] || null); }} className={cn('w-full flex items-center gap-4 p-3 rounded-lg text-left transition-all duration-300', activeCategory === category.name ? 'bg-primary text-primary-foreground shadow-lg' : 'hover:bg-white/10' )}>
                    {CategoryIcon && <CategoryIcon className="h-6 w-6" />}
                    <span className="font-semibold">{category.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </motion.aside>

        <main className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div key={activeCategory} initial="hidden" animate="visible" exit={{ opacity: 0 }} variants={containerVariants} className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
                {activeSkills.map((skill) => {
                  const SkillIcon = iconMap[skill.iconName];
                  return (<motion.div key={skill.name} variants={itemVariants} whileHover={{ y: -5, transition: { type: 'spring', stiffness: 300, damping: 20 } }} onClick={() => setSelectedSkill(skill)} className={cn('p-4 rounded-xl cursor-pointer transition-all duration-300 border backdrop-blur-md shadow-md', selectedSkill?.name === skill.name ? 'bg-primary/20 border-primary shadow-primary/20' : 'bg-white/5 border-white/10 hover:border-primary/50 hover:bg-white/10')}>
                      {SkillIcon && <SkillIcon className="h-8 w-8 mb-2 text-primary" />}
                      <h3 className="font-semibold text-sm sm:text-base text-white">{skill.name}</h3>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="md:col-span-1">
            <AnimatePresence>
              {selectedSkill && (
                <motion.div
                  key={selectedSkill.name}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                  className="sticky top-8 rounded-2xl border border-white/10 bg-black/40 shadow-2xl backdrop-blur-xl"
                >
                  <div ref={panelRef} className="p-6 h-full max-h-[calc(100vh-4rem)] overflow-y-auto custom-scrollbar">
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center gap-4"><div className="flex-shrink-0">{iconMap[selectedSkill.iconName] && React.createElement(iconMap[selectedSkill.iconName], { className: "h-10 w-10 text-primary" })}</div><h2 className="text-2xl font-bold text-white">{selectedSkill.name}</h2></div>
                      <button onClick={() => setSelectedSkill(null)} className="text-gray-400 hover:text-white transition-colors flex-shrink-0" title="关闭详情" aria-label="关闭详情"><X size={24} /></button>
                    </div>
                    
                    <div className="space-y-6 text-sm">
                      <div>
                        <div className="flex justify-between items-center mb-1"><span className="font-medium text-primary">{selectedSkill.levelText}</span><span className="text-gray-400">{selectedSkill.level}%</span></div>
                        <Progress value={progress} className="w-full h-2 bg-white/10 [&>div]:bg-primary" />
                      </div>
                      
                      <p className="text-gray-300 leading-relaxed">{selectedSkill.description}</p>
                      <blockquote className="border-l-4 border-primary pl-4 italic text-gray-400">{selectedSkill.philosophy}</blockquote>
                      
                      <CollapsibleSection title="核心优势" icon={CheckCircle2} defaultOpen={true}>
                        <div className="space-y-2">{selectedSkill.strengths.map(strength => (<div key={strength.title} className="p-3 bg-white/5 rounded-md border border-white/10"><p className="font-semibold text-white">{strength.title}</p><p className="text-gray-400 text-xs">{strength.description}</p></div>))}</div>
                      </CollapsibleSection>
                      
                      {selectedSkill.bestPairedWith && selectedSkill.bestPairedWith.length > 0 && (
                        <CollapsibleSection title="最佳搭档" icon={Component}>
                           <div className="flex flex-wrap gap-2">{selectedSkill.bestPairedWith.map(item => <Badge key={item} variant="outline">{item}</Badge>)}</div>
                        </CollapsibleSection>
                      )}

                      <CollapsibleSection title="学习笔记" icon={PenTool}>
                        <p className="text-gray-400 bg-black/20 p-3 rounded-md border border-white/10">{selectedSkill.learningNote}</p>
                      </CollapsibleSection>
                      
                      {selectedSkill.funFact && (
                        <CollapsibleSection title="你知道吗？" icon={Lightbulb}>
                          <p className="text-gray-300">{selectedSkill.funFact}</p>
                        </CollapsibleSection>
                      )}

                      {selectedSkill.projects && selectedSkill.projects.length > 0 && (
                        <CollapsibleSection title="相关项目" icon={Star}>
                          <div className="flex flex-wrap gap-2">{selectedSkill.projects.map(proj => <Badge key={proj} variant="secondary">{proj}</Badge>)}</div>
                        </CollapsibleSection>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            {!selectedSkill && (<div className="hidden md:flex items-center justify-center h-full text-center text-gray-500 p-6 bg-black/20 backdrop-blur-lg rounded-2xl border border-white/10"><p>点击技能卡片<br/>查看详细信息</p></div>)}
          </div>
        </main>
      </div>
    </div>
  );
}