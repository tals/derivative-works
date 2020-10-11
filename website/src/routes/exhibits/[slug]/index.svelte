<script context="module" lang="ts">
  import { EXHIBITS, PATCHES_PER_PALETTE } from "../../../data";
  export async function preload({ params }) {
    const exhibit = EXHIBITS.find((x) => x.key === params.slug);
    if (!exhibit) {
      this.error(404, "Not found");
    }
    const idx = EXHIBITS.indexOf(exhibit);
    const prev = idx - 1 >= 0 ? EXHIBITS[idx - 1] : null;
    const next = idx + 1 < EXHIBITS.length ? EXHIBITS[idx + 1] : null;
    return { exhibit, next, prev };
  }
</script>

<script lang="ts">
  import * as urls from "../../../url_utils";
  import * as dt from "../../../dataTypes";
  import clamp from "lodash/clamp";
  import ImageData from "../../../components/ImageData.svelte";
  import { fade } from "svelte/transition";

  export let exhibit: dt.Collage;
  export let prev: dt.Collage;
  export let next: dt.Collage;

  let currentPiece = -1;
  let currentMask = -1;
  let lutCtx: CanvasRenderingContext2D;
  let lutSize = { width: 0, height: 0 };

  function mouseOut() {
    console.log("mouse out!")
    currentMask = -1;
    currentPiece = -1;
  }

  function mouseMove(e: MouseEvent) {
    if (!lutCtx) {
      console.log("no ctx");
      return;
    }

    const el = e.target as HTMLImageElement;
    const x =
      clamp((lutSize.width * e.offsetX) / el.width, 0, lutSize.width) | 0;
    const y =
      clamp((lutSize.height * e.offsetY) / el.height, 0, lutSize.height) | 0;

    const rgb = lutCtx.getImageData(x, y, 1, 1);
    const idx = rgb.data[0] - 1;
    currentPiece = idx % exhibit.palette_keys.length;
    currentMask = idx;
    console.log(`resolved ${x}, ${y} to piece `, currentPiece, currentMask);
  }

  let video: HTMLVideoElement;
  let playVideo = true;

  // reset video when switching exhibits
  $: if (exhibit) {
    playVideo = true;
  }
</script>

<ImageData
  bind:imageDataCtx={lutCtx}
  bind:size={lutSize}
  src={urls.getLutUrl(exhibit)} />
<div class="flex justify-center">
  <div class="flex flex-col justify-center items-center">
  <!-- Nav -->
  <div class="flex justify-around w-96">
    <div>{#if prev}
    <a
    class="left material-icons md-dark md-48 p-4 opacity-75 duration-300 hover:opacity-100"
    href="/exhibits/{prev.key}">arrow_back</a>
    {/if}</div>
    <div>{#if next}
    <a
    class="right material-icons md-dark md-48 p-4 opacity-75 duration-300 hover:opacity-100"
    href="/exhibits/{next.key}">arrow_forward</a>
    {/if}</div>
  </div>
  <!-- Nav -->
  <!-- Main image -->
  <div class="relative h-96 w-96 bg-white">
    {#if playVideo}
      <video
        on:play={() => (video.playbackRate = 1)}
        class="absolute"
        out:fade|local
        on:ended={() => (playVideo = false)}
        muted={true}
        playsinline
        bind:this={video}
        src={urls.getVideoUrl(exhibit)}
        autoplay />
    {:else}
      <img
        class="rounded"
        style="touch-action: manipulation;"
        in:fade
        src={urls.getFinalImage(exhibit)}
        on:mousemove={mouseMove}
        on:mouseout={mouseOut}
        />
      {#if currentPiece !== -1}
        <img
          in:fade={{ duration: 200 }}
          class="rounded absolute inset-0 pointer-events-none"
          style="mix-blend-mode: multiply;"
          src={urls.getMaskCanvasSpace(exhibit, currentMask)}
           />
      {/if}
    {/if}
  </div>

  <!-- Attempt to preload images. Seems broken for some reason (cache headers?) -->
  {#each Array(exhibit.palette_keys.length * PATCHES_PER_PALETTE) as _, i}
    <img src={urls.getMaskPieceSpace(exhibit, i)} hidden />
    <img src={urls.getMaskCanvasSpace(exhibit, i)} hidden />

  {/each}
  <!-- Source Images -->
  <div class="parts flex flex-col items-center">
    <h1 class="text-2xl text-black p-4">Source Material</h1>
    <div class="flex flex-wrap  justify-center">
      {#each exhibit.palette_keys as p, i}
        <a
          href={urls.getArtbreederUrl(p)}
          target=_blank
          class:border-yellow-300={i === currentPiece}
          class="border-4 border-transparent h-48 w-48 hover:scale-105 transition-all transform duration-100 hover:z-10 rounded relative">
          <img class="rounded" src={urls.getPaletteUrl(exhibit, i)} />
          {#if i === currentPiece}
            <img
            class="rounded absolute inset-0"
            style="mix-blend-mode: multiply;"
            src={urls.getMaskPieceSpace(exhibit, currentMask)} />
          {/if}
        </a>
      {/each}
    </div>
  </div>
</div>
</div>