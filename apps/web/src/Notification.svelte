<script lang="ts">
  import { onMount } from "svelte";
  import { env } from "../env";

  export let username: string;

  let events = [];
  onMount(async () => {
    fetch("https://api.github.com/notifications?all=true&per_page=2", {
      headers: {
        Accept: "application/vnd.github.v3+json",
        Authorization: `bearer ${env.GITHUB_PERSONAL_ACCESS_TOKEN}`,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        events = json;
        console.log(JSON.stringify(json, undefined, 2))
      });
  });
</script>

{#each events as event}
  {JSON.stringify(event)}
{/each}
