<script lang="ts">
  import { createClient, setClient, operationStore, query } from "@urql/svelte";
  import Nest from "./Nest.svelte";
  import { env } from "../env";
  import Notification from "./Notification.svelte";

  const client = createClient({
    url: "https://api.github.com/graphql",
    fetchOptions: () => {
      return {
        headers: {
          authorization: `bearer ${env.GITHUB_PERSONAL_ACCESS_TOKEN}`,
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

<main class="container mx-auto">
  <h1 class="text-lg font-bold">TURBO HUB</h1>
  {#if $currentViewer.fetching}
    <p>Loading...</p>
  {:else if $currentViewer.error}
    <p>Oh no... {$currentViewer.error.message}</p>
  {:else}
    {$currentViewer.data.viewer.login}
    <!-- <Nest login={$currentViewer.data.viewer.login} /> -->
    <Notification username={$currentViewer.data.viewer.login} />
  {/if}
</main>
