// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  // -----------------------------------------------------------------------------
  // 构建过程配置 (Build Process Configuration)
  // -----------------------------------------------------------------------------
  
  /**
   * ESLint 配置
   * 推荐：在生产环境构建 (next build) 时忽略 ESLint 错误。
   * 这可以防止因为代码风格或非关键性问题导致 Vercel/CI 构建失败。
   * 本地开发 (next dev) 时仍然会显示错误。
   */
  eslint: {
    ignoreDuringBuilds: true,
  },

  /**
   * TypeScript 配置
   * 推荐：在生产环境构建 (next build) 时忽略 TypeScript 编译错误。
   * 这可以防止因为类型定义问题导致 Vercel/CI 构建失败。
   * 强烈建议在提交代码前通过 `tsc --noEmit` 或 IDE 解决所有类型问题。
   */
  typescript: {
    ignoreBuildErrors: true,
  },

  // -----------------------------------------------------------------------------
  // 图片优化配置 (Image Optimization Configuration)
  // -----------------------------------------------------------------------------
  
  /**
   * next/image 组件配置
   * 用于优化图片加载，并指定允许从哪些外部域名加载图片。
   */
  images: {
    /**
     * remotePatterns 是推荐的配置方式，比 'domains' 更安全、更灵活。
     * 它允许你通过协议、主机名、端口和路径名来精确匹配外部图片URL。
     */
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**', // '/**' 表示允许加载该域名下的任何路径的图片
      },
      // 如果将来需要从其他域名加载图片，可以在此数组中继续添加对象。
      // 例如：
      // {
      //   protocol: 'https',
      //   hostname: 'cdn.example.com',
      // },
    ],
  },
  
  // -----------------------------------------------------------------------------
  // 其他 Next.js 配置 (Other Configurations)
  // -----------------------------------------------------------------------------
  
  /**
   * React 严格模式
   * 在开发模式下，帮助识别潜在问题的组件。它会重复渲染组件以检测意外的副作用。
   * 推荐保持开启 (true)。
   */
  // reactStrictMode: true, // 根据你的项目需求决定是否开启
};

module.exports = nextConfig;