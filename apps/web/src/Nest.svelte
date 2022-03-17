<script>
  import { getClient, operationStore, query } from "@urql/svelte";
  import IssueListItem from "./components/IssueListItem.svelte";
  import * as gql from "./graphql-operations";
  getClient();
  const searchQuery = operationStore(gql.IssuesDocument);
  query(searchQuery);

  $: nodes = $searchQuery.data?.search?.nodes;
</script>

{#if $searchQuery.fetching}
  <p>Loading...</p>
{:else if $searchQuery.error}
  <p>Oh no... {$searchQuery.error.message}</p>
{:else}
  <section class="divide-y divide-dashed">
    {#each nodes as node}
      <IssueListItem
        repositoryName={`${node.repository.owner.login}/${node.repository.name}`}
        title={node.title}
      />
    {/each}
  </section>
{/if}
