import {
  RepositoryGlanceFragment,
  ContentGlanceFragment,
} from "@turbohub/github/typed-document-node";
import { ResourceLayoutComponent } from "./resource.layout";
import { parseISO } from "date-fns";
import { relativeTime } from "../../lib/relativeTime";

interface ResourceContentProps {
  repository: RepositoryGlanceFragment;
  content: ContentGlanceFragment & {
    title: string;
    number: number;
  };
  comments: ContentGlanceFragment[];
}
export function ResourceContent({
  repository,
  content,
  comments,
}: ResourceContentProps) {
  const relativeTimeString = relativeTime(parseISO(content.createdAt));
  return (
    <ResourceLayoutComponent
      Header={() => (
        <header className="leading-none">
          <h2>
            {repository.owner.login}/{repository.name}
          </h2>
          <h1 className="text-2xl mb-2">
            {content?.title} #<span>{content.number}</span>
          </h1>
          <h3 className="text-sm space-x-1">
            <span className="rounded-full bg-green-500 text-white px-3 py-1">
              Open
            </span>
            <span>{content.author?.login}</span> created {relativeTimeString}
          </h3>
        </header>
      )}
      StickyHeader={() => (
        <header className="flex items-center space-x-2">
          <h3 className="text-sm">
            <span className="rounded-full bg-green-500 text-white px-3 py-1">
              Open
            </span>
          </h3>
          <div className="leading-none">
            <h2 className="text-sm">
              {repository.owner.login}/{repository.name}
            </h2>
            <h1 className="text-md">{content.title}</h1>
          </div>
        </header>
      )}
    >
      <div className="flex-1 mt-2 relative divide-y">
        <article className="relative pl-16 py-4">
          <header className="mb-1">
            <h1>{content?.author?.login}</h1>
          </header>
          <section className="text-sm">
            <div
              dangerouslySetInnerHTML={{
                __html: content.bodyHTML,
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
              <h1>{comment.author?.login}</h1>
            </header>
            <section className="text-sm">
              <div
                dangerouslySetInnerHTML={{
                  __html: comment.bodyHTML,
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
