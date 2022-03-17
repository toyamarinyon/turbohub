<script lang="ts">
  import { createClient, setClient, operationStore, query } from "@urql/svelte";
  import Nest from "./Nest.svelte";

  const client = createClient({
    url: "https://api.github.com/graphql",
    fetchOptions: () => {
      return {
        headers: {
          authorization: "bearer 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",
        },
      };
    },
  });
  setClient(client);

  const currentViewer = operationStore(
    `query  Viewer {
			viewer {
				login
			}
		}`
  );
  query(currentViewer);
</script>

<main>
	<h1>test</h1>
{#if $currentViewer.fetching}
  <p>Loading...</p>
{:else if $currentViewer.error}
  <p>Oh no... {$currentViewer.error.message}</p>
{:else}
  {$currentViewer.data.viewer.login}
  <Nest />
{/if}
<div class="w-20 h-20 bg-indigo-500">hello</div>

</main>
