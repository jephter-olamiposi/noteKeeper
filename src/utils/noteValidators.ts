import { z } from "zod";

export const noteSchema = z.object({
  title: z.string().max(150).optional(),
  contents: z.string().optional(),
});

export type NoteInput = z.infer<typeof noteSchema>;
