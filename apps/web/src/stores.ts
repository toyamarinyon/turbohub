import { writable } from "svelte/store";
import * as gql from "./graphql-operations";

export const currentIssueId = writable("");
export const currentIssue = writable<{
  title: string;
  bodyHTML: string;
}>();

type NavigationState = "list" | "detail";
export const navigationState = writable<NavigationState>("list");
