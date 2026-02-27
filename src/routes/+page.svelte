<script lang="ts">
	import { Fa } from "svelte-fa";
	import {
		faGithub,
		faLinkedin,
		faInstagram,
	} from "@fortawesome/free-brands-svg-icons";
	import TitleScroll from "$lib/components/TitleScroll.svelte";
	import { faChevronDown, faEnvelope } from "@fortawesome/free-solid-svg-icons";
	import moment from "moment";
    import Timeline from "$lib/components/Timeline.svelte";
    import SkillGrid from "$lib/components/SkillGrid.svelte";

	const skills = {
		"Web Development": {
			desc: "Web development is what I learned first, I've learned many languages and frameworks for the web.",
			data: [
				"Javascript",
				"Typescript",
				"React",
				"TailwindCSS",
				"PHP",
				"Laravel",
				"ASP.NET Core",
				"NodeJS",
				"MySQL",
				"MongoDB",
			],
		},
		"Mobile Development": {
			desc: "Mobile development was part of the competition so I studied it. And i've been mastering it, especially android.",
			data: [
				"Java",
				"Kotlin",
				"Jetpack Compose",
				"Flutter",
				"Kotlin Multiplatform",
			],
		},
		"Desktop Development": {
			desc: "Desktop development is also part of the competition, and is scope-specific in c# with the .net.",
			data: [
				"C#",
				".NET Core",
				".NET Framework",
				"Entity Framework",
				"Winform",
				"SQL Server",
			],
		},
		"Data Analyst": {
			desc: "Data analyst is a new thing I learned and I still have to learn more.",
			data: ["Python"],
		}
	};

	const age = Math.abs(moment("2006-09-19").diff(moment(), "year"));
	let scrollY = $state<number>(0);
</script>

<svelte:window bind:scrollY/>

<div class="font-sometype px-5 lg:px-40 h-screen cursor-default select-none">
	<div class="mt-5 flex flex-row justify-between">
		<div>PORTFOLIO</div>
		<div class="w-[100px] flex flex-row justify-around">
			<a
				href="https://github.com/edselford"
				target="_blank"
				rel="noopener noreferrer"
			>
				<Fa icon={faGithub} fw />
			</a>
			<a
				href="https://www.linkedin.com/in/edsel-mustapa"
				target="_blank"
				rel="noopener noreferrer"
			>
				<Fa icon={faLinkedin} fw />
			</a>
			<a
				href="https://instagram.com/edselpm"
				target="_blank"
				rel="noopener noreferrer"
			>
				<Fa icon={faInstagram} fw />
			</a>
		</div>
	</div>
	<div class="h-full flex flex-col justify-center pb-10">
		<TitleScroll />
	</div>
	<div class="sticky bottom-20">
		<div class="flex flex-col items-center gap-0">
			<span
				class="opacity-50 -mb-1.5 animate-cascade-1 transition-opacity duration-1000"
				class:!opacity-0={scrollY > 50}
			>
			<Fa icon={faChevronDown} scale={1.1}/>
			</span>
		</div>
	</div>
	<div class="flex flex-col md:flex-row justify-center items-center h-screen">
		<img
			width="500"
			height="500"
			src="/1000003669.jpg"
			alt=""
			class="h-[200px] w-[200px] aspect-square object-cover grayscale hover:grayscale-0 transition-all duration-300 rounded border border-cs-dark hover:border-white"
		/>
		<div class="mx-10 w-[300px] text-center md:text-left mt-5 md:mt-0">
			<div>Edsel Parama Mustapa</div>
			<div class="mb-5">
				{age} years old
			</div>
			<div>
				I'm a passionate software developer who quickly adapts to new
				challenges and environments.
			</div>
		</div>
	</div>

	<div class="flex flex-col justify-center items-center">
		<h1 class="text-center text-lg font-bold mb-10">Skills</h1>
		<!-- <div
			class="2xl:flex 2xl:flex-row 2xl:justify-center 2xl:flex-wrap gap-2 grid grid-cols-1 md:grid-cols-2 max-2xl:*:!w-full"
		>
			{#each Object.entries(skills) as [key, value], i}
				<SkillTile
					title={key}
					desc={value.desc}
					subskill={value.data}
					expand={index === i}
					onclick={() => (index = index === i ? null : i)}
				/>
			{/each}
		</div> -->

		<SkillGrid {skills}/>
	</div>

	<div class="flex flex-col justify-center items-center mt-52">
		<h1 class="text-center text-lg font-bold mb-10">Experience</h1>

		<div class="flex flex-col md:flex-row justify-between w-full 2xl:w-1/2">
			<span>2023-2024</span>
			<div>
				<div>Internship - CV. Sarana Elektrika Optima</div>
				<div>as Web Developer</div>
			</div>
		</div>
	</div>

	<div class="flex flex-col justify-center items-center mt-52">
		<h1 class="text-center text-lg font-bold mb-10">Achievements</h1>
		<Timeline/>
		<!-- <AchievementTimeline {achievements} /> -->
	</div>

	<div class="flex flex-col justify-center items-center mt-52" id="contact">
		<h1 class="text-center text-lg font-bold mb-10">Contact Me</h1>
		<div class="flex flex-col items-center gap-4 text-sm">
			<a
				href="mailto:edselmustapa@gmail.com"
				class="flex items-center gap-2 hover:text-green-200 transition-colors"
			>
				<Fa icon={faEnvelope} fw />
				edselmustapa@gmail.com
			</a>
			<div class="flex gap-6">
				<a
					href="https://github.com/edselford"
					target="_blank"
					rel="noopener noreferrer"
					class="flex items-center gap-2 hover:text-green-200 transition-colors"
				>
					<Fa icon={faGithub} fw /> GitHub
				</a>
				<a
					href="https://www.linkedin.com/in/edsel-mustapa"
					target="_blank"
					rel="noopener noreferrer"
					class="flex items-center gap-2 hover:text-green-200 transition-colors"
				>
					<Fa icon={faLinkedin} fw /> LinkedIn
				</a>
				<a
					href="https://instagram.com/edselpm"
					target="_blank"
					rel="noopener noreferrer"
					class="flex items-center gap-2 hover:text-green-200 transition-colors"
				>
					<Fa icon={faInstagram} fw /> Instagram
				</a>
			</div>
		</div>
		<div class="mt-16 mb-8 text-xs text-cs-light/30">
			&copy; {new Date().getFullYear()} Edsel Parama Mustapa
		</div>
	</div>
</div>

<style>
	.font-sometype {
		font-family: "Sometype Mono", monospace;
	}
</style>
