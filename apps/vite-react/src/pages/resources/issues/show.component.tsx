import { useContext } from "react";
import { IssueContext } from "./issue.context";
import { ResourceLayoutComponent } from "../resource.layout";

export function ShowIssue() {
  const { issue } = useContext(IssueContext);
  return (
    <ResourceLayoutComponent
      Header={() => (
        <header>
          <h2>
            {issue?.repository?.owner.login}/{issue?.repository?.name}
          </h2>
          <h1 className="text-2xl">{issue?.repository?.issue?.title}</h1>
        </header>
      )}
      StickyHeader={() => (
        <header>
          <h2 className="text-sm">
            {issue?.repository?.owner.login}/{issue?.repository?.name}
          </h2>
          <h1 className="text-md">{issue?.repository?.issue?.title}</h1>
        </header>
      )}
    >
      <div className="flex-1 mt-2 relative divide-y">
        <article className="relative pl-16 py-4">
          <header className="mb-1">
            <h1>{issue?.repository?.issue?.author?.login}</h1>
          </header>
          <section className="text-sm">
            <div
              dangerouslySetInnerHTML={{
                __html: issue?.repository?.issue?.bodyHTML,
              }}
            ></div>
          </section>
          <div className="absolute left-6 top-5">
            <div className="rounded-full bg-indigo-200 w-8 h-8"></div>
          </div>
        </article>
        {issue?.repository?.issue?.comments.edges?.map((edge) => (
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
