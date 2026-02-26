<script lang="ts">
	let {
		title,
		desc,
		subskill,
		expand,
		onclick
	}: {
		title: string;
		desc: string;
		subskill: string[];
		expand: boolean;
		onclick: () => void;
	} = $props();
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	role="button"
	tabindex="0"
	aria-expanded={expand}
	class="skill-tile group bg-cs-dark text-cs-light hover:bg-green-200 hover:text-cs-dark"
	class:expanded={expand}
	onclick={onclick}
	onkeydown={(e) => (e.key === 'Enter' || e.key === ' ') && onclick()}
>
	<div class="tile-body flex flex-col w-full">
		<span class="tile-title">{title}</span>

		{#if expand}
			<p class="mt-2 font-normal text-sm text-left leading-relaxed content-fade">
				{desc}
			</p>
			<div class="flex flex-row flex-wrap gap-1 mt-3 content-fade-delay">
				{#each subskill as skill}
					<span
						class="group-hover:bg-cs-dark group-hover:text-cs-light
						       bg-green-200 text-black font-normal text-xs
						       px-3 py-1 rounded transition-colors"
					>
						{skill}
					</span>
				{/each}
			</div>
		{/if}
	</div>
</div>

<style>
	.skill-tile {
		height: 40px;
		min-height: 40px;
		width: 100%;
		border-radius: 50px;
		padding: 0 1rem;
		overflow: hidden;
		cursor: pointer;
		user-select: none;
		display: flex;
		align-items: center;
		box-sizing: border-box;

		transition:
			height           0.42s cubic-bezier(0.4, 0, 0.2, 1),
			min-height       0.42s cubic-bezier(0.4, 0, 0.2, 1),
			border-radius    0.42s cubic-bezier(0.4, 0, 0.2, 1),
			padding          0.3s  ease,
			background-color 0.2s  ease,
			color            0.2s  ease;
	}

	.skill-tile.expanded {
		height: 260px;
		min-height: 260px;
		border-radius: 20px;
		padding: 1rem;
		align-items: flex-start;
	}

	.tile-title {
		font-weight: normal;
		flex-shrink: 0;
		transition: font-weight 0.3s ease;
	}
	.skill-tile.expanded .tile-title {
		font-weight: bold;
	}

	@keyframes fadein {
		from { opacity: 0; transform: translateY(5px); }
		to   { opacity: 1; transform: translateY(0);   }
	}
	.content-fade       { opacity: 0; animation: fadein 0.28s ease 0.18s forwards; }
	.content-fade-delay { opacity: 0; animation: fadein 0.28s ease 0.26s forwards; }
</style>