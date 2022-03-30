import { parseUrl } from "@turbohub/github";
import { useContext } from "react";
import { InboxContext } from "../inbox.context";
export interface ResourceItemProps {
  url: string;
  repositoryFullName: string;
  title: string;
  updatedAtString: string;
}
export function ResourceItem({
  url,
  title,
  repositoryFullName,
  updatedAtString,
}: ResourceItemProps) {
  const { owner, repository, type, number } = parseUrl(url);
  const { onResourceClick: onNotificationClick, onResourceHover: onNotificationHover } = useContext(InboxContext);
  const to = `${owner}/${repository}/${type}/${number}`;
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
          onNotificationHover(to);
        }}
      >
        <div className="flex flex-1 space-x-4">
          <h2 className="w-52">{repositoryFullName}</h2>
          <h1>{title}</h1>
        </div>
        <div className="flex">
          <p>{updatedAtString}</p>
        </div>
      </a>
    </div>
  );
}
