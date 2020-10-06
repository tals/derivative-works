<script lang="ts">
	import Nav from '../components/Nav.svelte';
	import Exhibits from "./exhibits/index.svelte"

	export let segment: string;
</script>

<style>
	main {
		box-sizing: border-box;
	}
</style>

<Nav {segment}/>
<div class="h-24"></div>
<main class="" >
	<slot>
	</slot>
</main>