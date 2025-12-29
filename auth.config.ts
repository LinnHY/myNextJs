import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
export const authConfig = {
  pages: {
    // 该属性用于配置登录页面、登出页面、错误页面等的路径
    signIn: "/login",
  },
  callbacks: {
    // 该回调函数用于控制用户是否可以访问被Next代理的页面，在请求完成前调用
    // - auth: 用户认证信息，包含用户信息、认证状态等
    // - request: 请求对象，包含请求的URL路径等信息
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      if (isOnDashboard) {
        // 如果用户访问的是仪表盘页面
        if (isLoggedIn) return true; // 如果用户已登录，则允许访问仪表盘页面
        return false; // 如果用户未登录，则重定向到登录页面
      } else if (isLoggedIn) {
        // 如果用户已登录，则重定向到仪表盘页面
        return Response.redirect(new URL("/dashboard", nextUrl));
      }
      return true;
    },
  },
  providers: [Credentials({})], // 数组中包含所有支持的登录选项
} satisfies NextAuthConfig;
