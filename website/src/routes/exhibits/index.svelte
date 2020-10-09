<script lang="ts">
import { query_selector_all } from "svelte/internal";

	import { EXHIBITS } from "../../data";
	import { getPreviewImage, getVideoUrl } from "../../url_utils";
	function onmouseover() {
		if (!this.hasplayed) {
			this.src = this.dataset.src
			this.hasplayed = true
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
</style>
  
<div class="flex text-white justify-center flex-wrap">
  {#each EXHIBITS as exhibit}
   		 <!-- we're using the non-standard `rel=prefetch` attribute to
		tell Sapper to load the data for the page as soon as
		the user hovers over the link or taps it, instead of
		waiting for the 'click' event -->
		<a rel=prefetch href="/exhibits/{exhibit.key}" class="m-0 exhibit relative">
			<figure>
			 <video 
			 	 muted autoplay
				 poster={getPreviewImage(exhibit)}
				 on:mouseover={onmouseover}
				 data-src={getVideoUrl(exhibit)}>
			 </video>
		</figure>
	</a>
  {/each}
</div>
