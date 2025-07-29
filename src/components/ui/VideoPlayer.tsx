'use client';

import { useState, useRef, useEffect } from 'react';
import { useInView } from 'framer-motion';
import { PlayCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export const VideoPlayer = ({ src }: { src: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.5, once: false }); 

  useEffect(() => {
    if (videoRef.current) {
      if (isInView) {
        videoRef.current.play().catch(() => setIsPlaying(false));
      } else {
        videoRef.current.pause();
      }
    }
  }, [isInView]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const updateProgress = () => setProgress((video.currentTime / video.duration) * 100 || 0);
    video.addEventListener('timeupdate', updateProgress);
    return () => video.removeEventListener('timeupdate', updateProgress);
  }, []);

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;
    const newTime = (Number(e.target.value) / 100) * video.duration;
    if (isFinite(newTime)) {
      video.currentTime = newTime;
    }
    setProgress(Number(e.target.value));
  };

  const togglePlay = () => {
    videoRef.current?.paused ? videoRef.current?.play() : videoRef.current?.pause();
  };

  return (
    <div ref={containerRef} className="relative group w-full aspect-video rounded-lg overflow-hidden shadow-2xl bg-black">
      <video 
        ref={videoRef} 
        src={src} 
        className="w-full h-full object-cover" 
        loop 
        muted 
        playsInline 
        onPlay={() => setIsPlaying(true)} 
        onPause={() => setIsPlaying(false)} 
        onClick={togglePlay} 
      />
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <input 
          type="range" 
          min="0" 
          max="100" 
          value={progress} 
          onChange={handleProgressChange} 
          className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-primary"
          aria-label="Video progress bar"
        />
      </div>
      <div className={cn("absolute inset-0 flex items-center justify-center transition-opacity duration-300 pointer-events-none", isPlaying ? "opacity-0" : "opacity-100")}>
        <div className="bg-black/50 rounded-full p-4 pointer-events-auto cursor-pointer" onClick={togglePlay}>
          <PlayCircle className="h-16 w-16 text-white/90" />
        </div>
      </div>
    </div>
  );
};