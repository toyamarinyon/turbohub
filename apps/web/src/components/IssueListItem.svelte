<script lang="ts">
  export let repositoryName: string;
  export let title: string;
  export let currentIssue: boolean;
</script>

<article
  class="flex px-4 py-1 space-x-2 border-b-gray-100"
  class:shadow-md={currentIssue}
>
  <h2 class="w-56">{repositoryName}</h2>
  <h1>{title}</h1>
</article>
