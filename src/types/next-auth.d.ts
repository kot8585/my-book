import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: User;
  }
  interface User extends DefaultUser {
    idx: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends User {
    idx: number;
  }
}
