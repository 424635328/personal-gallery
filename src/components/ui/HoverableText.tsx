// src/components/ui/HoverableText.tsx

'use client';

import { motion } from 'framer-motion';
import React from 'react';

// 单个字符的动画变体
const charVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  hover: {
    scale: 1.2,
    y: -4,
    color: 'hsl(var(--primary))',
    transition: { type: 'spring', stiffness: 300, damping: 15 },
  },
};

// 整个文本容器的动画变体，用于实现字符交错出现的效果
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.02, // 每个字符出现的延迟
    },
  },
};

interface HoverableTextProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  el?: keyof JSX.IntrinsicElements;
}

const HoverableText: React.FC<HoverableTextProps> = ({ text, el: Wrapper = 'div', ...props }) => {
  const characters = Array.from(text);

  return (
    <motion.div
      // 使用 motion.div 作为容器，并应用交错动画
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      // 将传入的 className 和其他 props 应用到容器上
      {...props}
      // 使用 as prop 将 div 渲染为指定的 HTML 元素 (h1, p, etc.)
      // @ts-ignore (Framer Motion's 'as' prop can sometimes cause TS issues)
      as={Wrapper}
    >
      {characters.map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          variants={charVariants}
          whileHover="hover"
          style={{ display: 'inline-block', cursor: 'pointer' }}
          // 使用 white-space: pre-wrap 来保留空格
          className={char === ' ' ? 'whitespace-pre-wrap' : ''}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default HoverableText;