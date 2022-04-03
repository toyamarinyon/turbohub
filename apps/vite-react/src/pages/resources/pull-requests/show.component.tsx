import { useContext } from "react";
import { PullRequestContext } from "./pull-request.context";
import { ResourceLayoutComponent } from "../resource.layout";

export function ShowPullRequest() {
  const { pullRequest } = useContext(PullRequestContext);
  return (
    <ResourceLayoutComponent
      Header={() => (
        <header>
          <h2>
            {pullRequest?.repository?.owner.login}/
            {pullRequest?.repository?.name}
          </h2>
          <h1 className="text-2xl">
            {pullRequest?.repository?.pullRequest?.title}
          </h1>
        </header>
      )}
      StickyHeader={() => (
        <header>
          <h2 className="text-sm">
            {pullRequest?.repository?.owner.login}/
            {pullRequest?.repository?.name}
          </h2>
          <h1 className="text-md">
            {pullRequest?.repository?.pullRequest?.title}
          </h1>
        </header>
      )}
    >
      <div className="flex-1 mt-2 relative divide-y">
        <article className="relative pl-16 py-4">
          <header className="mb-1">
            <h1>{pullRequest?.repository?.pullRequest?.author?.login}</h1>
          </header>
          <section className="text-sm">
            <div
              dangerouslySetInnerHTML={{
                __html: pullRequest?.repository?.pullRequest?.bodyHTML,
              }}
            ></div>
          </section>
          <div className="absolute left-6 top-5">
            <div className="rounded-full bg-indigo-200 w-8 h-8"></div>
          </div>
        </article>
        {pullRequest?.repository?.pullRequest?.comments.edges?.map((edge) => (
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
    </ResourceLayoutComponent>
  );
}
