import { taskSchema } from "@/validators";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { db } from "@/server/db";
import { tasks } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

export const taskRouter = createTRPCRouter({
  // add task
  addTask: protectedProcedure
    .input(taskSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const res = await db.insert(tasks).values({
        task: input.task,
        dueDate: input.dueDate,
        priority: input.priority,
        userId,
        completedAt: null,
      }); 
    }),
  // get tasks
  getTasks: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;
    const tasksList = await db.query.tasks.findMany({
      where: eq(tasks.userId, userId),
    });
    return tasksList;
  }),

  // update task
  updateTask: protectedProcedure
    .input(taskSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      if (!input.id) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Task ID is required",
        });
      }

      const existingTask = await db.query.tasks.findFirst({
        where: eq(tasks.id, input.id),
      });
      if (!existingTask) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Task not found",
        });
      }
      if (existingTask.userId !== userId) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You do not have permission to update this task",
        });
      }
      const res = await db
        .update(tasks)
        .set({
          task: input.task,
          dueDate: input.dueDate,
          priority: input.priority,
          completedAt: null,
        })
        .where(eq(tasks.userId, userId))
        .execute();
    }),
});
