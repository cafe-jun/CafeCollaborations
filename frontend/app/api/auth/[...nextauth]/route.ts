import axios from 'axios';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import KakaoProvider from 'next-auth/providers/kakao';
import NaverProvider from 'next-auth/providers/naver';
import { apiConfig } from './config/apiUrl';
import { OauthUserMapper } from '@/util/oauth.mapper';
import authService from '@/stores/fetch/auth/auth.service';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_SECRET_KEY || '',
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID || '',
      clientSecret: process.env.KAKAO_SECRET_KEY || '',
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID || '',
      clientSecret: process.env.NAVER_SECRET_KEY || '',
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      try {
        const validateResult = OauthUserMapper(account);
        const response = await authService.validateToken({
          provider: validateResult?.provider,
          token: validateResult?.token,
        });
        console.log('response ', response);
        if (response.accessToken) {
          user.accessToken = response.accessToken;
          user.refreshToken = response.refreshToken;
          console.log('user ', user);
          return true;
        }
        return false;
      } catch (error) {
        console.error('Error validating token:', error);
        return false;
      }
    },
    async jwt({ token, user, account }) {
      if (user?.accessToken) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }
      return token;
    },
    async session({ session, token }) {
      // 세션 객체에 액세스 토큰 추가
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
