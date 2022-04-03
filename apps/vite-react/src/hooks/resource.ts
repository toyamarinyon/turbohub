import { useQuery } from "urql";
import {
  IssueDocument,
  PullRequestDocument,
} from "@turbohub/github/typed-document-node";

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
