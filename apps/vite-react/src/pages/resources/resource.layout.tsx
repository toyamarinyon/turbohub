import { useRef, useEffect, useState, useContext, ReactElement } from "react";
import { AllowLeft } from "@turbohub/icon";
import { ResourceContext } from "./resource.context";

export function ResourceLayoutComponent({
  children,
  Header,
  StickyHeader,
}: {
  children: React.ReactNode;
  Header: () => ReactElement;
  StickyHeader: () => ReactElement;
}) {
  const { onBackButtonClick } = useContext(ResourceContext);
  const [isHeaderIntersection, setIsHeaderIntersection] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (scrollContainerRef.current == null || headerRef.current == null) {
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsHeaderIntersection(entry.isIntersecting);
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
  }, [scrollContainerRef, headerRef]);

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
          <Header />
        </div>
        {children}
      </div>
      {!isHeaderIntersection && (
        <div className="absolute top-10 p-2 bg-white border-b border-t w-full">
          <StickyHeader />
        </div>
      )}
    </section>
  );
}
