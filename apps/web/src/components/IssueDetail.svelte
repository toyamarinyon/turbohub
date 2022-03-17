<script lang="ts">
  // export let repositoryName: string;
  export let title: string;
  export let body: string
</script>


<article>
  <h1 class="text-2xl">{title}</h1>
  <p>{@html body}</p>
</article>
