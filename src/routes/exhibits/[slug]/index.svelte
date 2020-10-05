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
  import { getFinalImage, getLutUrl, getPaletteUrl } from "../../../url_utils";
  import * as dt from "../../../dataTypes";
  import clamp from "lodash/clamp";
  export let exhibit: dt.Collage;

  async function loadImg(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.crossOrigin = "anonymous";

      img.src = url;
    });
  }

  let loaded = false;
  async function loadLUT() {
    const img = await loadImg(getLutUrl(exhibit));
    lutCtx.drawImage(img, 0, 0);
    loaded = true;
  }

  let lutCanvas: HTMLCanvasElement;
  $: lutCtx = lutCanvas && lutCanvas.getContext("2d");
  let currentPiece = -1;
  $: if (lutCtx) {
    loadLUT();
  }

  function mouseMove(e: MouseEvent) {
    if (!loaded) {
      return;
    }
    const el = e.target as HTMLImageElement;
    const x = clamp((512 * e.offsetX) / el.width, 0, 512) | 0;
    const y = clamp((512 * e.offsetY) / el.height, 0, 512) | 0;

    const rgb = lutCtx.getImageData(x, y, 1, 1);
    currentPiece = rgb.data[0] - 1;
    console.log(currentPiece);
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
  <canvas bind:this={lutCanvas} width={512} height={512} hidden />
  <div class="flex flex-col items-center">
    <div class="font-medium italic text-4xl font-serif">"{exhibit.name}"</div>
    <img
      class="m-4 sm:h-72 md:h-96 lg:h-auto rounded"
      src={getFinalImage(exhibit)}
      on:mousemove={mouseMove} />
    <h1 class="text-3xl text-white p-4">Source Material</h1>
    <div class="flex flex-wrap  justify-center">
      {#each exhibit.palette as p, i}
        <div
          class:border-yellow-300={i === currentPiece}
          class="border-4 border-transparent h-16 w-16 hover:scale-150 transition-all transform duration-100 hover:z-10 rounded">
          <img class="rounded" src={getPaletteUrl(exhibit, i)} />
        </div>
      {/each}
    </div>
  </div>
</div>
