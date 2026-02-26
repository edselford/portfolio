<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import Lenis from '@studio-freight/lenis';
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();

	let lenis: Lenis | null = null;

	onMount(() => {
		lenis = new Lenis({
			duration: 1.2,
			smoothWheel: true,
			wheelMultiplier: 1,
			touchMultiplier: 2,
			easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
		});

		function raf(time: number) {
			lenis!.raf(time);
			requestAnimationFrame(raf);
		}

		requestAnimationFrame(raf);
	});

	onDestroy(() => {
		if (lenis) {
			lenis.destroy();
		}
	});
</script>

{@render children()}
