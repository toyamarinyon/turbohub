import { parseISO, add, sub } from "date-fns";
import { useQuery } from "urql";
import { DiscussionSearchDocument } from "@turbohub/github/typed-document-node";
import { ResourceItem } from "./resource-item.component";

interface DiscussionItemProps {
  repositoryFullName: string;
  title: string;
  updatedAtString: string;
}
export function DiscussionItem({
  title,
  repositoryFullName,
  updatedAtString,
}: DiscussionItemProps) {
  const updatedAt = parseISO(updatedAtString);
  const [result] = useQuery({
    query: DiscussionSearchDocument,
    variables: {
      query: `${title} in:title repo:${repositoryFullName} updated:>${sub(
        updatedAt,
        {
          minutes: 5,
        }
      ).toISOString()} updated:<${add(updatedAt, {
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
    <ResourceItem
      url={node.url}
      title={title}
      repositoryFullName={repositoryFullName}
      updatedAtString={updatedAtString}
    />
  );
}
