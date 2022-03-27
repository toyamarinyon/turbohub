import { useMatch } from "@tanstack/react-location";
import { issue } from "@turbohub/github/zodScheme";
import useSWR from "swr";
import { LocationGenerics } from "../../App";
import { gitHubRestApiFetcher } from "../../lib/fetcher";
export function ShowIssue() {
  const {
    params: { owner, repo, issueNumber },
  } = useMatch<LocationGenerics>();
  const { data, error } = useSWR(
    {
      url: `https://api.github.com/repos/${owner}/${repo}/issues/${issueNumber}`,
    },
    gitHubRestApiFetcher(issue)
  );
  if (data == null) {
    return <div>"loading"</div>;
  }
  return (
    <article className="bg-white h-full">
      <header>
        <h1 className="text-2xl">{data.title}</h1>
      </header>
      <section>
        <div>{data.body}</div>
      </section>
    </article>
  );
}
