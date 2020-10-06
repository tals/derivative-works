<script context="module" lang="ts">
  import { EXHIBITS } from "../../../data";
  export async function preload({ params }) {
    if (!EXHIBITS[params.slug]) {
      this.error(404, "Not found");
    }
    return { exhibit: EXHIBITS[params.slug] };
  }
</script>

<script lang="ts">
  import * as urls from "../../../url_utils";
  import { loadImg } from "../../../io_utils";
  import * as dt from "../../../dataTypes";
  import clamp from "lodash/clamp";
  import ImageData from "../../../components/ImageData.svelte";
  export let exhibit: dt.Collage;

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
</script>

<style>
  main {
    text-align: center;
    /*max-width: 240px;*/
    margin: 0 auto;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

<div class="text-white">
  <ImageData
    bind:imageDataCtx={lutCtx}
    bind:size={lutSize}
    src={urls.getLutUrl(exhibit)} />
  <div class="flex flex-col items-center">
    <div class="font-medium italic text-4xl font-serif">"{exhibit.name}"</div>
    <div class="relative m-4 xs:h-72 md:h-96 lg:h-128 ">
      <img
        class="rounded h-full "
        src={urls.getFinalImage(exhibit)}
        on:mousemove={mouseMove}
        on:mouseout={mouseOut} />
      {#if currentPiece !== -1}
        <img
          class="rounded absolute inset-0 pointer-events-none"
          style="mix-blend-mode: multiply;"
          src={urls.getMaskCanvasSpace(exhibit, currentMask)}
          on:mousemove={mouseMove} />
      {/if}
    </div>
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
