//  src/lib/rate-limiter.ts

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// --- 密码尝试限制的配置常量 ---
// 明确定义最大尝试次数和锁定时间，方便统一管理和前端同步
export const MAX_PASSWORD_ATTEMPTS = 10; // 最大尝试次数
export const PASSWORD_LOCKOUT_DURATION = "30 m"; // 锁定时间

// --- Redis 连接配置 ---
const REDIS_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

let redisClient: Redis | undefined;

// --- Redis 客户端初始化逻辑 ---
if (REDIS_URL && REDIS_TOKEN) {
  try {
    redisClient = new Redis({
      url: REDIS_URL,
      token: REDIS_TOKEN,
    });

    redisClient.ping()
      .then(response => {
        if (response === 'PONG') {
          console.log("✅ Successfully connected to Redis (Vercel KV)!");
        } else {
          console.warn("⚠️ Connected to Redis, but ping response was unexpected:", response);
        }
      })
      .catch(err => {
        console.error("❌ Failed to connect to Redis (Vercel KV) on startup:", err);
        redisClient = undefined; // 连接失败，将客户端设为 undefined
        if (process.env.NODE_ENV === 'production') {
          // 在生产环境，如果核心服务（如限流）启动失败，通常应有更强烈的告警或退出策略
          // throw new Error("Critical Redis connection failure preventing rate limiting.");
        }
      });
  } catch (error) {
    console.error("❌ FATAL ERROR during Redis client initialization:", error);
    redisClient = undefined; // 初始化失败，将客户端设为 undefined
  }
} else {
  console.warn("WARNING: Redis environment variables (KV_REST_API_URL/TOKEN or UPSTASH_REDIS_REST_URL/TOKEN) are not set. Rate limiting will be non-functional.");
}


// --- 限流器前缀定义 ---
export const IP_RATELIMIT_PREFIX = "offerscore_ip_ratelimit";
export const PASSWORD_ATTEMPT_PREFIX = "offerscore_password_attempt";


/**
 * 限制器1：基于IP地址的通用速率限制。
 * 如果 Redis 客户端未初始化，此限流器将不会生效。
 */
export const ipRateLimiter = new Ratelimit({
  redis: redisClient!, // 使用非空断言，因为 Ratelimit 内部会处理 undefined 情况
  limiter: Ratelimit.slidingWindow(10, "10 s"), // 示例：10次/10秒
  analytics: true,
  prefix: IP_RATELIMIT_PREFIX,
});

/**
 * 限制器2：基于邮箱的密码尝试限制。
 * 这是防止暴力破解的核心。
 * 如果 Redis 客户端未初始化，此限流器将不会生效。
 */
export const passwordAttemptLimiter = new Ratelimit({
  redis: redisClient!, // 使用非空断言
  // 使用上面定义的常量来配置限流器的行为
  limiter: Ratelimit.fixedWindow(MAX_PASSWORD_ATTEMPTS, PASSWORD_LOCKOUT_DURATION),
  analytics: true,
  prefix: PASSWORD_ATTEMPT_PREFIX,
});

/**
 * 辅助函数：在成功登录后重置特定邮箱的失败尝试计数。
 * @param email - 要重置的邮箱地址。
 */
export const resetPasswordAttempts = async (email: string) => {
  if (typeof email === 'string' && email.length > 0 && redisClient) {
    try {
      const keyToDelete = `${PASSWORD_ATTEMPT_PREFIX}:${email}`;
      await redisClient.del(keyToDelete); // 确保 redisClient 存在才调用 del
      console.log(`Successfully reset password attempts for: ${email}`);
    } catch (error) {
      console.error(`Failed to reset password attempts for ${email}:`, error);
    }
  } else if (!redisClient) {
      console.warn(`Attempted to reset password attempts for ${email}, but Redis client is not initialized.`);
  }
};

/**
 * 辅助函数：从请求中获取客户端IP地址。
 * @param req - Next.js 的 Request 对象。
 * @returns 客户端的IP地址。
 */
export const getIp = (req: Request): string => {
    const headers = req.headers;
    const ip = (headers.get('x-forwarded-for') ?? headers.get('x-real-ip') ?? '127.0.0.1').split(',')[0].trim();
    return ip;
}