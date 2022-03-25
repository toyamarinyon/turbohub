import { useQuery } from "urql";
import z from "zod";
import { notification } from "@turbohub/github/zodScheme";
import { ResourceDocument } from "@turbohub/github";

interface Props {
  notification: z.infer<typeof notification>;
  onClick: () => void;
}
export function Notification({ notification, onClick }: Props) {
  useQuery({
    query: ResourceDocument,
    variables: {
      url: notification.subject.url.replace(
        "https://api.github.com/repo",
        "https://github.com"
      ),
    },
  });
  return (
    <div>
      <a className="cursor-pointer" onClick={() => onClick()}>
        {notification.subject.title}
      </a>
    </div>
  );
}
