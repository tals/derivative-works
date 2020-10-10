<script lang="ts">
  import { getPreviewImage, getVideoUrl } from "../../url_utils";
  import * as dt from "../../dataTypes";
  export let exhibit: dt.Collage;


  let videoElement: HTMLVideoElement;

  let scrollX: number;
  let scrollY: number;
  let innerWidth: number;
  let innerHeight: number;
  let hasPlayed = false;
  $: autoplay = innerWidth < 768;

  function playVideo() {
		if (!hasPlayed) {
      hasPlayed = true
			videoElement.src = getVideoUrl(exhibit);
			videoElement.oncanplay = () => videoElement.play()
		}
  }

  function updateVisibility(innerHeight) {
    const rect = videoElement.getBoundingClientRect()
    const fullyVisible =
      rect.top >= 0 &&
      rect.bottom <= innerHeight;

    const fullyHidden =
      rect.bottom <= 0 ||
      rect.top >= innerHeight ;

    if (fullyVisible) {
      playVideo()
    }
    if  (fullyHidden) {
      if (exhibit.key == "dzdsdu") {
      }
      videoElement.src = null;
      hasPlayed = false;
    }
  }

  function onScroll() {
    updateVisibility(innerHeight);
  }

  $: if (autoplay) {
    updateVisibility(innerHeight);
  }
</script>

<style>
  .exhibit {
    /* width: 256px; */
    max-width: calc(50% - 4px);
    /* width: 100%; */
    margin: 1px;
  }

  /* Medium (md) */
  @media (min-width: 768px) {
    .exhibit {
      width: 256px;
    }
  }

  .exhibit img,
  .exhibit video {
    background: white;
    width: 100%;
  }
</style>

<svelte:window
  on:scroll={onScroll}
  bind:scrollX
  bind:scrollY
  bind:innerWidth
  bind:innerHeight />

<a rel="prefetch" href="/exhibits/{exhibit.key}" class="m-0 exhibit relative">
  <figure>
    <video
      muted
      autoplay
      playsinline
      webkit-playsinline
      poster={getPreviewImage(exhibit)}
      bind:this={videoElement}
      on:mouseover={playVideo} />
  </figure>
</a>
