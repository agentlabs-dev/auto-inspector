<script lang="ts">
	import type { Run } from '$lib/entities/run';
  
	import GraphNode from './GraphNode.svelte';

  export let run: Run | null;
</script>

<div class="bg-[url('/images/bg-dotted.png')] p-10 rounded-lg border border-gray-200 overflow-y-auto h-full shrink-0 max-w-[50%]">
  <div class="flex flex-col gap">
    {#if run}
      <span>{run.status}</span>
      {#each run.tasks as task}
        <GraphNode task={task} noTopEdge/>
      {/each}  
    {/if}
  </div>
</div>