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
	class="group bg-cs-dark text-cs-light hover:bg-green-200 hover:text-cs-dark transition-colors cursor-pointer"
	style="
		width: {expand ? '500px' : `${12 * title.length}px`};
		height: {expand ? `${subskill.length / 3 > 3 ? '300' : '' }px` : '40px'};
		border-radius: {expand ? '20px' : '50px'};
		font-weight: {expand ? 'bold' : 'normal'};
		padding: 0.5rem;
		margin: 0.5rem;
		padding-left: 1rem;
		padding-right: 1rem;
		text-align: center;
		overflow: hidden;
		transition: width 0.3s ease, height 0.3s ease, border-radius 0.3s ease, font-weight 0.3s ease, background-color 0.2s ease, color 0.2s ease;
	"
	onclick={onclick}
>
	<div class="flex flex-col">
		<span>{title}</span>
		<div class="my-2 font-normal text-start">
			{desc}
		</div>
		<div class="flex flex-row flex-wrap">
			{#each subskill as skill}
				<div
					class="group-hover:bg-cs-dark group-hover:text-cs-light bg-green-200 text-black transition-colors font-normal"
					style="
						padding: 0.3rem;
						margin: 0.1rem;
						padding-left: 1rem;
						padding-right: 1rem;
						text-align: center;
						border-radius: 5px;
					"
				>
					{skill}
				</div>
			{/each}
		</div>
	</div>
</div>
