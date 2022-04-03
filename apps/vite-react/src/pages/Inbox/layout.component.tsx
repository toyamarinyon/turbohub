import { useContext, useRef } from "react";
import cn from "classnames";
import { ScrollPositionContext } from "../../context/scrollPosition.context";
import { useEffect } from "react";

export function LayoutComponent({ children }: { children: React.ReactNode }) {
  const { inboxPosition, setInboxPosition } = useContext(ScrollPositionContext);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = inboxPosition;
    }
  }, []);
  return (
    <div
      className={cn("px-1 flex-1 relative overflow-scroll")}
      onScroll={() => {
        if (scrollContainerRef.current == null) {
          return;
        }
        setInboxPosition(scrollContainerRef.current.scrollTop);
      }}
      ref={scrollContainerRef}
    >
      {children}
    </div>
  );
}
