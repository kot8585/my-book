import { addUser } from "@/service/user";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import KakaoProvider from "next-auth/providers/kakao";

export const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_ID || "",
      clientSecret: process.env.GOOGLE_OAUTH_SECRET || "",
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_OAUTH_ID || "",
      clientSecret: process.env.KAKAO_OAUTH_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn({ user: { id, email, name, image }, account }) {
      const type = account?.provider || "";
      addUser({ userId: id, email, name: name || "", image, type });
      return true;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
});

export { handler as GET, handler as POST };
