import { parseUrl } from "@turbohub/github";
import {
  ResourceIdentifier,
  useIssue,
  usePullRequest,
} from "../../../hooks/resource";

export function Prefetch({ url }: { url: string }) {
  const { owner, repository, type, number } = parseUrl(url);
  console.log(url)
  if (type === "issues") {
    return (
      <PrefetchIssue owner={owner} repository={repository} number={number} />
    );
  } else if (type === "pulls") {
    return (
      <PrefetchPullRequest
        owner={owner}
        repository={repository}
        number={number}
      />
    );
  } else {
    return <div></div>;
  }
}

function PrefetchIssue({ owner, repository, number }: ResourceIdentifier) {
  useIssue({ owner, repository, number });
  return <div>issue</div>;
}

function PrefetchPullRequest({
  owner,
  repository,
  number,
}: ResourceIdentifier) {
  usePullRequest({ owner, repository, number });
  return <div></div>;
}
