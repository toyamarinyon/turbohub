import { GraphQLClient } from "graphql-request";
import { getSdk } from "../graphql-request-sdk";

export function githubGraphQLClient(
  ...args: ConstructorParameters<typeof GraphQLClient>
) {
  const client = new GraphQLClient(...args);
  const sdk = getSdk(client);
  return sdk;
}