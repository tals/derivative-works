<script lang="ts">
  import { getFirstFrame, getFinalImage, getVideoUrl } from "../../url_utils";
  import * as dt from "../../dataTypes";
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  export let exhibit: dt.Collage;

  let videoElement: HTMLVideoElement;
  let containerElement: HTMLElement;

  let scrollX: number;
  let scrollY: number;
  let innerWidth: number;
  let innerHeight: number;

  let showVideo = true;
  let videoEnded = false;
  let videoInited;

  function log(...args) {
    console.log("[autoplay]", ...args);
  }

  function playVideo() {
    if (!videoInited) {
      videoInited = true;
      showVideo = true;
      videoElement.src = getVideoUrl(exhibit);
      videoElement.play();
      log("init video element")
      videoElement.oncanplay = () => {
        log("canplay fired")
        videoElement.play();
      };
      videoElement.onerror = () => {
        log("onerror fired")
      }
      videoElement.onended = () => {
        log("onended fired")
        if (!showVideo) {
          return;
        }

        showVideo = false;
        videoEnded = true;
      };
    }
  }

  function stopVideo() {
    if (!videoInited || !videoElement) {
      return;
    }

    // reset video element
    videoElement.pause();
    videoElement.src = null;
    videoElement.load();
    videoInited = false;

  }

  function updateVisibility(innerHeight) {
    const rect = containerElement.getBoundingClientRect();
    const fullyVisible = rect.top >= 0 && rect.bottom <= innerHeight;

    const fullyHidden = rect.bottom <= 0 || rect.top >= innerHeight;

    if (fullyVisible && !videoEnded) {
      console.log(`Playing video ${exhibit.key}`, rect)
      playVideo();
    }
    if (fullyHidden) {
      stopVideo();
    }
  }

  function onScroll() {
    updateVisibility(innerHeight);
  }

  onMount(() => {
    updateVisibility(innerHeight);
  });

  let clientWidth: number;
  $: console.log("clientWidth", clientWidth)
</script>

<style>
</style>

<svelte:window
  on:scroll={onScroll}
  bind:scrollX
  bind:scrollY
  bind:innerWidth
  bind:innerHeight />
<div
  class="relative w-full bg-red-400 m-1 h-96"
  bind:clientWidth
  style="height: {clientWidth}px;"
  bind:this={containerElement}>
  <a rel="prefetch" href="/exhibits/{exhibit.key}" class="m-px w-full">
    {#if showVideo}
      <video
        class="absolute inset-0 w-full z-10"
        muted

        playsinline
        webkit-playsinline
        out:fade
        poster={getFirstFrame(exhibit)}
        bind:this={videoElement}
        />
    {:else if videoEnded}
    {/if}

    <img class="absolute inset-0 z-0" src={getFinalImage(exhibit)}/>

  </a>
</div>