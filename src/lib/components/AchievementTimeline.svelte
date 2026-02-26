<script lang="ts">
	import ImageCarousel from './ImageCarousel.svelte';

	interface Achievement {
		date: string;
		title: string;
		category: string;
		medal: string;
		images: string[];
	}

	let { achievements }: { achievements: Achievement[] } = $props();
</script>

<div class="w-full max-w-5xl mx-auto">
	{#each achievements as achievement, i}
		<div class="timeline-item {i !== achievements.length - 1 ? 'mb-20' : ''}">
			<!-- Timeline dot + line (visible md+) -->
			<div class="timeline-line">
				<div class="w-2.5 h-2.5 rounded-full bg-cs-light shrink-0"></div>
				{#if i !== achievements.length - 1}
					<div class="w-px flex-1 bg-cs-light/15"></div>
				{/if}
			</div>

			<!-- Date column -->
			<div class="timeline-date">
				{achievement.date}
			</div>

			<!-- Text info -->
			<div class="timeline-info">
				<div class="font-bold">{achievement.medal}</div>
				<div class="text-sm mt-1">{achievement.title}</div>
				<div class="text-cs-light/50 text-xs mt-1">{achievement.category}</div>
			</div>

			<!-- Carousel -->
			<div class="timeline-carousel">
				<ImageCarousel images={achievement.images} />
			</div>
		</div>
	{/each}
</div>

<style>
	.timeline-item {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.timeline-line {
		display: none;
	}

	.timeline-date {
		font-size: 0.8rem;
		opacity: 0.5;
	}

	/* Large screens: horizontal layout */
	@media (min-width: 1024px) {
		.timeline-item {
			flex-direction: row;
			align-items: flex-start;
			gap: 2rem;
		}

		.timeline-line {
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 1rem;
			flex-shrink: 0;
			min-height: 100%;
			padding-top: 0.35rem;
		}

		.timeline-date {
			width: 120px;
			flex-shrink: 0;
			font-size: 0.875rem;
			opacity: 0.5;
			padding-top: 0;
		}

		.timeline-info {
			flex: 1;
			min-width: 0;
		}

		.timeline-carousel {
			flex-shrink: 0;
		}
	}
</style>
