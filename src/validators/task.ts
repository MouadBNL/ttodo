import { z } from "zod";

export const taskSchema = z.object({
  id: z.number().optional(),
  userId: z.string(),
  task: z.string().min(1, { message: "Task is required" }),
  dueDate: z.date(),
  priority: z.enum(["low", "medium", "high"]).nullable(),
  completedAt: z.date().nullable(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});