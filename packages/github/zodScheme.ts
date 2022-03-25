import z from "zod";

export const notification = z.object({
  id: z.string(),
  subject: z.object({
    title: z.string(),
    latest_comment_url: z.string(),
    type: z.string(),
    url: z.string(),
  }),
  repository: z.object({
    id: z.number(),
    name: z.string(),
    full_name: z.string(),
  }),
});
