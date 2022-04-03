import { useContext, ReactElement } from "react";
import { AllowLeft } from "@turbohub/icon";
import { ResourceContext } from "./resource.context";
import { useInView } from "react-intersection-observer";

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
  const { ref, inView } = useInView({
    rootMargin: "24px",
    threshold: 0.1,
  });

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
      <div className="bg-white h-full overflow-y-scroll">
        <div className="pl-16 mt-6" ref={ref}>
          <Header />
        </div>
        {children}
      </div>
      {!inView && (
        <div className="absolute top-10 p-2 bg-white border-b border-t w-full">
          <StickyHeader />
        </div>
      )}
    </section>
  );
}
