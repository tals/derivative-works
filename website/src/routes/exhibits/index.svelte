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
  <!--
    HACK: the inenrWidth takes a tick to show up, so dont render until we know if we're mobile.
    If we're being SSR'd, just render it as is to avoid breaking `sapper export`
    -->
  {#if innerWidth || !process.env.browser}
    {#each EXHIBITS as exhibit}
      {#if isMobile}
        <ExhibitMiniAutoPlay {exhibit} />
      {:else}
        <ExhibitMini {exhibit} />
      {/if}
    {/each}
  {/if}
</div>
