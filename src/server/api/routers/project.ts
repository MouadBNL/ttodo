import { projects } from "@/server/db/schema";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { db } from "@/server/db";
import { eq } from "drizzle-orm";
import { projectSchema } from "@/validators";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const projectRouter = createTRPCRouter({
  list: protectedProcedure.query(async ({ ctx }) => {
    const user = ctx.session.user;

    const list = await db.query.projects.findMany({
      where: eq(projects.userId, user.id),
    });

    return list;
  }),
  show: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const project = await db.query.projects.findFirst({
        where: eq(projects.id, input.id),
      });

      if (!project) {
        throw new TRPCError({
          code: "BAD_REQUEST",
        });
      }

      if (project.userId != ctx.session.user.id) {
        throw new TRPCError({
          code: "FORBIDDEN",
        });
      }

      return project;
    }),
  create: protectedProcedure
    .input(projectSchema)
    .mutation(async ({ ctx, input }) => {
      const user = ctx.session.user;

      const [project] = await db
        .insert(projects)
        .values({
          name: input.name,
          userId: user.id,
        })
        .returning();

      return project;
    }),
  update: protectedProcedure
    .input(projectSchema)
    .mutation(async ({ ctx, input }) => {
      if (!input.id) {
        throw new TRPCError({
          code: "BAD_REQUEST",
        });
      }
      const user = ctx.session.user;
      const existing = await db.query.projects.findFirst({
        where: eq(projects.id, input.id),
      });
      if (!existing || existing.userId != user.id) {
        throw new TRPCError({
          code: "BAD_REQUEST",
        });
      }

      if (existing.userId != ctx.session.user.id) {
        throw new TRPCError({
          code: "FORBIDDEN",
        });
      }

      await db
        .update(projects)
        .set({
          name: input.name,
        })
        .where(eq(projects.id, input.id));
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const existing = await db.query.projects.findFirst({
        where: eq(projects.id, input.id),
      });
      if (!existing) {
        throw new TRPCError({
          code: "BAD_REQUEST",
        });
      }

      if (existing.userId != ctx.session.user.id) {
        throw new TRPCError({
          code: "FORBIDDEN",
        });
      }

      await db.delete(projects).where(eq(projects.id, input.id));
    }),
});
