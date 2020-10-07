<script context="module" lang="ts">
  import { EXHIBITS } from "../../../data";
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
    currentPiece = idx % exhibit.palette.length;
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

<style>
  .grid-container {
    display: grid;
    grid-template-columns: 80px 1fr 80px;
    grid-template-rows: max-content max-content;
    gap: 0px 0px;
    grid-template-areas:
      "left main right"
      "left part right";
  }
  .left {
    grid-area: left;
  }
  .right {
    grid-area: right;
  }
  .main {
    grid-area: main;
  }
  .part {
    grid-area: part;
  }
</style>

<div class="text-white">
  <ImageData
    bind:imageDataCtx={lutCtx}
    bind:size={lutSize}
    src={urls.getLutUrl(exhibit)} />
  <div class="grid-container items-center items-center justify-items-center">
    <!-- Nav -->
    {#if prev}
      <a
        class="left material-icons md-48 p-4 opacity-75 duration-300 hover:opacity-100"
        href="/exhibits/{prev.key}">arrow_back</a>
    {/if}
    {#if next}
      <a
        class="right material-icons md-48 p-4 opacity-75 duration-300 hover:opacity-100"
        href="/exhibits/{next.key}">arrow_forward</a>
    {/if}
    <!-- Main image -->
    <div class="main">
    <div class="font-medium italic text-4xl font-serif">"{exhibit.name}"</div>
    <div class="relative m-4 h-128 w-128 bg-white">
      {#if playVideo}
        <video autoplay on:play={() => video.playbackRate = 6} class="absolute" out:fade|local on:ended={() => playVideo = false}  muted={true} bind:this={video} src={urls.getVideoUrl(exhibit)} autoplay={true}/>
      {:else}
      <img
        class="rounded h-full"
        in:fade
        src={urls.getFinalImage(exhibit)}
        on:mousemove={mouseMove}
        on:mouseout={mouseOut} />
      {#if currentPiece !== -1}
        <img
          in:fade={{duration: 200}}
          out:fade|local={{duration: 200}}
          class="rounded absolute inset-0 pointer-events-none"
          style="mix-blend-mode: multiply;"
          src={urls.getMaskCanvasSpace(exhibit, currentMask)}
          on:mousemove={mouseMove} />
      {/if}
    {/if}
    </div>
  </div>
    <!-- Source Images -->
    <div class="part flex flex-col items-center">
  <h1 class="text-3xl text-white p-4">Source Material</h1>
  <div class="flex flex-wrap  justify-center">
    {#each exhibit.palette as p, i}
        <div
          class:border-yellow-300={i === currentPiece}
          class="border-4 border-transparent h-48 w-48 hover:scale-150 transition-all transform duration-100 hover:z-10 rounded relative">
          <img class="rounded" src={urls.getPaletteUrl(exhibit, i)} />
          {#if i === currentPiece}
            <img
            class="rounded absolute inset-0"
            style="mix-blend-mode: multiply;"
            src={urls.getMaskPieceSpace(exhibit, currentMask)} />
          {/if}
        </div>
      {/each}
    </div>
  </div>
  </div>
</div>
