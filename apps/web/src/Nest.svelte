<script>
  import { getClient,operationStore, query } from "@urql/svelte";
  getClient()
  const searchQuery = operationStore(
    `query {
      search(query: "author:toyamarinyon", type:ISSUE, first: 10) { 
        nodes {
          ... on PullRequest {
            id
            title
            bodyText
          }
          ... on Issue {
            id
            title
            bodyText
          }
        }
      }
    }`
  );
  query(searchQuery);
</script>

{#if $searchQuery.fetching}
<p>Loading...</p>
{:else if $searchQuery.error}
<p>Oh no... {$searchQuery.error.message}</p>
{:else}
<ul>
  {#each $searchQuery.data.search.nodes as node}
    <li>{node.title}</li>
  {/each}
</ul>
{/if}
