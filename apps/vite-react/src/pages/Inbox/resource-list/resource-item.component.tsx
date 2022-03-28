import { parseUrl } from "@turbohub/github";
import { useResource } from "../../../hooks/resource";

export interface ResourceItemProps {
  url: string;
  repositoryFullName: string;
  title: string;
  updatedAtString: string;
  onClick: (to: string) => void;
}
export function ResourceItem({
  url,
  title,
  repositoryFullName,
  updatedAtString,
  onClick,
}: ResourceItemProps) {
  useResource(url);
  const { owner, repository, type, number } = parseUrl(url);
  const to = `${owner}/${repository}/${type}/${number}`;
  return (
    <div>
      <a
        className="cursor-pointer flex items-center space-x-4 font-bold py-2 px-1"
        href={to}
        onClick={(e) => {
          e.preventDefault();
          onClick(to);
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
