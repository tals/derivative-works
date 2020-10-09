<script lang="ts">
  import { EXHIBITS } from "../../data";
  import { getPreviewImage } from "../../url_utils";
</script>

<style>
	.exhibit img {
		/* mix-blend-mode: multiply; */
		/* filter: brightness(1.08); */
		width: 256px;
		height: 256px;
		background: white;
		/* border: 1px solid #e2e8f0; */
		margin: 1px;
	}
</style>
<div class="flex text-white justify-center flex-wrap">
  {#each EXHIBITS as exhibit}
    <!-- we're using the non-standard `rel=prefetch` attribute to
				tell Sapper to load the data for the page as soon as
				the user hovers over the link or taps it, instead of
				waiting for the 'click' event -->
		<a rel=prefetch href="/exhibits/{exhibit.key}" class="m-0 exhibit">
			<figure>
			 <img class="" src={getPreviewImage(exhibit)}>
			 <figcaption class="text-center italic font-serif"></figcaption>
		</figure>
	</a>
  {/each}
</div>
