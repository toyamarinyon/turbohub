import { useContext, useRef, useState } from "react";
import cn from "classnames";
import { Notification } from "../../components/Notification";
import { InboxContext } from "./inbox.context";

export function InboxComponent() {
  const { notifications, onNotificationClick } = useContext(InboxContext);
  return (
    <div className="relative">
      <section className="divide-y divide-dashed">
        {notifications.map((notification) => (
          <Notification
            key={notification.id}
            notification={notification}
            onClick={(linkTo) => onNotificationClick(linkTo)}
          />
        ))}
      </section>
    </div>
  );
}

export function LayoutComponent({ children }: { children: React.ReactNode }) {
  const { showDetail, outlet } = useContext(InboxContext);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  return (
    <div
      className={cn("px-1 flex-1 relative", {
        "overflow-scroll": !showDetail,
        "overflow-hidden": showDetail,
      })}
      onScroll={() => {
        if (scrollContainerRef.current == null) {
          return;
        }
        setScrollY(scrollContainerRef.current.scrollTop);
      }}
      ref={scrollContainerRef}
    >
      {children}
      {showDetail && (
        <div
          className="absolute h-full bg-white w-full"
          style={{ top: `${scrollY}px` }}
        >
          {outlet}
        </div>
      )}
    </div>
  );
}
