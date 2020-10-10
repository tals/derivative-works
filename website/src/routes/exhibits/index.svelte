<script lang="ts">
	import { onMount } from 'svelte';
	import { EXHIBITS } from "../../data";
	import { getPreviewImage, getVideoUrl } from "../../url_utils";
	
	function onmouseover() {
		if (!this.hasplayed) {
			this.src = this.dataset.src
			this.hasplayed = true
			this.oncanplay = () => this.play()
		}
	}
	function inViewport (el: HTMLElement) {
		var rect = el.getBoundingClientRect()
		return (
			rect.top >= 0 &&
			rect.left >= 0 &&
			rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /* or $(window).height() */
			rect.right <= (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */
		);
	}
	onMount(() => {
		const videos:HTMLVideoElement[] = [...document.querySelectorAll('video')]
		window.onscroll = () => {			
			if (window.innerWidth < 768) {
				for (const vid of videos) {
					if (inViewport(vid)) { onmouseover.call(vid) }
				}
			}
		}
		window.onscroll()
	})

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


	.exhibit img, .exhibit video {
		background: white;
		width: 100%;
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
				playsinline webkit-playsinline
				poster={getPreviewImage(exhibit)}
				on:mouseover={onmouseover}
				data-src={getVideoUrl(exhibit)}>
			 </video>
		</figure>
	</a>
  {/each}
</div>
