import { useContext } from "react";
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


