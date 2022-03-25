import useSWR from "swr";
import z from "zod";
import { ResourceDocument } from "@turbohub/github";
import { Provider, useQuery } from "urql";
import { client } from "../lib/urql";

interface FetcherParam {
  url: string;
  query?: Record<string, string>;
}

export function gitHubRestApiFetcher<
  T extends z.SomeZodObject | z.ZodArray<z.SomeZodObject>
>(scheme: T) {
  return async function ({ url, query }: FetcherParam): Promise<z.infer<T>> {
    const requestUrl = new URL(url);
    requestUrl.search = new URLSearchParams(query).toString();
    return fetch(requestUrl.toString(), {
      headers: {
        Accept: "application/vnd.github.v3+json",
        Authorization: `bearer ${
          import.meta.env.VITE_GITHUB_PERSONAL_ACCESS_TOKEN
        }`,
      },
    })
      .then((res) => res.json())
      .then((json) => scheme.parse(json));
  };
}

const scheme = z.object({
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

export function Notification(props: z.infer<typeof scheme>) {
  const [result] = useQuery({
    query: ResourceDocument,
    variables: {
      url: props.subject.url.replace(
        "https://api.github.com/repo",
        "https://github.com"
      ),
    },
  });
  return <div key={props.id}>{props.subject.title}</div>;
}

export function NotificationList() {
  const { data, error } = useSWR(
    {
      url: "https://api.github.com/notifications",
      query: {
        all: true,
        per_page: 2,
      },
    },
    gitHubRestApiFetcher(z.array(scheme))
  );
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  return (
    <Provider value={client}>
      <div>
        {data.map((notification) => (
          <Notification key={notification.id} {...notification} />
        ))}
      </div>
    </Provider>
  );
}
