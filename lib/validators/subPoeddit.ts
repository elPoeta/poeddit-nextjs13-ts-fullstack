import { z } from "zod";

export const SubPoedditValidator = z.object({
  name: z.string().min(3).max(20).trim(),
});

export const SubPoeddiSubscriptiontValidator = z.object({
  subpoedditId: z.string(),
});

export type CreateSubPoedditPayload = z.infer<typeof SubPoedditValidator>;
export type SubscribeToSubpoedditValidator = z.infer<
  typeof SubPoeddiSubscriptiontValidator
>;
