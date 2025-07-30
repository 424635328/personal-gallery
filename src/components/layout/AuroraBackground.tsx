// src/components/layout/AuroraBackground.tsx

'use client';

import { cn } from '@/lib/utils';
import { motion, useMotionValue, useTransform, type AnimationProps, type Transition, type TargetAndTransition, type MotionValue, type HTMLMotionProps } from 'framer-motion';
import React, { useState, useEffect, useMemo } from 'react';
import styled, { keyframes } from 'styled-components';

// ============================================================================
// 1. 类型定义 (Type Definitions)
// ============================================================================

interface AuroraBackgroundProps {
  children?: React.ReactNode;
  rainCount?: number;
  neonSignText?: string;
}

interface ShardConfig {
  readonly id: number;
  readonly className: string;
  readonly style: Omit<React.CSSProperties, 'rotate'> & { rotate: string | number };
  readonly animation: { animate: TargetAndTransition; transition: Transition };
  readonly parallaxStrength: number;
}

interface LightOrbConfig {
  readonly id: number;
  readonly top: string;
  readonly left: string;
  readonly size: number;
  readonly color: string;
  readonly parallaxStrength: number;
}

interface StyleProps {
  style: React.CSSProperties;
}


// ============================================================================
// 2. 动画关键帧 (Keyframes for Styled Components)
// ============================================================================

const fall = keyframes`from { transform: translateY(-20vh); } to { transform: translateY(120vh); opacity: 0; }`;
const flicker = keyframes`0%,18%,22%,25%,53%,57%,100%{opacity:1;text-shadow:0 0 5px #ff00de,0 0 10px #ff00de,0 0 20px #ff00de,0 0 40px #ff00de,0 0 80px #ff00de,0 0 90px #ff00de}20%,24%,55%{opacity:.8;text-shadow:none}`;
const riseAndFade = keyframes`from { transform: translateY(0) scale(1); opacity: 0.4; } to { transform: translateY(-80px) scale(1.5); opacity: 0; }`;
const lightningFlash = keyframes`0%,98%{opacity:0}98.1%,98.3%,98.6%{opacity:1}98.2%,98.5%{opacity:0}100%{opacity:0}`;
const ripple = keyframes`from { width: 0; height: 0; opacity: 0.8; } to { width: 100px; height: 50px; opacity: 0; }`;
const scanline = keyframes`0% { transform: translateY(-10%); } 100% { transform: translateY(110vh); }`;
const glitchFlicker = keyframes`0%, 100% { opacity: 1; } 50% { opacity: 0.2; }`;

// OPTIMIZED: CSS keyframe for twinkling stars
const twinkle = keyframes`
  0%, 100% { opacity: 0; }
  50% { opacity: 0.8; }
`;


// ============================================================================
// 3. 样式化组件 (Styled Components)
// ============================================================================

const Raindrop = styled.div.attrs<StyleProps>(({ style }) => ({ style }))<StyleProps>`
  position: absolute; bottom: 100%; background: linear-gradient(to top, rgba(173, 216, 230, 0), rgba(90, 200, 250, 0.7)); animation: ${fall} linear infinite; pointer-events: none;
`;
const NeonSign = styled.h1`
  position: absolute; top: 5vh; right: 5vw; font-family: var(--font-neon, 'Orbitron', sans-serif); font-size: 3rem; font-weight: 700; color: #fff; animation: ${flicker} 5s linear infinite; user-select: none; z-index: 5; @media (max-width: 768px) { font-size: 2rem; }
`;
const Steam = styled.div<{ $delay: string; $duration: string, $left: string }>`
  position: absolute; bottom: -50px; left: ${({ $left }) => $left}; width: 250px; height: 150px; background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 70%); border-radius: 50%; animation: ${riseAndFade} infinite; animation-delay: ${({ $delay }) => $delay}; animation-duration: ${({ $duration }) => $duration}; transform-origin: bottom center;
`;
const LightningFlashOverlay = styled.div`
  position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: white; opacity: 0; animation: ${lightningFlash} 10s linear infinite; z-index: 1; pointer-events: none;
`;
const PuddleRipple = styled.div.attrs<StyleProps>(({ style }) => ({ style }))<StyleProps>`
  position: absolute; border: 1px solid rgba(135, 206, 250, 0.5); border-radius: 50%; transform: translate(-50%, -50%); animation: ${ripple} linear infinite; pointer-events: none;
`;
const ScreenScanLine = styled.div`
  position: absolute; top: 0; left: 0; width: 100%; height: 2px; background: linear-gradient(to right, transparent, rgba(135, 206, 250, 0.5), transparent); animation: ${scanline} 8s cubic-bezier(0.7, 0, 0.3, 1) infinite; z-index: 2; box-shadow: 0 0 10px rgba(135, 206, 250, 0.7);
`;
const GlitchyCornerText = styled.div`
  position: absolute; bottom: 20px; left: 20px; font-family: 'Courier New', Courier, monospace; color: rgba(135, 206, 250, 0.7); font-size: 0.75rem; z-index: 5; user-select: none; pointer-events: none;
  span { display: inline-block; animation: ${glitchFlicker} 1.5s infinite; }
`;

// OPTIMIZED: Use styled-component for stars to leverage CSS animations
const TwinklingStar = styled.div.attrs<StyleProps>(({ style }) => ({ style }))<StyleProps>`
  position: absolute;
  height: 2px;
  width: 2px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.8);
  animation-name: ${twinkle};
  animation-timing-function: linear;
  animation-iteration-count: infinite;
`;


// ============================================================================
// 4. 静态配置 (Static Config)
// ============================================================================

const SHARD_CONFIG: readonly ShardConfig[] = [
  { id: 1, className: 'h-[35vh] w-[25vw] min-h-[200px] min-w-[300px]', style: { top: '10%', left: '5%', rotate: '-6deg' }, animation: { animate: { y: ['-25px', '25px', '-25px'], x: ['-15px', '15px', '-15px'] }, transition: { duration: 35, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' } }, parallaxStrength: 0.08 },
  { id: 2, className: 'h-[30vh] w-[40vw] min-h-[250px] min-w-[400px]', style: { top: '55%', left: '50%', rotate: '8deg' }, animation: { animate: { y: ['35px', '-35px', '35px'] }, transition: { duration: 42, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut', delay: 2.5 } }, parallaxStrength: 0.05 },
  { id: 3, className: 'h-[20vh] w-[20vw] min-h-[150px] min-w-[200px]', style: { top: '65%', left: '15%', rotate: '-10deg' }, animation: { animate: { y: ['-30px', '30px', '-30px'] }, transition: { duration: 28, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut', delay: 5 } }, parallaxStrength: 0.06 },
  { id: 4, className: 'h-[22vh] w-[24vw] min-h-[180px] min-w-[220px]', style: { top: '25%', left: '78%', rotate: '5deg' }, animation: { animate: { y: ['20px', '-20px', '20px'], x: ['-25px', '25px', '-25px'] }, transition: { duration: 45, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut', delay: 1.5 } }, parallaxStrength: 0.07 },
];
const ORB_CONFIG: readonly LightOrbConfig[] = [
  { id: 1, top: '20%', left: '30%', size: 30, color: '#67e8f9', parallaxStrength: 0.04 },
  { id: 2, top: '80%', left: '10%', size: 40, color: '#a855f7', parallaxStrength: 0.03 },
  { id: 3, top: '50%', left: '85%', size: 25, color: '#7dd3fc', parallaxStrength: 0.025 },
  { id: 4, top: '90%', left: '60%', size: 35, color: '#34d399', parallaxStrength: 0.035 },
  { id: 5, top: '10%', left: '70%', size: 20, color: '#fde047', parallaxStrength: 0.02 },
];
const NUM_TWINKLING_STARS = 250;
const NUM_PUDDLES = 27; 
const GLITCH_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_./\\?*#@!$%&';


// ============================================================================
// 5. 原子组件 (Atomic Components)
// ============================================================================

const GlassShard = React.memo(({ animation, style, ...props }: React.ComponentProps<typeof motion.div> & { animation: { animate: AnimationProps['animate'], transition: Transition } }) => (
    <motion.div className={cn('absolute inset-0 z-20', 'backdrop-blur-xl', 'bg-white/5', 'rounded-2xl shadow-2xl shadow-black/40', 'ring-1 ring-inset ring-white/10', 'after:absolute after:inset-0 after:rounded-2xl after:bg-gradient-to-br after:from-white/10 after:via-transparent after:to-transparent', 'will-change-transform')} animate={animation.animate} transition={animation.transition} style={{ rotate: style?.rotate }} {...props} />
));
GlassShard.displayName = 'GlassShard';

const StarDust = React.memo(() => <div className="absolute inset-0 h-full w-full bg-repeat opacity-[0.15]" style={{ backgroundImage: "url('/textures/noise.png')" }}/>);
StarDust.displayName = 'StarDust';

type LightOrbProps = Pick<LightOrbConfig, 'top'|'left'|'size'|'color'> & { delay: number; style?: HTMLMotionProps<'div'>['style'] };
const LightOrb = React.memo(({ top, left, size, color, delay, style }: LightOrbProps) => <motion.div className="absolute rounded-full will-change-transform z-10" style={{ top, left, width: size, height: size, backgroundImage: `radial-gradient(circle, ${color} 0%, transparent 70%)`, ...style }} animate={{ scale: [1, 1.2, 1, 0.9, 1], opacity: [0.5, 0.8, 0.5, 1, 0.5] }} transition={{ duration: 8 + delay * 2, repeat: Infinity, ease: 'easeInOut', delay }} />);
LightOrb.displayName = 'LightOrb';

const BlackHoleGradient = React.memo(() => (
    <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,#06040f_70%)]" />
));
BlackHoleGradient.displayName = 'BlackHoleGradient';


// ============================================================================
// 6. 优化的子组件 (Optimized Sub-components)
// ============================================================================

const StarsLayer = React.memo(() => {
  const stars = useMemo(() => {
    return Array.from({ length: NUM_TWINKLING_STARS }, (_, i) => ({
      id: i,
      style: {
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        animationDuration: `${2 + Math.random() * 3}s`,
        animationDelay: `${Math.random() * 5}s`,
      },
    }));
  }, []); // Empty dependency array, calculates only once

  return (
    <div className="absolute inset-0 pointer-events-none">
      {stars.map(star => <TwinklingStar key={star.id} style={star.style} />)}
    </div>
  );
});
StarsLayer.displayName = 'StarsLayer';

const CyberpunkEffectsLayer = React.memo(({ rainCount, neonSignText }: { rainCount: number; neonSignText: string; }) => {
  const raindrops = useMemo(() => {
    return Array.from({ length: rainCount }).map((_, i) => {
      const perspective = Math.random();
      let style: React.CSSProperties;
      if (perspective > 0.7) { style = { width: '2px', height: '150px', opacity: 0.9, left: `${Math.random() * 100}vw`, animationDelay: `${Math.random() * 2}s`, animationDuration: `${0.5 + Math.random() * 0.3}s` }; } 
      else if (perspective > 0.3) { style = { width: '1.5px', height: '100px', opacity: 0.6, left: `${Math.random() * 100}vw`, animationDelay: `${Math.random() * 5}s`, animationDuration: `${1 + Math.random() * 0.5}s` }; } 
      else { style = { width: '1px', height: '70px', opacity: 0.3, left: `${Math.random() * 100}vw`, animationDelay: `${Math.random() * 8}s`, animationDuration: `${1.5 + Math.random() * 0.8}s` }; }
      return <Raindrop key={i} style={style} />;
    });
  }, [rainCount]);

  const puddles = useMemo(() => {
    return Array.from({ length: NUM_PUDDLES }, (_, i) => ({
      id: i,
      style: {
        bottom: `${Math.random() * 5}%`,
        left: `${10 + Math.random() * 80}%`,
        animationDuration: `${3 + Math.random() * 3}s`,
        animationDelay: `${Math.random() * 6}s`,
      },
    }));
  }, []);

  const glitchText = useMemo(() => {
    return Array.from({ length: 25 }, (_, i) => ({
      id: i,
      char: GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)],
      style: { animationDelay: `${Math.random() * 1.5}s` },
    }));
  }, []);

  return (
    
<div className="absolute inset-0 overflow-hidden pointer-events-none">
  {/*
    霓虹灯招牌。
    - className="pointer-events-auto": 这个类覆盖了父元素的 'pointer-events-none' 设置。
      它将鼠标事件的捕获能力“恢复”给霓虹灯招牌本身。虽然这个组件目前没有交互功能，
      但这样做是一个好的实践，以防未来需要给它添加点击事件或 hover 效果，同时也允许用户选择上面的文本。
  */}
  <NeonSign className="pointer-events-auto">{neonSignText}</NeonSign>
  
  {/*
    渲染雨滴数组。
    - {raindrops}: 这是一个预先计算好的 React 元素数组 (`<Raindrop />` 组件的集合)。
      直接渲染这个数组可以高效地将所有雨滴添加到 DOM 中。
      因为父容器设置了 'pointer-events-none'，所以成百上千的雨滴不会影响页面交互。
  */}
  {raindrops}
  
  {/*
    渲染水洼涟漪。
    - 通过 map 遍历预先生成的 'puddles' 数据，为每个数据项创建一个 `<PuddleRipple />` 组件。
      这同样受益于父级的 'pointer-events-none'。
  */}
  {puddles.map(puddle => <PuddleRipple key={puddle.id} style={puddle.style} />)}
  
  {/*
    渲染左下角的乱码文本。
    - 这是一个纯装饰性的文本元素，同样不需要响应鼠标事件。
  */}
  <GlitchyCornerText>
    {/*
      遍历乱码字符数据，为每个字符渲染一个 `<span>`。
      - style={item.style}: 为每个字符应用独立的动画延迟（animationDelay），
        从而创建出无序、持续闪烁的效果，而无需 JavaScript 定时器。
    */}
    {glitchText.map(item => <span key={item.id} style={item.style}>{item.char}</span>)}
  </GlitchyCornerText>
  
  {/*
    渲染多个蒸汽效果。
    - 这些是独立的装饰性动画，通过 props (`$delay`, `$duration`, `$left`) 控制它们各自的
      动画延迟、时长和水平位置，创造出看似随机、自然的场景氛围。
  */ }
  <Steam $delay="0s" $duration="8s" $left="15%" />
  <Steam $delay="3s" $duration="10s" $left="70%" />
  <Steam $delay="6s" $duration="7s" $left="40%" />
</div>
  );
});
CyberpunkEffectsLayer.displayName = 'CyberpunkEffectsLayer';

const ParallaxLayers = React.memo(({ mouseX, mouseY }: { mouseX: MotionValue<number>; mouseY: MotionValue<number>; }) => {
    const ParallaxLightOrb = ({ orb, mouseX, mouseY }: { orb: LightOrbConfig, mouseX: MotionValue<number>, mouseY: MotionValue<number> }) => {
        const parallaxX = useTransform(mouseX, [0, window.innerWidth], [-orb.size * orb.parallaxStrength, orb.size * orb.parallaxStrength]);
        const parallaxY = useTransform(mouseY, [0, window.innerHeight], [-orb.size * orb.parallaxStrength, orb.size * orb.parallaxStrength]);
        return <LightOrb {...orb} delay={orb.id * 0.7} style={{ x: parallaxX, y: parallaxY }} />
    };

    const ParallaxGlassShard = ({ shard, mouseX, mouseY }: { shard: ShardConfig, mouseX: MotionValue<number>, mouseY: MotionValue<number> }) => {
        const parallaxX = useTransform(mouseX, [0, window.innerWidth], [-100 * shard.parallaxStrength, 100 * shard.parallaxStrength]);
        const parallaxY = useTransform(mouseY, [0, window.innerHeight], [-100 * shard.parallaxStrength, 100 * shard.parallaxStrength]);
        return (
            <motion.div className={cn('absolute z-20', shard.className)} style={{ top: shard.style.top, left: shard.style.left, x: parallaxX, y: parallaxY }}>
                <GlassShard animation={shard.animation} style={shard.style} />
            </motion.div>
        );
    };

  return (
    <>
      {ORB_CONFIG.map(orb => <ParallaxLightOrb key={orb.id} orb={orb} mouseX={mouseX} mouseY={mouseY} />)}
      {SHARD_CONFIG.map((shard) => <ParallaxGlassShard key={shard.id} shard={shard} mouseX={mouseX} mouseY={mouseY} />)}
    </>
  );
});
ParallaxLayers.displayName = 'ParallaxLayers';


// ============================================================================
// 7. 主组件 (Main Merged Component)
// ============================================================================
export default function AuroraBackground({
    children,
    rainCount = 200,
    neonSignText = "AURORA"
}: AuroraBackgroundProps) {

  const [isMounted, setIsMounted] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    setIsMounted(true);
    mouseX.set(window.innerWidth / 2);
    mouseY.set(window.innerHeight / 2);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Avoid rendering on the server or before hydration, as it depends on `window`.
  if (!isMounted) {
    return null;
  }

  return (
      <div className="fixed inset-0 -z-50">
        <div className="relative h-full w-full overflow-hidden bg-gradient-to-b from-[#06040f] via-[#0a0a14] to-black isolation-isolate">
          {/* --- Base Layers (Static or CSS-only animations) --- */}
          <BlackHoleGradient />
          <StarDust />
          <LightningFlashOverlay />
          <div className="pointer-events-none absolute inset-0 overflow-hidden"><ScreenScanLine /></div>
          
          {/* --- Aurora Motion Blobs (Framer Motion is good for these complex, smooth animations) --- */}
          <motion.div className="absolute h-[120vmin] w-[120vmin] rounded-full blur-3xl bg-gradient-to-tr from-cyan-500/80 via-purple-600/80 to-emerald-500/80 will-change-transform" initial={{ opacity: 0.1, scale: 0.9, x: '-30%', y: '-40%' }} animate={{ x: ['-40%', '30%', '-40%'], y: ['-50%', '20%', '-50%'], rotate: [0, 20, 0], opacity: [0.15, 0.35, 0.15], scale: [0.9, 1.1, 0.9] }} transition={{ duration: 40, ease: 'circInOut', repeat: Infinity, repeatType: 'mirror' }} />
          <motion.div className="absolute h-[90vmin] w-[90vmin] rounded-full blur-3xl bg-gradient-to-bl from-blue-500/70 to-violet-600/70 will-change-transform" initial={{ opacity: 0.05, x: '30%', y: '30%' }} animate={{ x: ['40%', '-20%', '40%'], y: ['40%', '-40%', '40%'], rotate: [15, -5, 15], opacity: [0.25, 0.05, 0.25], scale: [1.1, 0.8, 1.1] }} transition={{ duration: 50, ease: 'circInOut', repeat: Infinity, repeatType: 'mirror', delay: 4 }} />
          <motion.div className="absolute h-[60vmin] w-[60vmin] rounded-full blur-3xl bg-sky-400/50 will-change-transform" initial={{ opacity: 0 }} animate={{ x: '10%', y: '10%', opacity: [0, 0.1, 0.15, 0], scale: [1, 1.2, 1] }} transition={{ duration: 25, repeat: Infinity, repeatType: 'reverse', delay: 10 }} style={{ top: '0%', left: '0%' }} />

          {/* --- Optimized, Memoized Layers --- */}
          <StarsLayer />
          <CyberpunkEffectsLayer rainCount={rainCount} neonSignText={neonSignText} />
          <ParallaxLayers mouseX={mouseX} mouseY={mouseY} />
          
          {/* --- Children Content --- */}
          <div className="relative z-10 h-full w-full">
              {children}
          </div>
        </div>
      </div>
  );
}