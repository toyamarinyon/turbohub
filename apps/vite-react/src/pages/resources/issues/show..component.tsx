import { useMatch } from "@tanstack/react-location";
import { AllowLeft } from "@turbohub/icon";
import { useContext } from "react";
import { LocationGenerics } from "../../../App";
import { useIssue } from "../../../hooks/resource";
import { ResourceContext } from "../resource.context";

export function ShowIssue() {
  const {
    params: { owner, repo, issueNumber },
  } = useMatch<LocationGenerics>();
  const { onBackButtonClick } = useContext(ResourceContext);
  const [result] = useIssue({
    owner,
    repository: repo,
    number: parseInt(issueNumber),
  });
  if (result.fetching) {
    return <div>"loading"</div>;
  }
  return (
    <section className="divide-y">
      <nav className="py-2 px-2 flex items-center">
        <div className="w-16">
          <button
            type="button"
            className="w-4 h-6 flex items-center"
            onClick={() => onBackButtonClick()}
          >
            <AllowLeft />
          </button>
        </div>
      </nav>
      <div className="bg-white h-full">
        <div className="pl-16 mt-6">
          <header>
            <h2>
              {result.data?.repository?.owner.login}/
              {result.data?.repository?.name}
            </h2>
            <h1 className="text-2xl">
              {result.data?.repository?.issue?.title}
            </h1>
          </header>
        </div>
        <div className="flex-1 mt-2 relative divide-y">
          <article className="relative pl-16 py-4">
            <header className="mb-1">
              <h1>{result.data?.repository?.issue?.author?.login}</h1>
            </header>
            <section className="text-sm">
              <div
                dangerouslySetInnerHTML={{
                  __html: result.data?.repository?.issue?.bodyHTML,
                }}
              ></div>
            </section>
            <div className="absolute left-6 top-5">
              <div className="rounded-full bg-indigo-200 w-8 h-8"></div>
            </div>
          </article>
          {result.data?.repository?.issue?.comments.edges?.map((edge) => (
            <article key={edge?.cursor} className="relative pl-16 py-4">
              <header className="mb-1">
                <h1>{edge?.node?.author?.login}</h1>
              </header>
              <section className="text-sm">
                <div
                  dangerouslySetInnerHTML={{
                    __html: edge?.node?.bodyHTML,
                  }}
                ></div>
              </section>
              <div className="absolute left-6 top-5">
                <div className="rounded-full bg-indigo-200 w-8 h-8"></div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
