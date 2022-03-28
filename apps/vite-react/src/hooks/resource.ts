import { useQuery } from "urql";
import useSWR from "swr";
import { gitHubRestApiFetcher } from "../lib/fetcher";
import { issue, ResourceDocument, parseUrl } from "@turbohub/github";

export function useResource(url: string) {
  useQuery({
    query: ResourceDocument,
    variables: {
      url,
    },
  });
  const { owner, repository, type, number } = parseUrl(url);
  const { data: issueData, error: issueError } = useSWR(
    {
      url: `https://api.github.com/repos/${owner}/${repository}/${type}/${number}`,
    },
    gitHubRestApiFetcher(issue)
  );
  return {
    issueData,
    issueError,
  };
}
