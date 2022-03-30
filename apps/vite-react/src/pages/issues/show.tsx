import { useMatch } from "@tanstack/react-location";
import { LocationGenerics } from "../../App";
import { useIssue } from "../../hooks/resource";
export function ShowIssue() {
  const {
    params: { owner, repo, issueNumber },
  } = useMatch<LocationGenerics>();
  const [result] = useIssue({
    owner,
    repository: repo,
    number: parseInt(issueNumber),
  });
  if (result.fetching) {
    return <div>"loading"</div>;
  }
  return (
    <article className="bg-white h-full">
      <header>
        <h1 className="text-2xl">{result.data?.repository?.issue?.title}</h1>
      </header>
      <section>
        <div
          dangerouslySetInnerHTML={{
            __html: result.data?.repository?.issue?.bodyHTML,
          }}
        ></div>
      </section>
    </article>
  );
}
