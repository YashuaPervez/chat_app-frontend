import { z } from "zod";

export const messageSchema = z.object({
  id: z.number(),
  content: z.string(),
  toUserId: z.number(),
  fromUserId: z.number(),
  readAt: z.date().optional().nullable(),
});

export type Message = z.infer<typeof messageSchema>;
