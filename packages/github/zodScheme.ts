import z from "zod";

const notificationSubjectScheme = z.object({
  title: z.string(),
  type: z.string(),
  url: z.string(),
});
const notificationSubjectNullUrlScheme = notificationSubjectScheme.extend({
  url: z.string().nullable(),
});
const notificationRepositoryScheme = z.object({
  id: z.number(),
  name: z.string(),
  full_name: z.string(),
});
export const notificationScheme = z.object({
  id: z.string(),
  updated_at: z.string(),
  reason: z.string(), // todo: enum
  url: z.string(),
  subject: notificationSubjectScheme,
  repository: notificationRepositoryScheme,
});
export const subjectUrlNullableNotificationScheme = notificationScheme.extend({
  subject: notificationSubjectNullUrlScheme,
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
