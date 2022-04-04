import { parseUrl } from "@turbohub/github";
import { parseISO } from "date-fns";
import { useContext } from "react";
import { relativeTime } from "../../../lib/relativeTime";
import { InboxContext } from "../inbox.context";
export interface ResourceItemProps {
  threadId: number;
  url: string;
  repositoryFullName: string;
  title: string;
  updatedAtString: string;
}
export function ResourceItem({
  threadId,
  url,
  title,
  repositoryFullName,
  updatedAtString,
}: ResourceItemProps) {
  const { owner, repository, type, number } = parseUrl(url);
  const {
    onResourceClick: onNotificationClick,
    onResourceHover: onNotificationHover,
  } = useContext(InboxContext);
  const to = `/t/${threadId}`;
  const prefetchUrl = `${owner}/${repository}/${type}/${number}`;
  return (
    <div>
      <a
        className="cursor-pointer flex items-center space-x-4 font-bold py-2 px-1"
        href={to}
        onClick={(e) => {
          e.preventDefault();
          onNotificationClick(to);
        }}
        onMouseEnter={() => {
          onNotificationHover(prefetchUrl);
        }}
      >
        <div className="flex flex-1 space-x-4">
          <h2 className="w-52">{repositoryFullName}</h2>
          <h1>{title}</h1>
        </div>
        <div className="flex">
          <p>{relativeTime(parseISO(updatedAtString))}</p>
        </div>
      </a>
    </div>
  );
}
