<script lang="ts">
import { query_selector_all } from "svelte/internal";

	import { EXHIBITS } from "../../data";
	import { getPreviewImage, getVideoUrl } from "../../url_utils";
	function onmouseover() {
		if (this.style.opacity == 0) {
			this.style.opacity = 1
			this.src = this.dataset.src
			this.oncanplay = () => this.play()
		}
	}
</script>

<style>
	.exhibit img, .exhibit video {
		width: 256px;
		height: 256px;
		background: white;
		margin: 1px;
	}
	.exhibit video {
		z-index: 1;
		top: 0px;
		opacity: 0;
	}
</style>
  
<div class="flex text-white justify-center flex-wrap">
  {#each EXHIBITS as exhibit}
    <!-- we're using the non-standard `rel=prefetch` attribute to
				tell Sapper to load the data for the page as soon as
				the user hovers over the link or taps it, instead of
				waiting for the 'click' event -->
		<a rel=prefetch href="/exhibits/{exhibit.key}" class="m-0 exhibit relative">
			<figure>
			 <img class="" src={getPreviewImage(exhibit)}>
			 <video 
			 	 muted autoplay
				 class="absolute"
				 on:mouseover={onmouseover}
				 data-src={getVideoUrl(exhibit)}>
			 </video>
		</figure>
	</a>
  {/each}
</div>
