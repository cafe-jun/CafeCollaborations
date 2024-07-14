import axios from "axios";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import KakaoProvider from "next-auth/providers/kakao";
import NaverProvider from "next-auth/providers/naver";
import { apiConfig } from "./config/apiUrl";
import { OauthUserMapper } from "@/util/oauth.mapper";

console.log(process.env.NAVER_CLIENT_ID, process.env.NAVER_SECRET_KEY);

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_SECRET_KEY || "",
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID || "",
      clientSecret: process.env.KAKAO_SECRET_KEY || "",
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID || "",
      clientSecret: process.env.NAVER_SECRET_KEY || "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      try {
        const validateResult = OauthUserMapper(account);
        const response = await axios.post<{
          accessToken: string;
          refreshToken: string;
        }>(
          apiConfig.path.validateToken,
          { ...validateResult },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          user.accessToken = response.data.accessToken;
          user.refreshToken = response.data.refreshToken;
          return true;
        }
        return false;
      } catch (error) {
        console.error("Error validating token:", error);
        return false;
      }
    },
    async jwt({ token, user, account, profile, isNewUser }) {
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
