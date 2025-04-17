import { z } from "zod";

export const projectSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(3).max(255),
});

export type IProject = z.infer<typeof projectSchema>;
