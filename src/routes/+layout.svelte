<script lang="ts">
	import './layout.css';
	import SmoothScroll from '$lib/components/SmoothScroll.svelte';

	let { children } = $props();
</script>

<SmoothScroll>
	{@render children()}
</SmoothScroll>

