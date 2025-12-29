// 这是 Next.js 的中间件（Middleware）文件，用于 NextAuth 的认证代理。
// 它会在每个请求到达页面之前执行，进行身份验证和授权检查。
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

// 创建 NextAuth 实例并导出 auth 函数
// 这个函数会在每个匹配的请求上执行auth.config.ts 中定义的 authorized 回调
export default NextAuth(authConfig).auth;

// 正则表达式指定哪些路由需要经过这个中间件
export const config = {
  // https://nextjs.org/docs/app/api-reference/file-conventions/proxy#matcher
  // 匹配（会经过中间件）：
  // /dashboard
  // /dashboard/invoices
  // /login
  // /about
  // 不匹配（不会经过中间件）：
  // /api/*
  // /_next/static/*
  // /_next/image/*
  // *.png
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
