import z from "zod";

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
