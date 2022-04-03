import {
  RepositoryGlanceFragment,
  ContentGlanceFragment,
} from "@turbohub/github/typed-document-node";
import { ResourceLayoutComponent } from "./resource.layout";

interface ResourceContentProps {
  repository: RepositoryGlanceFragment;
  content: ContentGlanceFragment & {
    title: string;
  };
  comments: ContentGlanceFragment[];
}
export function ResourceContent({
  repository,
  content,
  comments,
}: ResourceContentProps) {
  return (
    <ResourceLayoutComponent
      Header={() => (
        <header>
          <h2>
            {repository?.owner.login}/{repository?.name}
          </h2>
          <h1 className="text-2xl">{content?.title}</h1>
        </header>
      )}
      StickyHeader={() => (
        <header>
          <h2 className="text-sm">
            {repository?.owner.login}/{repository?.name}
          </h2>
          <h1 className="text-md">{content?.title}</h1>
        </header>
      )}
    >
      <div className="flex-1 mt-2 relative divide-y">
        <article className="relative pl-16 py-4">
          <header className="mb-1">
            <h1>{repository.owner.login}</h1>
          </header>
          <section className="text-sm">
            <div
              dangerouslySetInnerHTML={{
                __html: content?.bodyHTML,
              }}
            ></div>
          </section>
          <div className="absolute left-6 top-5">
            <div className="rounded-full bg-indigo-200 w-8 h-8"></div>
          </div>
        </article>
        {comments.map((comment) => (
          <article key={comment.id} className="relative pl-16 py-4">
            <header className="mb-1">
              <h1>{comment?.author?.login}</h1>
            </header>
            <section className="text-sm">
              <div
                dangerouslySetInnerHTML={{
                  __html: comment?.bodyHTML,
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
