<script lang="ts">
  import { getFirstFrame, getLastFrame, getVideoUrl } from "../../url_utils";
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
		if (!videoElement.hasPlayed) { // hasplayed variable doesnt work.
      videoElement.hasPlayed = true
			videoElement.src = getVideoUrl(exhibit, autoplay)
      videoElement.oncanplay = () => {
        // Update poster to the last frame so that we can remove video when done.
        videoElement.poster = getLastFrame(exhibit)
        videoElement.play()
      }
      if (autoplay) {
        videoElement.onended = () => {
          // Delete video content when video is done to decrease memory usage.
          // https://stackoverflow.com/a/28060352/2175411
          videoElement.pause()
          videoElement.removeAttribute('src') // empty source
          videoElement.load()
        }
      }
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
    max-width: calc(50% - 4px);
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
      poster={getFirstFrame(exhibit)}
      bind:this={videoElement}
      on:mouseover={playVideo} />
  </figure>
</a>
