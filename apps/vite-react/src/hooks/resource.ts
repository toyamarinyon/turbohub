import { useQuery } from "urql";
import {
  IssueDocument,
  PullRequestDocument,
} from "@turbohub/github/typed-document-node";

// type FetchType = "NOW" | "PREFETCH";
// export function useResource(url: string, fetchType: FetchType = "NOW") {
//   const [prefetch, setPrefetch] = useState(false);
//   useQuery({
//     query: ResourceDocument,
//     variables: {
//       url,
//     },
//   });
//   const { owner, repository, type, number } = parseUrl(url);
//   const { data: issueData, error: issueError } = useSWR(
//     () =>
//       type === "discussions"
//         ? null
//         : {
//             url: `https://api.github.com/repos/${owner}/${repository}/${type}/${number}`,
//           },
//     gitHubRestApiFetcher(issue)
//   );
//   function prefetch() {}
//   return {
//     issueData,
//     issueError,
//   };
// }

export interface ResourceIdentifier {
  owner: string;
  repository: string;
  number: number;
}

export function useIssue({ owner, repository, number }: ResourceIdentifier) {
  const [result] = useQuery({
    query: IssueDocument,
    variables: {
      owner,
      repository,
      number,
    },
  });
  return [result];
}

export function usePullRequest({
  owner,
  repository,
  number,
}: ResourceIdentifier) {
  const [result] = useQuery({
    query: PullRequestDocument,
    variables: {
      owner,
      repository,
      number,
    },
  });
  return [result];
}
