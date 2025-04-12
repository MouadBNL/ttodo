import { signInSchema, signUpSchema } from "@/validators";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { users } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { TRPCError } from "@trpc/server";

export const authRouter = createTRPCRouter({
  signIn: publicProcedure
    .input(signInSchema)
    .mutation(async ({ ctx, input }) => {
      const { email, password } = input;
      // Check if the user exists
      const user = await ctx.db.query.users.findFirst({
        where: eq(users.email, email),
      });
      if (!user || !user.password) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Invalid email or password",
        });
      }
      // Check if the password is correct
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Invalid email or password",
        });
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
    }),
  signOut: publicProcedure.mutation(async ({ ctx }) => {
    // await ctx.auth.signOut();
  }),
  signUp: publicProcedure
    .input(signUpSchema)
    .mutation(async ({ ctx, input }) => {
      const { email, password, name } = input;
      // Check if the user already exists
      const existingUser = await ctx.db.query.users.findFirst({
        where: eq(users.email, email),
      });

      if (existingUser) {
        throw new Error("User already exists");
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      await ctx.db.insert(users).values({
        name,
        email,
        password: hashedPassword,
      });
    }),
});
