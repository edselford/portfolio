<script lang="ts">
	import SkillTile from './SkillTile.svelte';
	import { tick } from 'svelte';

	let { skills }: { skills: Record<string, { desc: string; data: string[] }> } = $props();

	let index: number | null = $state(null);
	const entries = $derived(Object.entries(skills));

	const EXPANDED_H = 260;
	const GAP = 8;
	const STACKED_H = Math.floor((EXPANDED_H - 2 * GAP) / 3);

	let cellEls: (HTMLElement | null)[] = $state([null, null, null, null]);

	// ── FLIP — smooth position animation ─────────────────────────────────────
	async function handleClick(i: number) {
		const isTablet =
			typeof window !== 'undefined' &&
			window.innerWidth >= 768 &&
			window.innerWidth < 1536;

		const prevIndex = index;
		const nextIndex = index === i ? null : i;

		if (!isTablet) {
			index = nextIndex;
			return;
		}

		// 1) Snapshot every cell's bounding rect BEFORE the state change
		const firstRects = cellEls.map((el) => el?.getBoundingClientRect() ?? null);

		// 2) Apply state change
		index = nextIndex;
		await tick(); // wait for DOM to update

		// 3) For each cell, compute the delta and animate ONLY the translate.
		//    Skip the tile that is expanding or collapsing — its own CSS height
		//    transition handles its animation. We only FLIP the tiles that are
		//    repositioning (stacked ↔ natural, or stacked slot changes).
		cellEls.forEach((el, idx) => {
			if (!el) return;
			const first = firstRects[idx];
			if (!first) return;

			// Skip the tile that just expanded (it animates height via CSS)
			if (idx === nextIndex) return;
			// Skip the tile that just collapsed (same reason)
			if (idx === prevIndex) return;

			const last = el.getBoundingClientRect();
			const dx = first.left - last.left;
			const dy = first.top  - last.top;

			if (Math.abs(dx) < 1 && Math.abs(dy) < 1) return;

			el.style.transition = 'none';
			el.style.transform  = `translate(${dx}px, ${dy}px)`;

			requestAnimationFrame(() => {
				requestAnimationFrame(() => {
					el.style.transition = 'transform 0.42s cubic-bezier(0.4, 0, 0.2, 1)';
					el.style.transform  = 'none';
				});
			});
		});
	}

	// ── Tablet grid placement ────────────────────────────────────────────────
	const natural: [number, number][] = [
		[1, 1], [2, 1], [1, 2], [2, 2],
	];

	function tabletStyle(i: number): string {
		if (index === null) {
			const [c, r] = natural[i];
			return `grid-column:${c}; grid-row:${r};`;
		}
		const expandCol = natural[index][0];
		const otherCol  = expandCol === 1 ? 2 : 1;
		if (i === index) {
			return `grid-column:${expandCol}; grid-row:1/4;`;
		}
		const others = [0, 1, 2, 3].filter((x) => x !== index);
		const row    = others.indexOf(i) + 1;
		return `grid-column:${otherCol}; grid-row:${row};`;
	}

	function cellClass(i: number): string {
		if (index === null) return 'tablet-cell';
		if (i === index)    return 'tablet-cell is-expanded';
		return 'tablet-cell is-stacked';
	}
</script>

<div class="skills-section flex flex-col items-center w-full">
	<!-- ══ MOBILE ═════════════════════════════════════════════════════ -->
	<div class="mobile-layout w-full flex flex-col gap-2">
		{#each entries as [key, value], i}
			<SkillTile
				title={key} desc={value.desc} subskill={value.data}
				expand={index === i} onclick={() => handleClick(i)}
			/>
		{/each}
	</div>

	<!-- ══ TABLET ═════════════════════════════════════════════════════ -->
	<div class="tablet-layout w-full max-w-2xl">
		{#each entries as [key, value], i}
			<div bind:this={cellEls[i]} class={cellClass(i)} style={tabletStyle(i)}>
				<SkillTile
					title={key} desc={value.desc} subskill={value.data}
					expand={index === i} onclick={() => handleClick(i)}
				/>
			</div>
		{/each}
	</div>

	<!-- ══ DESKTOP ════════════════════════════════════════════════════ -->
	<div class="desktop-layout w-full max-w-screen-2xl">
		{#each entries as [key, value], i}
			<div class="desktop-cell" style="flex:{index === i ? '2 1 0%' : '1 1 0%'};">
				<SkillTile
					title={key} desc={value.desc} subskill={value.data}
					expand={index === i} onclick={() => handleClick(i)}
				/>
			</div>
		{/each}
	</div>
</div>

<style>
	/* ── Visibility ─────────────────────────────────────────────────── */
	.mobile-layout  { display: flex; }
	.tablet-layout  { display: none; }
	.desktop-layout { display: none; }

	@media (min-width: 768px) {
		.mobile-layout { display: none; }
		.tablet-layout { display: grid; }
	}
	@media (min-width: 1536px) {
		.tablet-layout  { display: none; }
		.desktop-layout { display: flex; }
	}

	/* ── Tablet grid ─────────────────────────────────────────────────── */
	.tablet-layout {
		grid-template-columns: 1fr 1fr;
		grid-auto-rows: auto;
		gap: 0.5rem;
		align-items: start;
		overflow: visible;
	}

	.tablet-cell {
		min-width: 0;
	}

	/*
	 * Stacked tiles get an explicit pixel height so
	 * the CSS transition in .skill-tile can interpolate 40px → Npx → 40px.
	 */
	.tablet-cell.is-stacked :global(.skill-tile) {
		height: 81px;
		min-height: unset;
		border-radius: 16px;
		align-items: center;
		justify-content: center;
	}

	/* ── Desktop ─────────────────────────────────────────────────────── */
	.desktop-layout { flex-direction: row; align-items: flex-start; gap: 0.75rem; }
	.desktop-cell   { min-width: 0; overflow: hidden; transition: flex 0.45s cubic-bezier(0.4, 0, 0.2, 1); }

	:global(.skill-tile) { width: 100%; }
</style>