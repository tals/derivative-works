<script lang="ts">
  import { EXHIBITS } from "../../data";
  import { getFinalImage } from "../../url_utils";
</script>

<div class="flex text-white justify-center">
  {#each EXHIBITS as exhibit}
    <!-- we're using the non-standard `rel=prefetch` attribute to
				tell Sapper to load the data for the page as soon as
				the user hovers over the link or taps it, instead of
				waiting for the 'click' event -->
		<a rel=prefetch href="/exhibits/{exhibit.key}" class="m-4 ">
			<figure>
			 <img class="h-64 w-64 rounded" src={getFinalImage(exhibit)}>
			 <figcaption class="text-center italic font-serif">{exhibit.name}</figcaption>
		</figure>
	</a>
  {/each}
</div>
