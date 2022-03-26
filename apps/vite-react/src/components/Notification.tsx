import { useQuery } from "urql";
import z from "zod";
import { parseISO, add, sub } from "date-fns";
import { notification } from "@turbohub/github/zodScheme";
import { DiscussionSearchDocument, ResourceDocument } from "@turbohub/github";
interface ResourceProps {
  url: string;
  repositoryFullName: string;
  title: string;
  updatedAt: string;
  onClick: () => void;
}

function Resource({
  url,
  title,
  repositoryFullName,
  updatedAt,
  onClick,
}: ResourceProps) {
  useQuery({
    query: ResourceDocument,
    variables: {
      url: url.replace("https://api.github.com/repos", "https://github.com"),
    },
  });
  return (
    <div>
      <a
        className="cursor-pointer flex items-center space-x-4 font-bold py-2 px-1"
        onClick={() => onClick()}
      >
        <div className="flex flex-1 space-x-4">
          <h2 className="w-52">{repositoryFullName}</h2>
          <h1>{title}</h1>
        </div>
        <div className="flex">
          <p>{updatedAt}</p>
        </div>
      </a>
    </div>
  );
}

function Discussion({ notification, onClick }: Props) {
  const updatedAt = parseISO(notification.updated_at);
  const [result] = useQuery({
    query: DiscussionSearchDocument,
    variables: {
      query: `${notification.subject.title} in:title repo:${
        notification.repository.full_name
      } updated:>${sub(updatedAt, {
        minutes: 5,
      }).toISOString()} updated:<${add(updatedAt, {
        minutes: 5,
      }).toISOString()}`,
    },
  });
  const { data, fetching, error } = result;
  if (fetching) {
    return <div>...</div>;
  }
  if (
    data == null ||
    data.search.nodes == null ||
    data.search.nodes.length < 1
  ) {
    throw new Error("data is't exists");
  }
  const node = data.search.nodes[0];
  if (node?.__typename !== "Discussion") {
    throw new Error("Unexpected response");
  }

  return (
    <Resource
      url={node.url}
      title={notification.subject.title}
      repositoryFullName={notification.repository.full_name}
      updatedAt={notification.updated_at}
      onClick={onClick}
    />
  );
}

interface Props {
  notification: z.infer<typeof notification>;
  onClick: () => void;
}
export function Notification({ notification, onClick }: Props) {
  if (notification.subject.url == null) {
    return <Discussion notification={notification} onClick={onClick} />;
  }
  return (
    <Resource
      url={notification.subject.url}
      title={notification.subject.title}
      repositoryFullName={notification.repository.full_name}
      updatedAt={notification.updated_at}
      onClick={onClick}
    />
  );
}
