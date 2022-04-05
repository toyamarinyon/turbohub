import { db } from "@turbohub/dexie";
import { threadWithResourceUrl } from "../thread";
import { parseUrl } from "../url";
export async function threadUrlFetcher({
  threadId,
  token,
}: {
  threadId: number;
  token: string;
}) {
  const threadCache = await db.threadResponseCaches.get(threadId);
  if (threadCache) {
    const parseResult = parseUrl(threadCache.url);
    return { url: threadCache.url, ...parseResult };
  }
  const url = new URL(`https://api.github.com/threads/${threadId}`);
  const result = await fetch(url.toString(), {
    headers: {
      Accept: "application/vnd.github.v3+json",
      Authorization: `bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then(async (json) => threadWithResourceUrl(json, token));
  await db.threadResponseCaches.put({
    threadId,
    url: result.subject.url,
  });
  const parseResult = parseUrl(result.subject.url);

  return { url: result.subject.url, ...parseResult };
}
