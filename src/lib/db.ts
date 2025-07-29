//  lib/db.ts

import { Pool } from '@neondatabase/serverless';
import { Kysely, PostgresDialect } from 'kysely';

// --- 数据库表的 TypeScript 类型定义 ---

interface UsersTable {
  id: string;
  name?: string | null;
  email?: string | null;
  emailVerified?: Date | null;
  image?: string | null;
  password?: string | null;
}

export interface OffersTable {
  id: string;
  created_at: Date;
  user_id: string;
  user_profile: 'graduate' | 'experienced' | 'family';
  company_name: string;
  job_title: string;
  company_size: string;
  company_stage: string;
  base_salary: number;
  salary_months: number;
  annual_subsidies: number;
  has_stock_option: boolean;
  stock_option_value: number;
  health_benefit_level: 'basic' | 'standard' | 'premium';
  commute_time: number;
  work_hours: number[];
  paid_leave: number;
  career_development: number;
  work_content: number;
  work_environment: number;
  life_balance: number;
  weight_salary: number;
  weight_development: number;
  weight_environment: number;
  weight_balance: number;
  weight_prospects: number;
  weight_long_term: number;
}

export interface WeightTemplatesTable {
  id: string;
  created_at: Date;
  created_by_user_id: string | null;
  template_name: string;
  description: string | null;
  weight_salary: number;
  weight_development: number;
  weight_environment: number;
  weight_balance: number;
  times_used: number;
  weight_prospects: number;
  weight_long_term: number;
}

interface AccountsTable {
  id: string;
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token?: string | null;
  access_token?: string | null;
  expires_at?: number | null;
  token_type?: string | null;
  scope?: string | null;
  id_token?: string | null;
  session_state?: string | null;
}

interface SessionsTable {
  id: string;
  sessionToken: string;
  userId: string;
  expires: Date;
}

interface VerificationTokensTable {
  identifier: string;
  token: string;
  expires: Date;
}

export interface Database {
  users: UsersTable;
  offers: OffersTable;
  accounts: AccountsTable;
  sessions: SessionsTable;
  verification_tokens: VerificationTokensTable;
  weight_templates: WeightTemplatesTable;
}

// 声明一个全局变量，用于在开发环境的热重载之间缓存数据库连接
declare global {
  var kysely: Kysely<Database> | undefined;
}

// 检查 DATABASE_URL 环境变量是否存在，如果不存在则提前抛出错误，便于调试
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set');
}

// 创建 Kysely 实例的工厂函数
function createKyselyInstance() {
  return new Kysely<Database>({
    dialect: new PostgresDialect({
      pool: new Pool({
        connectionString: process.env.DATABASE_URL,
      }),
    }),
  });
}

// 这是关键逻辑：
// 1. 尝试从全局缓存 `globalThis.kysely` 中获取 db 实例。
// 2. 如果缓存中不存在（例如，第一次启动），则调用工厂函数创建一个新的实例。
export const db = globalThis.kysely ?? createKyselyInstance();

// 在非生产环境下，我们将新创建的实例存回全局缓存。
// 这是为了处理 Next.js 开发模式下的热重载 (Hot Module Replacement)。
// 如果不做这一步，每次文件更改热重载时，都会创建一个新的数据库连接池，很快就会耗尽连接。
if (process.env.NODE_ENV !== 'production') {
  globalThis.kysely = db;
}