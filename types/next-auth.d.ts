import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username?: String;
    } & DefaultSession["user"];
  }
}

declare module "next-auth" {
  interface User {
    username: String & DefaultUser;
  }
}
