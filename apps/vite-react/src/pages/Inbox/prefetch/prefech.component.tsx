import { parseUrl } from "@turbohub/github";
import { ResourceIdentifier, useIssue } from "../../../hooks/resource";

export function Prefetch({ url }: { url: string }) {
  const { owner, repository, type, number } = parseUrl(url);
  if (type === "issues") {
    return (
      <PrefetchIssue
        owner={owner}
        repository={repository}
        number={parseInt(number)}
      />
    );
  } else {
    return <div></div>;
  }
}

function PrefetchIssue({ owner, repository, number }: ResourceIdentifier) {
  useIssue({ owner, repository, number });
  return <div></div>;
}
