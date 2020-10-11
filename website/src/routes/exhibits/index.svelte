<script lang="ts">
  import { onMount } from "svelte";
  import { EXHIBITS } from "../../data";
  import ExhibitMini from "./_exhibitMini.svelte";
  import ExhibitMiniAutoPlay from "./_exhibitMiniAutoPlay.svelte";

  let innerWidth: number;
  $: isMobile = innerWidth < 768;
</script>

<svelte:window bind:innerWidth />

<div class="flex text-white justify-center flex-wrap">
  {#if innerWidth}
    {#each EXHIBITS as exhibit}
      {#if isMobile}
        <ExhibitMiniAutoPlay {exhibit} />
      {:else}
        <ExhibitMini {exhibit} />
      {/if}
    {/each}
  {/if}
</div>
