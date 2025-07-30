// src/components/sections/home/WorkflowSection.tsx

// 1. 从 react 中多导入一个 useMemo
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit, Blocks, Code, Sparkles, Rocket } from 'lucide-react';
import { cn } from '@/lib/utils';

const visualVariants = {
  initial: { opacity: 0, scale: 0.8, rotateY: -30 },
  animate: { opacity: 1, scale: 1, rotateY: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, scale: 0.8, rotateY: 30, transition: { duration: 0.4, ease: [0.64, 0, 0.78, 0] } },
};

const DiscoveryVisual = () => {
    const words = ["User Needs", "Goals", "Roadmap", "Research", "Strategy", "Data", "UX"];

    // 2. 使用 useMemo 来生成并缓存随机偏移量
    // 这个函数只会在组件首次渲染时运行一次，之后会一直使用缓存的结果
    const randomOffsets = useMemo(() => {
        return words.map(() => ({
            x: (Math.random() - 0.5) * 40,
            y: (Math.random() - 0.5) * 40,
            rotate: (Math.random() - 0.5) * 20,
        }));
    }, []); // 空依赖数组 [] 是关键，确保只运行一次

    return (
      <motion.div variants={visualVariants} initial="initial" animate="animate" exit="exit" className="absolute inset-0 flex items-center justify-center">
        {words.map((word, i) => (
          <motion.div
            key={word}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1, transition: { delay: i * 0.1 } }}
            className="absolute p-2 px-4 bg-background/50 border border-border/20 rounded-full text-sm font-medium"
            // 3. 使用预先计算好的、稳定的随机值
            style={{
              x: Math.cos(i * 2 * Math.PI / words.length) * 150 + randomOffsets[i].x,
              y: Math.sin(i * 2 * Math.PI / words.length) * 150 + randomOffsets[i].y,
              rotate: randomOffsets[i].rotate,
            }}
          >
            {word}
          </motion.div>
        ))}
      </motion.div>
    );
};

const DesignVisual = () => (
    <motion.div variants={visualVariants} initial="initial" animate="animate" exit="exit" className="absolute inset-0 p-8 flex flex-col justify-center items-center gap-4">
        <motion.img 
        src="https://user-images.githubusercontent.com/424635328/200171638-16dc756f-8a03-4613-8994-5c91a0c878e1.png" // Placeholder Wireframe
        alt="Wireframe"
        initial={{ opacity: 1, y: 0 }}
        animate={{ opacity: 0.1, y: -10, transition: { duration: 1, delay: 0.5, repeat: Infinity, repeatType: "reverse" } }}
        className="absolute inset-0 w-full h-full object-contain"
        />
        <motion.img 
        src="https://user-images.githubusercontent.com/424635328/200171639-6d656157-548c-4475-8b3d-51a87b8d4c38.png" // Placeholder UI
        alt="UI Component"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.3 } }}
        className="relative w-4/5 rounded-lg shadow-2xl"
        />
    </motion.div>
);

const DevelopmentVisual = () => (
    <motion.div variants={visualVariants} initial="initial" animate="animate" exit="exit" className="absolute inset-0 p-8 flex items-center justify-center">
        <div className="w-full h-auto bg-gray-900/80 rounded-lg p-4 font-mono text-sm text-left shadow-lg border border-gray-700">
        {["<motion.div", "  layoutId='card'", "  onClick={open}", ">", "  <CardContent />", "</motion.div>"].map((line, i) => (
            <motion.p
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0, transition: { delay: i * 0.15 } }}
            className="text-gray-300"
            style={{ textShadow: "0 0 5px hsl(var(--primary)/0.5)" }}
            >
            {line.split("").map((char, ci) => (
                <motion.span key={ci} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.15 + ci * 0.01 }}>
                {char}
                </motion.span>
            ))}
            </motion.p>
        ))}
        </div>
    </motion.div>
);

const DeploymentVisual = () => (
    <motion.div variants={visualVariants} initial="initial" animate="animate" exit="exit" className="absolute inset-0 flex flex-col items-center justify-center gap-6">
        <motion.button 
        className="relative px-8 py-4 bg-primary text-primary-foreground font-bold rounded-lg text-xl shadow-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ boxShadow: "0 0 0px hsl(var(--primary))" }}
        animate={{ boxShadow: ["0 0 20px hsl(var(--primary)/0.5)", "0 0 40px hsl(var(--primary)/0.3)", "0 0 20px hsl(var(--primary)/0.5)"], transition: { duration: 2, repeat: Infinity } }}
        >
        <Rocket className="inline-block mr-2" />
        LAUNCH
        </motion.button>
        {[...Array(30)].map((_, i) => (
        <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
            x: (Math.random() - 0.5) * 400,
            y: (Math.random() - 0.5) * 400,
            transition: {
                duration: Math.random() * 1.5 + 1,
                delay: Math.random() * 1,
                repeat: Infinity,
                ease: "easeInOut",
            },
            }}
        />
        ))}
        <p className="text-muted-foreground text-sm">Automated CI/CD Pipeline</p>
    </motion.div>
);

const workflowSteps = [
  {
    icon: BrainCircuit,
    title: "思想的碰撞",
    description: "我沉浸于项目的世界，去理解其灵魂——用户需求、业务逻辑与市场脉络。这不仅是收集信息，更是一场与创意和可能性的深度对话，最终绘制出通往卓越产品的航海图。",
    visual: DiscoveryVisual,
  },
  {
    icon: Blocks,
    title: "形态的塑造",
    description: "从混乱中寻找秩序，将抽象的构思转化为具体的结构。我用线框图搭建骨架，用高保真原型赋予其血肉，并沉淀为设计系统。每根线条、每个像素，都在为最终的和谐体验服务。",
    visual: DesignVisual,
  },
  {
    icon: Code,
    title: "逻辑的编织",
    description: "这是将蓝图变为现实的魔法。我以代码为笔，遵循敏捷与测试驱动的原则，编写出优雅、健壮且可扩展的程序。追求的不仅是功能的实现，更是代码本身的美感与艺术性。",
    visual: DevelopmentVisual,
  },
  {
    icon: Sparkles,
    title: "生命的绽放",
    description: "通过自动化的CI/CD管道，将心血之作推送至云端，使其在世界范围内触手可及。但发布不是终点，而是新的开始。我持续观测、聆听反馈，驱动产品在迭代中不断进化，追求完美。",
    visual: DeploymentVisual,
  },
];


export const WorkflowSection = () => {
  const [activeStep, setActiveStep] = useState(0);
  const ActiveVisual = workflowSteps[activeStep].visual;

  return (
    <section 
      className="w-full flex flex-col items-center justify-start snap-start pt-24 pb-12 px-4"
      style={{ minHeight: 'calc(100vh - var(--header-height))' }}
    >
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        viewport={{ once: true, amount: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">我的工作流</h2>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">从灵感到实现，我的每一个项目都遵循着一套严谨而富有创造力的流程。</p>
      </motion.div>
      
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        
        {/* 左侧：步骤选择器和描述 */}
        <div className="flex flex-col gap-8">
          {/* 步骤选择器 (Tabs) */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-2">
            {workflowSteps.map((step, index) => (
              <button
                key={step.title}
                onClick={() => setActiveStep(index)}
                className={cn(
                  "relative px-4 py-2 text-sm sm:text-base font-medium rounded-md transition-colors",
                  "text-muted-foreground hover:text-foreground",
                  activeStep === index && "text-foreground"
                )}
              >
                {activeStep === index && (
                  <motion.div
                    layoutId="active-workflow-tab"
                    className="absolute inset-0 bg-muted rounded-md"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <step.icon className="w-4 h-4" />
                  {step.title}
                </span>
              </button>
            ))}
          </div>

          {/* 文本内容展示 */}
          <div className="relative h-48 sm:h-40 text-center lg:text-left">
             <AnimatePresence mode="wait">
                <motion.p
                    key={activeStep}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="absolute inset-0 text-muted-foreground leading-relaxed"
                >
                    {workflowSteps[activeStep].description}
                </motion.p>
             </AnimatePresence>
          </div>
        </div>

        {/* 右侧：视觉效果展示 */}
        <div className="flex items-center justify-center">
          <div className={cn(
            "relative w-full aspect-square max-w-[500px] rounded-2xl border border-border/10",
            "bg-card/30 backdrop-blur-xl shadow-2xl shadow-black/10 overflow-hidden"
          )}>
            <AnimatePresence mode="wait">
              <ActiveVisual key={activeStep} />
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};