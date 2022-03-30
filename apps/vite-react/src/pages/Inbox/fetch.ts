import { parseISO, add, sub } from "date-fns";
import {
  notificationScheme,
  subjectUrlNullableNotificationScheme,
  githubGraphQLClient,
} from "@turbohub/github";
import { z } from "zod";

/**
 * List notifications REST API has a problem with the URL of the discussion being empty.
 * So if the URL of the discussion is null, we get it with the search query of GraphQL API and replace the response of REST API.
 * 
 * Also, check out {@link https://docs.github.com/en/rest/reference/activity#list-notifications-for-the-authenticated-user the reference of the list notifications} and
 * {@link https://docs.github.com/en/graphql/reference/queries#searchresultitemconnection the reference of the search query}
 */
export async function fetchNotification() {
  return fetch("https://api.github.com/notifications", {
    headers: {
      Accept: "application/vnd.github.v3+json",
      Authorization: `bearer ${
        import.meta.env.VITE_GITHUB_PERSONAL_ACCESS_TOKEN
      }`,
    },
  })
    .then((res) => res.json())
    .then((json) => {
      if (!Array.isArray(json)) {
        throw new Error("unexpected response");
      }
      return Promise.all(
        json.map<Promise<z.infer<typeof notificationScheme>>>(
          async (anyNotification: any) => {
            try {
              return notificationScheme.parse(anyNotification);
            } catch (e) {
              const subjectUrlNullableNotification =
                subjectUrlNullableNotificationScheme.parse(anyNotification);
              const updatedAt = parseISO(
                subjectUrlNullableNotification.updated_at
              );

              const data = await githubGraphQLClient(
                "https://api.github.com/graphql",
                {
                  headers: {
                    Authorization: `bearer ${
                      import.meta.env.VITE_GITHUB_PERSONAL_ACCESS_TOKEN
                    }`,
                  },
                }
              ).discussionSearch({
                query: `${
                  subjectUrlNullableNotification.subject.title
                } in:title repo:${
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
              return notificationScheme.parse(properlyJson);
            }
          }
        )
      );
    });
}
