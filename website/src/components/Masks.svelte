<script lang="ts">
import ImageData from "./ImageData.svelte";


  export let maskUrl: string = "asd";
  export let width: number = 512;
  export let height: number = 512;

  let canvas: HTMLCanvasElement;
  let maskData: CanvasRenderingContext2D;
  $: ctx = canvas && canvas.getContext("2d");

  $: if (maskData && canvas) {
    // const mask = maskData.getImageData(0, 0, width, height);
    // ctx.putImageData()
  }
</script>

<ImageData src={maskUrl} bind:imageDataCtx={maskData} {width} {height} />
<canvas bind:this={canvas}/>