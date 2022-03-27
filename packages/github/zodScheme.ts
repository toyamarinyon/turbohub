import z, { string } from "zod";

export const notification = z.object({
  id: z.string(),
  updated_at: z.string(),
  reason: z.string(), // todo: enum
  url: z.string(),
  subject: z.object({
    title: z.string(),
    type: z.string(),
    url: z.string().nullable(),
  }),
  repository: z.object({
    id: z.number(),
    name: z.string(),
    full_name: z.string(),
  }),
});

export const thread = z.object({
  id: z.string(),
  updated_at: z.string(),
  subject: z.object({
    title: z.string(),
    type: z.string(),
    url: z.string(),
  }),
});

export const issue = z.object({
  id: z.number(),
  node_id: z.string(),
  number: z.number(),
  state: z.string(), // todo: enum
  title: z.string(),
  body: z.string().nullable(),
});
