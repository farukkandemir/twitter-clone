import prisma from "@/utils/db";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { PrismaAdapter } from "@auth/prisma-adapter";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "you@example.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "*********",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const existingUser = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!existingUser) {
          throw new Error("No user found");
        }

        const passwordMatch = await bcrypt.compare(
          credentials.password,
          existingUser.password
        );

        if (passwordMatch) {
          const { password, ...user } = existingUser;
          return user;
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  debug: process.env.NODE_ENV !== "production",
};
