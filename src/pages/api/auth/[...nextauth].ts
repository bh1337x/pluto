import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import database from "@/lib/database";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET!,
  adapter: PrismaAdapter(database),
  providers: [
    GoogleProvider<GoogleProfile>({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
      profile: async (profile, _) => {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture.replace("s96-c", "s400-c"),
        };
      },
    }),
  ],
  events: {
    createUser: async ({ user }) => {
      console.log(`createUser: ${user.email}`);
    },
    signIn: async ({ user }) => {
      console.log(`signIn: ${user.email}`);
    },
    signOut: async ({ session }) => {
      const user = await database.user.findUnique({
        where: { id: (session as any).userId },
        select: { email: true },
      });
      console.log(`signOut: ${user?.email}`);
    },
  },
};

export default NextAuth(authOptions);
