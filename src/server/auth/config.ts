import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { type DefaultSession, type NextAuthConfig, type User } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

import { db } from "@/server/db";
// import {
//   accounts,
//   sessions,
//   users,
//   verificationTokens,
// } from "@/server/db/schema";
import Credentials from "next-auth/providers/credentials";
import { api } from "@/trpc/server";
import { signInSchema } from "@/validators";
import { eq } from "drizzle-orm";
import { users } from "../db/schema";
import bcrypt from "bcryptjs";
import { env } from "@/env";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials, request) => {
        const data = signInSchema.safeParse({
          email: credentials?.email,
          password: credentials?.password,
        });
        if (!data.success) {
          return null;
        }
        const { email, password } = data.data;
        // Check if the user exists
        const user = await db.query.users.findFirst({
          where: eq(users.email, email),
        });
        if (!user || !user.password) {
          return null;
        }
        // Check if the password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          return null;
        }
        // const session = await ctx.auth.createSession({
        //   userId: user.id,
        //   expires: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
        // });
        // return session;
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
        };
      },
    }),
    // DiscordProvider,
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
  // adapter: DrizzleAdapter(db, {
  //   usersTable: users,
  //   accountsTable: accounts,
  //   sessionsTable: sessions,
  //   verificationTokensTable: verificationTokens,
  // }),
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.user = user;
      }
      return token;
    },
    session: ({ session, token }) => {
      let res: any = session;
      if (token) {
        res = {
          ...session,
          user: token.user,
          userId: token.id,
        };
      }
      return res;
    },
  },
  jwt: {
    maxAge: 15 * 24 * 30 * 60, // 15 days
  },
  secret: env.AUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 15 * 24 * 30 * 60, // 15 days
  },
  pages: {
    signIn: "/auth/signin",
    newUser: "/auth/signup", // Will disable the new account creation screen when set
  },
} satisfies NextAuthConfig;
