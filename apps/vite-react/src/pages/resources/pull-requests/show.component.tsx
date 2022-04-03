import { useContext } from "react";
import { PullRequestContext } from "./pull-request.context";
import { ResourceContent } from "../resource.content";

export function ShowPullRequest() {
  const { pullRequestQuery } = useContext(PullRequestContext);
  if (pullRequestQuery.repository == null) {
    throw new Error("null repository");
  }
  if (pullRequestQuery.repository?.pullRequest?.__typename !== "PullRequest") {
    throw new Error("not a pull request");
  }
  const { name, owner } = pullRequestQuery.repository;
  const { pullRequest } = pullRequestQuery.repository;
  
  return (
    <ResourceContent
      repository={{ name, owner }}
      content={{
        id: pullRequest.id,
        createdAt: pullRequest.createdAt,
        title: pullRequest.title,
        bodyHTML: pullRequest.bodyHTML,
        author: pullRequest.author,
      }}
      comments={
        pullRequest.comments.nodes?.map((comment) => {
          if (comment?.__typename !== "IssueComment") {
            throw new Error("not a pull request");
          }
          return {
            id: comment.id,
            createdAt: comment.createdAt,
            bodyHTML: comment.bodyHTML,
            author: comment.author,
          };
        }) || []
      }
    />
  );
}
