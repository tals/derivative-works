<script context="module" lang="ts">
  import {EXHIBITS} from "../../../data";
	export async function preload({ params }) {
    if (!EXHIBITS[params.slug]) {
      this.error(404, "Not found");
    }
    return {exhibit: EXHIBITS[params.slug] }
	}
</script>

<script lang="ts">
  import {getFinalImage, getPaletteUrl} from "../../../utils"
  import * as dt from "../../../dataTypes";

  export let exhibit: dt.Collage;
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
  <div class="flex flex-col items-center">
    <div class="font-medium italic text-4xl font-serif">"{exhibit.name}"</div>
    <img class="m-4 sm:h-72 md:h-96 lg:h-auto rounded" src={getFinalImage(exhibit)} />
    <h1 class="text-3xl text-white p-4">Source Material</h1>
    <div class="flex flex-wrap  justify-center">
      {#each exhibit.palette as p, i}
        <img
          src={getPaletteUrl(exhibit, i)}
          class="h-32 w-32 p-2 hover:scale-150 transition-transform transform duration-75 hover:z-10" />
      {/each}
    </div>
  </div>
</div>
