import z from "zod";

const subjectScheme = z.object({
  title: z.string(),
  type: z.string(),
  url: z.string(),
});
const nullUrlSubjectScheme = subjectScheme.extend({
  url: z.string().nullable(),
});
const repositoryScheme = z.object({
  id: z.number(),
  name: z.string(),
  full_name: z.string(),
});

export const threadScheme = z.object({
  id: z.string(),
  updated_at: z.string(),
  reason: z.string(), // todo: enum
  url: z.string(),
  subject: subjectScheme,
  repository: repositoryScheme,
});

export const nullUrlThreadScheme = threadScheme.extend({
  subject: nullUrlSubjectScheme,
});

export const notificationScheme = threadScheme.array();

export const issue = z.object({
  id: z.number(),
  node_id: z.string(),
  number: z.number(),
  state: z.string(), // todo: enum
  title: z.string(),
  body: z.string().nullable(),
});
