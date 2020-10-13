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

  // there's some visibility shennanigans here:
  // loading a bunch of videos on mobile safari made it cry (it seems fine on dekstop chrome), so some hacks were needed.
  // We keep the video files without a src, and only load them when they are fully visible.
  // (TODO: maybe start preloading when they are partially visible? tried it and it was kinda buggy)
  // - if playback completed, the video is removed entirely and only the final image is shown.
  // - if we scrolled away while the video was playing, we unload the video tag's content.
  let showVideo = true;
  let videoEnded = false;
  let videoInited = false;

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
</script>

<svelte:window
  on:scroll={onScroll}
  bind:scrollX
  bind:scrollY
  bind:innerWidth
  bind:innerHeight />
<div
  class="relative w-full m-1 mx-2 h-96"
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
        out:fade|local
        poster={getFirstFrame(exhibit)}
        bind:this={videoElement}
        />
    {/if}

    <img class="absolute inset-0 z-0" src={getFinalImage(exhibit)}/>
  </a>
</div>
