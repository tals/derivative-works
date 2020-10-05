<script context="module" lang="ts">
  import {EXHIBITS} from "../../../data";
	export async function preload({ params }) {
		// the `slug` parameter is available because
		// this file is called [slug].svelte
		// const res = await this.fetch(`blog/${params.id}.json`);
		// const data = await res.json();

		// if (res.status === 200) {
		// 	return { post: data };
		// } else {
		// 	this.error(res.status, data.message);
    // }
    console.log("params are", params)
    return {exhibit: EXHIBITS[params.slug] }
	}
</script>

<script lang="ts">
  import {CDN_ROOT} from "../../../config"
  import {getFinalImage} from "../../../utils"
  import range from "lodash/range";
  import { fromPairs } from "lodash";

  export let exhibit: any;
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
          src="{CDN_ROOT}/{exhibit.path}/palette/palette_{i.toString().padStart(4, '0')}.png"
          class="h-32 w-32 p-2 hover:scale-150 transition-transform transform duration-75 hover:z-10" />
      {/each}
    </div>
  </div>
</div>
