<script lang="ts">
  import * as dt from "../../../dataTypes";
  import {CDN_ROOT} from "../../../config"
  import range from "lodash/range";

  // for when there's no metadata about the palette pieces
  const paletteRange = (count: number) =>
    range(count).map((x) => ({
      name: null,
    }));

  const sample: dt.Collage = {
    name: "seed 3",
    path: "first",
    final_image: "canvas/canvas_step_0699.png",
    palette: paletteRange(32),
  };

  console.log(CDN_ROOT, "is")
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
    <div class="bg-white p-4 text-xl text-black w-full pb-4">Portrait collage thingy</div>
    <div class="font-medium italic text-4xl font-serif">"{sample.name}"</div>
    <img class="m-4 sm:h-72 md:h-96 lg:h-auto rounded" src="{CDN_ROOT}/{sample.path}/{sample.final_image}" />
    <h1 class="text-3xl text-white p-4">Source Material</h1>
    <div class="flex flex-wrap  justify-center">
      {#each sample.palette as p, i}
        <img
          src="{CDN_ROOT}/{sample.path}/palette/palette_{i.toString().padStart(4, '0')}.png"
          class="h-32 w-32 p-2 hover:scale-125 transition-transform transform duration-200" />
      {/each}
    </div>
  </div>
</div>
