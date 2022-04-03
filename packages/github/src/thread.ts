import { db } from "@turbohub/dexie";
import { parseISO, add, sub } from "date-fns";
import { nullUrlThreadScheme, githubGraphQLClient } from "../index";
import { threadScheme } from "./zodScheme";

export async function threadWithResourceUrl(thread: any) {
  try {
    return threadScheme.parse(thread);
  } catch (e) {
    const subjectUrlNullableNotification = nullUrlThreadScheme.parse(thread);

    const threadCache = await db.threadResponseCaches.get(
      parseInt(subjectUrlNullableNotification.id)
    );
    if (threadCache) {
      threadCache.url;
      const properlyJson = {
        ...subjectUrlNullableNotification,
        subject: {
          ...subjectUrlNullableNotification.subject,
          url: threadCache.url,
        },
      };
      return threadScheme.parse(properlyJson);
    } else {
      const updatedAt = parseISO(subjectUrlNullableNotification.updated_at);

      const data = await githubGraphQLClient("https://api.github.com/graphql", {
        headers: {
          Authorization: `bearer ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`,
        },
      }).discussionSearch({
        query: `${subjectUrlNullableNotification.subject.title} in:title repo:${
          subjectUrlNullableNotification.repository.full_name
        } updated:>${sub(updatedAt, {
          minutes: 5,
        }).toISOString()} updated:<${add(updatedAt, {
          minutes: 5,
        }).toISOString()}`,
      });

      if (data.search.nodes == null || data.search.nodes.length < 1) {
        throw new Error("unexpected response");
      }
      const firstNode = data.search.nodes[0];
      if (firstNode?.__typename !== "Discussion") {
        throw new Error("unexpected response");
      }
      const properlyJson = {
        ...subjectUrlNullableNotification,
        subject: {
          ...subjectUrlNullableNotification.subject,
          url: firstNode.url,
        },
      };
      return threadScheme.parse(properlyJson);
    }
  }
}
