import { z } from "zod";

export const electionSchema = z.object({
  description: z.string(),
  done: z.boolean().default(false),
});

export type Election = z.infer<typeof electionSchema>;
