import { z } from "zod";

export const representativeSchema = z.object({
  name: z.string(),
  email: z.string(),
});

export type Representative = z.infer<typeof representativeSchema>;
