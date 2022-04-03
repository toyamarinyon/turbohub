import { db } from "@turbohub/dexie";
import z from "zod";
import { threadScheme, threadWithResourceUrl } from "../../index";

/**
 * List notifications REST API has a problem with the URL of the discussion being empty.
 * So if the URL of the discussion is null, we get it with the search query of GraphQL API and replace the response of REST API.
 *
 * Also, check out {@link https://docs.github.com/en/rest/reference/activity#list-notifications-for-the-authenticated-user the reference of the list notifications} and
 * {@link https://docs.github.com/en/graphql/reference/queries#searchresultitemconnection the reference of the search query}
 */
export async function fetchNotification({
  query,
  token,
}: {
  query?: Record<string, string>;
  token: string;
}) {
  const url = new URL("https://api.github.com/notifications");
  url.search = new URLSearchParams(query).toString();

  const result = await fetch(url.toString(), {
    headers: {
      Accept: "application/vnd.github.v3+json",
      Authorization: `bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((json) => {
      if (!Array.isArray(json)) {
        throw new Error("unexpected response");
      }
      return Promise.all(
        json.map<Promise<z.infer<typeof threadScheme>>>(threadWithResourceUrl)
      );
    });
  await db.threadResponseCaches.bulkPut(
    result.map(({ id, subject }) => ({
      threadId: parseInt(id),
      url: subject.url,
    }))
  );
  return result;
}
