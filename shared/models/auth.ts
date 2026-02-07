import { z } from "zod";

export const userSchema = z.object({
  id: z.number(),
  username: z.string(),
  displayName: z.string().nullable().optional(),
  email: z.string().nullable().optional(),
  phoneNumber: z.string().nullable().optional(),
  telegramHandle: z.string().nullable().optional(),
  punctualityPoints: z.number().optional(),
  block: z.string().nullable().optional(),
  createdAt: z.string().or(z.date()),
});

export type User = z.infer<typeof userSchema>;
