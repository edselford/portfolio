<script lang="ts">
	import { onMount } from 'svelte';

	let { images }: { images: string[] } = $props();
	let current = $state(0);
	let direction = $state<'left' | 'right'>('right');
	let animating = $state(false);

	function prev() {
		if (animating) return;
		direction = 'left';
		animating = true;
		current = (current - 1 + images.length) % images.length;
	}

	function next() {
		if (animating) return;
		direction = 'right';
		animating = true;
		current = (current + 1) % images.length;
	}

	function goTo(i: number) {
		if (animating || i === current) return;
		direction = i > current ? 'right' : 'left';
		animating = true;
		current = i;
	}

	function onAnimEnd() {
		animating = false;
	}

	// Preload all images on mount
	onMount(() => {
		images.forEach((src) => {
			const img = new Image();
			img.src = src;
		});
	});
</script>

<div class="carousel-wrapper group">
	<div class="carousel-track">
		{#key current}
			<img
				src={images[current]}
				alt="Achievement photo {current + 1}"
				class="carousel-img {direction === 'right' ? 'slide-in-right' : 'slide-in-left'}"
				onanimationend={onAnimEnd}
			/>
		{/key}
	</div>

	{#if images.length > 1}
		<button
			onclick={prev}
			class="carousel-btn left-2"
			aria-label="Previous image"
		>
			&#8249;
		</button>
		<button
			onclick={next}
			class="carousel-btn right-2"
			aria-label="Next image"
		>
			&#8250;
		</button>

		<div class="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
			{#each images as _, i}
				<button
					onclick={() => goTo(i)}
					class="w-1.5 h-1.5 rounded-full transition-colors duration-200 cursor-pointer {current === i ? 'bg-white' : 'bg-white/40'}"
					aria-label="Go to image {i + 1}"
				></button>
			{/each}
		</div>
	{/if}
</div>

<style>
	.carousel-wrapper {
		position: relative;
		width: 100%;
		max-width: 400px;
		aspect-ratio: 4 / 3;
		overflow: hidden;
		border-radius: 0.25rem;
		filter: grayscale(100%);
		transition: filter 0.3s ease;
	}

	.carousel-wrapper:hover {
		filter: grayscale(0%);
	}

	.carousel-track {
		position: relative;
		width: 100%;
		height: 100%;
	}

	.carousel-img {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.carousel-btn {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		background: rgba(0, 0, 0, 0.5);
		color: white;
		width: 2rem;
		height: 2rem;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 9999px;
		border: none;
		opacity: 0;
		transition: opacity 0.2s ease, background 0.2s ease;
		cursor: pointer;
		z-index: 10;
	}

	.carousel-btn:hover {
		background: rgba(0, 0, 0, 0.8);
	}

	.carousel-wrapper:hover .carousel-btn {
		opacity: 1;
	}

	@keyframes slideInRight {
		from {
			transform: translateX(100%);
		}
		to {
			transform: translateX(0);
		}
	}

	@keyframes slideInLeft {
		from {
			transform: translateX(-100%);
		}
		to {
			transform: translateX(0);
		}
	}

	.slide-in-right {
		animation: slideInRight 0.35s ease forwards;
	}

	.slide-in-left {
		animation: slideInLeft 0.35s ease forwards;
	}
</style>
