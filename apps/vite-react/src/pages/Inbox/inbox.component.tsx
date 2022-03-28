import { useContext, useRef, useState } from "react";
import cn from "classnames";
import { InboxContext } from "./inbox.context";
import { ResourceItem } from "./resource-list/resource-item.component";
import { DiscussionItem } from "./resource-list/discussion.component";

export function InboxComponent() {
  const { notifications, onNotificationClick } = useContext(InboxContext);
  return (
    <div className="relative">
      <section className="divide-y divide-dashed">
        {notifications.map((notification) =>
          // <Notification
          //   key={notification.id}
          //   notification={notification}
          //   onClick={(linkTo) => onNotificationClick(linkTo)}
          // />
          notification.subject.url == null ? (
            <DiscussionItem
              key={notification.id}
              title={notification.subject.title}
              repositoryFullName={notification.repository.full_name}
              updatedAtString={notification.updated_at}
              onClick={onNotificationClick}
            />
          ) : (
            <ResourceItem
              key={notification.id}
              url={notification.subject.url}
              title={notification.subject.title}
              repositoryFullName={notification.repository.full_name}
              updatedAtString={notification.updated_at}
              onClick={onNotificationClick}
            />
          )
        )}
      </section>
    </div>
  );
}

export function LayoutComponent({ children }: { children: React.ReactNode }) {
  const { showDetail, Outlet } = useContext(InboxContext);
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
          <Outlet />
        </div>
      )}
    </div>
  );
}
