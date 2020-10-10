<script lang="ts">
	import { onMount } from 'svelte';
	import { EXHIBITS } from "../../data";
	import ExhibitMini from "./_exhibitMini.svelte";



</script>

<div class="flex text-white justify-center flex-wrap">
	{#each EXHIBITS as exhibit}
		<ExhibitMini {exhibit}/>
  {/each}
</div>
