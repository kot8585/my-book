import { addUser, getIdxByEmail } from "@/service/user";
import NextAuth, { NextAuthOptions } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import { JWT } from "next-auth/jwt/types";
import GoogleProvider from "next-auth/providers/google";
import KakaoProvider from "next-auth/providers/kakao";

export const handler: NextAuthOptions = NextAuth({
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
      if (!email) {
        console.error("email cannot be empty");
        return false;
      }
      const type = account?.provider || "";
      addUser({
        userId: id,
        email: email || "",
        name: name || "",
        image,
        type,
      });
      return true;
    },
    async session({ session, token }) {
      const user = session?.user;
      if (token && user) {
        session.user = {
          ...user,
          idx: token.idx,
        };
      }
      return session;
    },
    async jwt({ token, user }) {
      // TODO: email 무조건 있도록 하기
      const idx = await getIdxByEmail(token.email || "");
      token.idx = idx!;
      return token;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
});

export { handler as GET, handler as POST };
