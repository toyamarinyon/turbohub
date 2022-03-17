<script lang="ts">
  import { getClient, operationStore, query } from "@urql/svelte";
  import IssueDetail from "./components/IssueDetail.svelte";
  import IssueListItem from "./components/IssueListItem.svelte";
  import * as gql from "./graphql-operations";
  import { currentIssueId, navigationState, currentIssue } from "./stores";
  export let login: string;
  getClient();
  const searchQuery = operationStore(gql.IssuesDocument, {
    query: `author:${login}`
  });
  query(searchQuery);
	let key;
  $: nodes = $searchQuery.data?.search?.nodes;
  $: if (nodes != null) {
    const currentNode = nodes[0];
    if (currentNode.__typename === "Issue") {
      currentIssue.set(currentNode);
      currentIssueId.set(currentNode.id);
    } else if (currentNode.__typename === "PullRequest") {
      currentIssue.set(currentNode);
      currentIssueId.set(currentNode.id);
    } else {
      console.error("TODO: Error handling");
    }
  }
  function handleKeydown(event: KeyboardEvent) {
    if (nodes === null) {
      return;
    }
    key = event.key
    if (event.key === "j") {
      const currentIssueIndex = nodes.findIndex((node) => {
        if (node.__typename === "Issue") {
          return node.id === $currentIssueId;
        } else if (node.__typename === "PullRequest") {
          return node.id === $currentIssueId;
        }
        return false;
      });
      if (currentIssueIndex === -1) {
        console.error("TODO: Error handling");
      } else {
        if (currentIssueIndex < nodes.length - 1) {
          const nextIssue = nodes[currentIssueIndex + 1];
          if (nextIssue.__typename === "Issue") {
            currentIssue.set(nextIssue);
            currentIssueId.set(nextIssue.id);
          } else if (nextIssue.__typename === "PullRequest") {
            currentIssue.set(nextIssue);
            currentIssueId.set(nextIssue.id);
          } else {
            console.error("TODO: Error handling");
          }
        } else {
          console.log("TODO: Next page");
        }
      }
    } else if (event.key === "k") {
      const currentIssueIndex = nodes.findIndex((node) => {
        if (node.__typename === "Issue") {
          return node.id === $currentIssueId;
        } else if (node.__typename === "PullRequest") {
          return node.id === $currentIssueId;
        }
        return false;
      });
      if (currentIssueIndex === -1) {
        console.error("TODO: Error handling");
      } else {
        if (currentIssueIndex > 0) {
          const nextIssue = nodes[currentIssueIndex - 1];
          if (nextIssue.__typename === "Issue") {
            currentIssue.set(nextIssue);
            currentIssueId.set(nextIssue.id);
          } else if (nextIssue.__typename === "PullRequest") {
            currentIssue.set(nextIssue);
            currentIssueId.set(nextIssue.id);
          } else {
            console.error("TODO: Error handling");
          }
        } else {
          console.log("TODO: Next page");
        }
      }
    }
    if (event.key === "Enter") {
      navigationState.set("detail");
    } else if (event.key === "Escape") {
      navigationState.set("list");
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} />
{#if $searchQuery.fetching}
  <p>Loading...</p>
{:else if $searchQuery.error}
  <p>Oh no... {$searchQuery.error.message}</p>
{:else}
  <div class="relative">
    <section class="divide-y divide-dashed">
      {#each nodes as node}
        {#if node.__typename === "Issue" || node.__typename === "PullRequest"}
          <IssueListItem
            repositoryName={`${node.repository.owner.login}/${node.repository.name}`}
            title={node.title}
            currentIssue={node.id === $currentIssueId}
          />
        {/if}
      {/each}
    </section>
    {#if $navigationState === "detail"}
      <div class="absolute inset-0 bg-white">
        <IssueDetail
          title={$currentIssue.title}
          body={$currentIssue.bodyHTML}
        />
      </div>
    {/if}
  </div>
  <div style="text-align: center">
    {#if key}
      <kbd class="shadow w-12 h-12 bg-gray-100 flex items-center justify-center">{key === ' ' ? 'Space' : key}</kbd>
    {:else}
      <p>Focus this window and press any key</p>
    {/if}
  </div>
{/if}
