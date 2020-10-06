<script lang="ts">
  import { loadImg } from "../io_utils";
  let canvas: HTMLCanvasElement;
  export let src: string;
  export let imageDataCtx: CanvasRenderingContext2D;
  export let width;
  export let height
  export let size = {width: 0, height: 0};
  $: ctx = canvas && canvas.getContext("2d");

  async function load(url: string) {
    imageDataCtx = undefined;
    const img = await loadImg(url);
    const { width, height} = img;
    canvas.width = width;
    canvas.height = height;
    size = { width, height }

    ctx.drawImage(img, 0, 0);
    imageDataCtx = ctx;
  }

  $: process.browser && load(src);
</script>

<canvas bind:this={canvas} width={width} height={height} hidden />
