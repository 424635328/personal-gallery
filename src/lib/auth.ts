import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import { db } from '@/lib/db'; // 您的 db 实例 (使用小写表名)
import { compare } from 'bcryptjs';
import { nanoid } from 'nanoid';

/**
 * NextAuth.js 的核心配置对象 (无适配器版本)
 * 这份代码在服务器端运行，负责处理认证逻辑。
 * 它本身不与任何前端 UI 组件（如 Sonner Toast）直接交互。
 */
export const authOptions: AuthOptions = {
  // 无需适配器
  // adapter: ...,

  session: {
    strategy: 'jwt',
  },
  
  pages: {
    signIn: '/login',
  },
  
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),

    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;
        try {
          // 使用您的小写 'users' 表
          const user = await db.selectFrom('users')
            .selectAll()
            .where('email', '=', credentials.email)
            .executeTakeFirst();
          if (!user || !user.password) return null;
          const isPasswordValid = await compare(credentials.password, user.password);
          if (!isPasswordValid) return null;
          return { id: user.id, email: user.email, name: user.name, image: user.image };
        } catch (error) {
            console.error("Authorize error:", error);
            return null;
        }
      }
    })
  ],

  // events 回调用于手动处理 OAuth 登录的数据库操作
  events: {
    async signIn({ user, account, profile }) {
      // 只处理 OAuth 提供商的登录
      if (account?.provider === 'github' && user.email) {
        try {
          // 检查用户是否已存在
          const existingUser = await db.selectFrom('users')
            .select('id')
            .where('email', '=', user.email)
            .executeTakeFirst();

          let userId: string;

          if (!existingUser) {
            // 用户不存在，创建新用户
            userId = nanoid();
            await db.insertInto('users').values({
              id: userId,
              name: user.name,
              email: user.email,
              image: user.image,
              emailVerified: new Date(),
            }).execute();
          } else {
            // 用户已存在，使用其现有 ID
            userId = existingUser.id;
          }

          // 检查账户关联是否已存在
          const existingAccount = await db.selectFrom('accounts')
            .select('id')
            .where('provider', '=', 'github')
            .where('providerAccountId', '=', account.providerAccountId)
            .executeTakeFirst();

          if (!existingAccount) {
            // 创建账户关联记录
            await db.insertInto('accounts').values({
              id: nanoid(),
              userId: userId,
              type: 'oauth',
              provider: 'github',
              providerAccountId: account.providerAccountId,
              access_token: account.access_token,
              refresh_token: account.refresh_token,
              expires_at: account.expires_at,
              scope: account.scope,
              id_token: account.id_token,
              token_type: account.token_type,
            }).execute();
          }
        } catch (error) {
          console.error("Error in signIn event for GitHub:", error);
          // 在生产环境中，您可能希望阻止登录如果数据库操作失败
          throw new Error("Could not process user sign in.");
        }
      }
    }
  },

  callbacks: {
    async jwt({ token, user, account, profile }) {
      // 登录时，确保 token 中有正确的数据库用户 ID
      if (user && user.email) {
          // 无论是哪种登录方式，我们都从数据库中查询一次以获取最新的 ID
          const dbUser = await db.selectFrom('users')
              .select('id')
              .where('email', '=', user.email)
              .executeTakeFirst();

          if (dbUser) {
              token.sub = dbUser.id;
          }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    }
  },
  
  secret: process.env.NEXTAUTH_SECRET,
};