import { useContext } from "react";
import { IssueContext } from "./issue.context";
import { ResourceContent } from "../resource.content";

export function ShowIssue() {
  const { issueQuery } = useContext(IssueContext);
  if (issueQuery.repository == null) {
    throw new Error("null repository");
  }
  if (issueQuery.repository?.issue?.__typename !== "Issue") {
    throw new Error("not a issue");
  }
  const { name, owner } = issueQuery.repository;
  const { issue } = issueQuery.repository;
  return (
    <ResourceContent
      repository={{ name, owner }}
      content={{
        id: issue.id,
        number: issue.number,
        createdAt: issue.createdAt,
        title: issue.title,
        bodyHTML: issue.bodyHTML,
        author: issue.author,
      }}
      comments={
        issue.comments.nodes?.map((comment) => {
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
