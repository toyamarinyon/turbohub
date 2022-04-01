import { useMatch } from "@tanstack/react-location";
import { AllowLeft } from "@turbohub/icon";
import { useEffect, useState } from "react";
import { useRef } from "react";
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
  const [isHeaderIntersecting, setIsHeaderIntersecting] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (
      scrollContainerRef.current == null ||
      headerRef.current == null ||
      result.fetching
    ) {
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsHeaderIntersecting(entry.isIntersecting);
      },
      {
        root: scrollContainerRef.current,
        rootMargin: "24px",
        threshold: 0.1,
      }
    );
    if (headerRef.current) {
      observer.observe(headerRef.current);
    }
    return () => {
      if (headerRef.current) {
        observer.unobserve(headerRef.current);
      }
    };
  }, [scrollContainerRef, headerRef, result]);
  if (result.fetching) {
    return <div>"loading"</div>;
  }
  return (
    <section className="flex flex-col w-full overflow-hidden h-full relative">
      <nav className="py-2 px-2 flex items-center border-b">
        <div className="w-16">
          <button
            type="button"
            className="w-4 h-6 flex items-center"
            onClick={() => onBackButtonClick()}
          >
            <AllowLeft />
          </button>
        </div>
        <ul>
          <li>
            <button>archive</button>
          </li>
        </ul>
      </nav>
      <div
        className="bg-white h-full overflow-y-scroll"
        ref={scrollContainerRef}
      >
        <div className="pl-16 mt-6" ref={headerRef}>
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
      {!isHeaderIntersecting && (
        <div className="absolute top-10 p-2 bg-white border-b border-t w-full">
          <header>
            <h2 className="text-sm">
              {result.data?.repository?.owner.login}/
              {result.data?.repository?.name}
            </h2>
            <h1 className="text-md">{result.data?.repository?.issue?.title}</h1>
          </header>
        </div>
      )}
    </section>
  );
}
