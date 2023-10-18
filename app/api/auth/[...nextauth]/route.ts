import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prismadb from "@/lib/prismadb";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async jwt({ token, user, session, trigger }) {
      if (trigger === "update" && session?.username) {
        token.username = session.username;
        token.image = session.image;
        token.name = session.name;
      }
      if (user) {
        // fetch real user from the database based on user.id
        const profile = await prismadb.profile.findUnique({
          where: { userId: user.id },
          select: {
            username: true,
            name: true,
            image: true,
          },
        });
        token.isWithProfile = !!profile?.username;
        return {
          ...token,
          id: user.id,
          username: profile?.username,
          name: profile?.name,
          image: profile?.image,
        };
      }
      return token;
    },
    async session({ session, token, user }) {
      return {
        ...session,
        user: {
          ...session.user,
          image: (token.image as string) ?? session.user.image,
          id: token.sub,
          username: token.username,
        },
      };
    },
  },
  adapter: PrismaAdapter(prismadb),
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/feed?event=openModal",
    signOut: "/",
    error: "/feed?event=openModal&error=true",
    newUser: "/welcome",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
