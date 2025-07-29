// src/app/skills/page.tsx

'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Code, Database, Server, Cloud, PenTool, BrainCircuit, TestTube2, GitBranch,
  Palette, Component, X, CheckCircle2, Star, LucideIcon, ShoppingCart,
  Users, Megaphone, Milestone, Lightbulb
} from 'lucide-react';
import { skillsData, type Skill } from '@/data/skills-data';
import { cn } from '@/lib/utils';

// 动态图标映射表
const iconMap: { [key: string]: LucideIcon } = {
  Code, Database, Server, Cloud, PenTool, BrainCircuit, TestTube2,
  GitBranch, Palette, Component, ShoppingCart, Users, Megaphone,
  Milestone, Lightbulb
};

// 动画 Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 100 } },
};

export default function SkillsPage() {
  const [activeCategory, setActiveCategory] = useState<string>(skillsData[0].name);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(skillsData[0].skills[0]);
  const [progress, setProgress] = useState(0);

  const activeSkills = useMemo(
    () => skillsData.find((cat) => cat.name === activeCategory)?.skills || [],
    [activeCategory]
  );
  
  useEffect(() => {
    if (selectedSkill) {
      const timer = setTimeout(() => setProgress(selectedSkill.level), 100);
      return () => clearTimeout(timer);
    }
  }, [selectedSkill]);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-background text-white">
      
      {/* 背景效果 */}
      <div className="absolute top-0 left-0 -z-20 h-full w-full bg-background/80">
        <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[20%] translate-y-[20%] rounded-full bg-gradient-radial from-primary/15 via-transparent to-transparent opacity-50 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 right-auto top-auto h-[400px] w-[400px] -translate-x-[20%] -translate-y-[20%] rounded-full bg-gradient-radial from-purple-500/10 via-transparent to-transparent opacity-50 blur-3xl"></div>
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-6xl h-48 -z-10 bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-indigo-500/50 opacity-10 blur-3xl animate-[aurora_12s_ease-in-out_infinite_alternate]" />

      {/* 内容层 */}
      <div className="relative z-10 p-4 sm:p-8 flex flex-col lg:flex-row gap-8">
      
        {/* 左侧边栏 */}
        <motion.aside
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="lg:w-1/4 xl:w-1/5 lg:sticky lg:top-8 lg:self-start"
        >
          <div className="p-6 bg-black/30 backdrop-blur-lg rounded-2xl border border-white/10 shadow-lg">
            <h1 className="text-3xl font-bold mb-6 text-white">能力图谱</h1>
            <nav className="space-y-2">
              {skillsData.map((category) => {
                const CategoryIcon = iconMap[category.iconName];
                return (
                  <button
                    key={category.name}
                    onClick={() => {
                      setActiveCategory(category.name);
                      setSelectedSkill(null);
                    }}
                    className={cn(
                        'w-full flex items-center gap-4 p-3 rounded-lg text-left transition-all duration-300',
                        activeCategory === category.name
                          ? 'bg-primary text-primary-foreground shadow-lg'
                          : 'hover:bg-white/10'
                    )}
                  >
                    {CategoryIcon && <CategoryIcon className="h-6 w-6" />}
                    <span className="font-semibold">{category.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </motion.aside>

        {/* 右侧内容区 */}
        <main className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 技能网格 */}
          <div className="md:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, transition: { duration: 0.3 } }}
                className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4"
              >
                {activeSkills.map((skill) => {
                  const SkillIcon = iconMap[skill.iconName];
                  return (
                    <motion.div
                      key={skill.name}
                      variants={itemVariants}
                      whileHover={{ y: -5, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
                      onClick={() => setSelectedSkill(skill)}
                      className={cn(
                        'p-4 rounded-xl cursor-pointer transition-all duration-300 border backdrop-blur-md shadow-md',
                        selectedSkill?.name === skill.name
                          ? 'bg-primary/20 border-primary shadow-primary/20'
                          : 'bg-white/5 border-white/10 hover:border-primary/50 hover:bg-white/10'
                      )}
                    >
                      {SkillIcon && <SkillIcon className="h-8 w-8 mb-2 text-primary" />}
                      <h3 className="font-semibold text-sm sm:text-base text-white">{skill.name}</h3>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* 详情面板 */}
          <div className="md:col-span-1">
            <AnimatePresence>
              {selectedSkill && (
                <motion.div
                  key={selectedSkill.name}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                  // --- ✨ 关键修改点在这里 ---
                  className={cn(
                    "sticky top-8 rounded-2xl border border-white/10 bg-black/40 p-6 shadow-2xl backdrop-blur-xl",
                    "overflow-y-auto custom-scrollbar", // 启用内部滚动
                    "max-h-[calc(100vh-4rem)]" // 设置最大高度，4rem = 2rem(top-8) + 2rem(底部间距)
                  )}
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-4">
                      {iconMap[selectedSkill.iconName] && React.createElement(iconMap[selectedSkill.iconName], { className: "h-10 w-10 text-primary flex-shrink-0" })}
                      <h2 className="text-2xl font-bold text-white">{selectedSkill.name}</h2>
                    </div>
                    <button onClick={() => setSelectedSkill(null)} className="text-gray-400 hover:text-white transition-colors flex-shrink-0" title="关闭详情" aria-label="关闭详情">
                      <X size={24} />
                    </button>
                  </div>
                  
                  <div className="space-y-6 text-sm">
                    {/* 等级和进度条 */}
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium text-primary">{selectedSkill.levelText}</span>
                        <span className="text-gray-400">{selectedSkill.level}%</span>
                      </div>
                      <Progress value={progress} className="w-full h-2 bg-white/10 [&>div]:bg-primary" />
                    </div>
                    
                    {/* 描述 */}
                    <p className="text-gray-300 leading-relaxed">{selectedSkill.description}</p>
                    
                    {/* 哲学 */}
                    <blockquote className="border-l-4 border-primary pl-4 italic text-gray-400">
                      {selectedSkill.philosophy}
                    </blockquote>
                    
                    {/* 核心优势 */}
                    <div>
                      <h4 className="font-semibold mb-3 text-white flex items-center gap-2"><CheckCircle2 size={18} className="text-green-400"/>核心优势</h4>
                      <div className="space-y-2">
                        {selectedSkill.strengths.map(strength => (
                          <div key={strength.title} className="p-3 bg-white/5 rounded-md border border-white/10">
                            <p className="font-semibold text-white">{strength.title}</p>
                            <p className="text-gray-400 text-xs">{strength.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* 最佳搭档 */}
                    {selectedSkill.bestPairedWith && selectedSkill.bestPairedWith.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-3 text-white">最佳搭档</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedSkill.bestPairedWith.map(item => <Badge key={item} variant="outline">{item}</Badge>)}
                        </div>
                      </div>
                    )}

                    {/* 学习笔记 */}
                    <div>
                      <h4 className="font-semibold mb-3 text-white">学习笔记</h4>
                      <p className="text-gray-400 bg-black/20 p-3 rounded-md border border-white/10">{selectedSkill.learningNote}</p>
                    </div>

                    {/* 趣闻 */}
                    {selectedSkill.funFact && (
                      <div className="p-3 bg-primary/10 rounded-md border border-primary/20">
                        <h4 className="font-semibold mb-1 text-primary">你知道吗？</h4>
                        <p className="text-gray-300">{selectedSkill.funFact}</p>
                      </div>
                    )}

                    {selectedSkill.projects && selectedSkill.projects.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-3 text-white flex items-center gap-2"><Star size={16} className="text-yellow-400"/>相关项目</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedSkill.projects.map(proj => <Badge key={proj} variant="secondary">{proj}</Badge>)}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            {!selectedSkill && (
               <div className="hidden md:flex items-center justify-center h-full text-center text-gray-500 p-6 bg-black/20 backdrop-blur-lg rounded-2xl border border-white/10">
                  <p>点击技能卡片<br/>查看详细信息</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}