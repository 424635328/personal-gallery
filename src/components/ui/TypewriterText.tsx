// components/ui/TypewriterText.tsx

'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

type TypewriterTextProps = {
  text: string;
  className?: string;
  el?: keyof JSX.IntrinsicElements; // 允许指定渲染的 HTML 标签，如 h1, p
  once?: boolean; // 是否只播放一次动画
};

export default function TypewriterText({ 
  text, 
  className, 
  el: Wrapper = 'p', 
  once = false
}: TypewriterTextProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5, once });

  const defaultAnimation = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, 
      },
    },
  };

  return (
    <Wrapper className={className}>
      <span className="sr-only">{text}</span>
      <motion.span
        ref={ref}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={defaultAnimation}
        aria-hidden
      >
        {text.split('').map((char, index) => (
          <motion.span key={index} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
            {char}
          </motion.span>
        ))}
      </motion.span>
    </Wrapper>
  );
}