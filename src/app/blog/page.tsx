// src/app/blog/page.tsx
'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { blogPosts, blogCategories, Post } from '@/data/blog-data';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, Tag } from 'lucide-react';
import { format } from 'date-fns';

// 博客卡片组件
const BlogPostCard = ({ post, isFeatured }: { post: Post; isFeatured?: boolean }) => {
  if (isFeatured) {
    return (
      <motion.div
        layoutId={`post-card-${post.id}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="col-span-12 lg:col-span-8 rounded-2xl overflow-hidden relative group shadow-lg"
      >
        <Link href={`/blog/${post.slug}`} className="block">
          <div className="aspect-w-16 aspect-h-9">
            <Image src={post.imageUrl} alt={post.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 md:p-8 text-white">
            <span className="text-sm font-semibold bg-primary text-primary-foreground px-3 py-1 rounded-full">{post.category}</span>
            <h2 className="text-2xl md:text-3xl font-bold mt-4 leading-tight">{post.title}</h2>
            <p className="mt-2 text-sm text-neutral-300 hidden md:block">{post.excerpt}</p>
          </div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      layoutId={`post-card-${post.id}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="col-span-12 sm:col-span-6 lg:col-span-4 bg-card/50 rounded-2xl overflow-hidden group shadow-sm border border-border/50 hover:shadow-primary/10 transition-shadow"
    >
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="aspect-w-16 aspect-h-9 relative overflow-hidden">
          <Image src={post.imageUrl} alt={post.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
        </div>
        <div className="p-5">
          <span className="text-xs font-medium text-primary">{post.category}</span>
          <h3 className="mt-2 font-bold text-lg text-foreground leading-snug">{post.title}</h3>
          <div className="mt-3 flex items-center text-xs text-muted-foreground gap-x-4">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              <span>{format(new Date(post.date), 'yyyy-MM-dd')}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              <span>{post.readingTime} 分钟阅读</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};


// 主页面
export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredPosts = useMemo(() => {
    if (activeCategory === 'All') {
      return blogPosts;
    }
    return blogPosts.filter(post => post.category === activeCategory);
  }, [activeCategory]);

  const featuredPost = filteredPosts.find(p => p.featured);
  const regularPosts = filteredPosts.filter(p => !p.featured);

  return (
    <div className="h-full w-full overflow-y-auto px-4 sm:px-8 md:px-12 py-12">
      <div className="max-w-7xl mx-auto">
        {/* 标题和介绍 */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tighter text-foreground">
            思绪的代码存档
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            在这里，我记录技术探索的足迹、分享设计背后的思考，并沉淀职业生涯中的感悟。
          </p>
        </motion.div>
        
        {/* 分类筛选器 */}
        <div className="flex justify-center flex-wrap gap-3 mb-12">
          {blogCategories.map(category => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                activeCategory === category
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card hover:bg-primary/10'
              }`}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </div>
        
        {/* 文章网格 */}
        <div className="grid grid-cols-12 gap-6">
          <AnimatePresence>
            {featuredPost && <BlogPostCard post={featuredPost} isFeatured />}
            {regularPosts.map(post => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </AnimatePresence>
        </div>
        
        {filteredPosts.length === 0 && (
             <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-12 text-center py-16 text-muted-foreground"
            >
                <Tag className="h-12 w-12 mx-auto mb-4" />
                <p>该分类下暂无文章，敬请期待！</p>
            </motion.div>
        )}
      </div>
    </div>
  );
}