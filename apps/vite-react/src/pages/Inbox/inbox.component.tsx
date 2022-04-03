import { useContext } from "react";
import { InboxContext } from "./inbox.context";
import { ResourceItem } from "./resource-list/resource-item.component";
import { DiscussionItem } from "./resource-list/discussion.component";

export function InboxComponent() {
  const { notifications, onResourceClick: onNotificationClick } =
    useContext(InboxContext);
  return (
    <div className="relative">
      <section className="divide-y divide-dashed">
        {notifications.map((notification) =>
          notification.subject.url == null ? (
            <DiscussionItem
              key={notification.id}
              title={notification.subject.title}
              repositoryFullName={notification.repository.full_name}
              updatedAtString={notification.updated_at}
            />
          ) : (
            <ResourceItem
              threadId={parseInt(notification.id)}
              key={notification.id}
              url={notification.subject.url}
              title={notification.subject.title}
              repositoryFullName={notification.repository.full_name}
              updatedAtString={notification.updated_at}
            />
          )
        )}
      </section>
    </div>
  );
}
