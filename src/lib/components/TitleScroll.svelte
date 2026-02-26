<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	let y = $state(0);

	function handleScroll() {
		const scrollY = window.scrollY;
		// Transform: [0, 1000] -> [0, 400] (same as useTransform(scrollY, [0, 1000], [0, 1000 * 0.4]))
		const clamped = Math.min(Math.max(scrollY, 0), 1000);
		y = clamped * 0.4;
	}

	onMount(() => {
		window.addEventListener('scroll', handleScroll, { passive: true });
		handleScroll();
	});

	onDestroy(() => {
		if (typeof window !== 'undefined') {
			window.removeEventListener('scroll', handleScroll);
		}
	});
</script>

<div
	class="font-major font-normal lg:text-[200px] sm:text-[100px] text-[50px] text-center"
	style="transform: translateY({y}px)"
>
	{#each "EDsel".split('') as i}
		<span class="inline-block hover:scale-105 duration-500">{i}</span>
	{/each}
</div>

<style>
	.font-major {
		font-family: 'Major Mono Display', monospace;
	}
</style>
