import { z } from "zod";

export const SubPoedditValidator = z.object({
  name: z.string().min(3).max(25).trim(),
});

export type CreateSubPoedditPayload = z.infer<typeof SubPoedditValidator>;
