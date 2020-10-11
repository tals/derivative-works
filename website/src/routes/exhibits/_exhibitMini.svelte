<script lang="ts">
  import { getFirstFrame, getLastFrame, getVideoUrl } from "../../url_utils";
  import * as dt from "../../dataTypes";
  export let exhibit: dt.Collage;


  let videoElement: HTMLVideoElement;
  let videoInit = false;

  function playVideo() {
		if (!videoInit) {
      videoInit = true
			videoElement.src = getVideoUrl(exhibit)
      videoElement.oncanplay = () => {
        // Update poster to the last frame so that we can remove video when done.
        videoElement.poster = getLastFrame(exhibit)
        videoElement.play()
      }
		}
  }

</script>

<a rel="prefetch" href="/exhibits/{exhibit.key}" class="m-px exhibit relative w-96">
  <figure>
    <video
      class="w-full bg-white"
      muted
      autoplay
      playsinline
      webkit-playsinline
      poster={getFirstFrame(exhibit)}
      bind:this={videoElement}
      on:mouseover={playVideo} />
  </figure>
</a>
