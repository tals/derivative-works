<script lang="ts">
  import { EXHIBITS } from "../../data";
  import { getFinalImage } from "../../utils";
</script>

<div>YO</div>
<div class="flex text-white">
  {#each Object.entries(EXHIBITS) as [id, exhibit]}
    <!-- we're using the non-standard `rel=prefetch` attribute to
				tell Sapper to load the data for the page as soon as
				the user hovers over the link or taps it, instead of
				waiting for the 'click' event -->
		<a href="/exhibits/{id}" class="m-4 ">
			<figure>
			 <img class="h-64 rounded" src={getFinalImage(exhibit)}>
			 <figcaption class="text-center italic font-serif">{exhibit.name}</figcaption>
		</figure>
	</a>
  {/each}
</div>
