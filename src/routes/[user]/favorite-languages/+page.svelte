<script lang="ts">
	import { user, loading } from '$lib/stores';
	import type { Repo, Language, LanguageColor } from '$lib/models';
	import { onMount } from 'svelte';

	let mainElement: HTMLElement;
	// let languagesSorted: [string, number][] = [];

	let test: any = {};

	const fetchRepos = async () => {
		const repos: Repo[] = await (
			await fetch(`https://api.github.com/users/${$user.login}/repos`)
		).json();
		return repos;
	};

	const fetchLanguageColors = async () => {
		const languageColors: LanguageColor = await (
			await fetch(
				`https://raw.githubusercontent.com/ozh/github-colors/master/colors.json`
			)
		).json();
		return languageColors;
	};

	const fetchLanguages = async () => {
		const repos = await fetchRepos();
		const languageColors = await fetchLanguageColors();

		const languagesTotal: Language = {};

		// loop over repos
		for (const repo of repos) {
			// fetch languages per repo
			const languagesPerRepo: Language = await (await fetch(repo.languages_url)).json();

			// for each language in repo, add to allLanguages
			for (const languagePerRepo in languagesPerRepo) {
				if (languagesTotal[languagePerRepo]) {
					languagesTotal[languagePerRepo] += languagesPerRepo[languagePerRepo];
				} else {
					languagesTotal[languagePerRepo] = languagesPerRepo[languagePerRepo];
				}
			}
		}

		const fullDetails: any = {};
		for (const language in languagesTotal) {
			fullDetails[language] = {
				amount: languagesTotal[language],
				color: languageColors[language] ? languageColors[language].color : '#fff'
			};
		}

		return fullDetails;
	};

	const displayData = async () => {
		if (!$user) return;
		test = await fetchLanguages();
		// languagesSorted = await fetchLanguages();
		loading.set(false);
	};

	function scrollToBottom(pos: number, time: number) {
		let currentPos = window.pageYOffset;
		let start: number | null = null;

		// dit heb ik zelf bedacht ( ͡° ͜ʖ ͡°)
		const easeInOutQuad = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

		if (currentPos !== pos) {
			function step(timestamp: number) {
				if (!start) start = timestamp;
				let progress = timestamp - start;
				let easeProgress = easeInOutQuad(Math.min(progress / time, 1));
				let newPos = currentPos + (pos - currentPos) * easeProgress;
				mainElement.scrollTo(0, newPos);
				if (progress < time) {
					window.requestAnimationFrame(step);
				}
			}
			window.requestAnimationFrame(step);
		}
	}

	onMount(() => {
		mainElement.scrollTop = 0;
		setTimeout(() => {
			scrollToBottom(mainElement.scrollHeight, 5000);
		}, 500);
	});

	// uitcommenten als ik niet meer geblokkeerd ben :(
	loading.set(true);
	$: $user, displayData();
</script>

<main bind:this={mainElement}>
	<h1>{$user ? $user.login + '\'s' : 'Your'} Favorite Languages</h1>
	<ul>
		<!-- {#each languagesSorted as [language, amount]}
			<li>
				{#if amount > 100000}
					<span>{language}</span>
				{/if}
				<div style="height:{amount / 50}px" />
				<span>{language}</span>
			</li>
		{/each} -->

		{#each Object.entries(test) as [language]}
			<li>
				{#if test[language].amount > 10000}
					<span>{language}</span>
				{/if}
				<div style="height:{test[language].amount / 50}px; background-color:{test[language].color};" />
				<span>{language}</span>
			</li>
		{/each}
	</ul>
</main>

<style>
	main {
		height: calc(100vh - 5em);
		display: grid;
		grid-template-rows: min-content 1fr;
		overflow-y: auto;
	}

	main h1 {
		text-align: center;
	}

	main ul {
		display: flex;
		justify-content: center;
		align-items: end;
		gap: 2em;
	}

	main ul li {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	main ul li div {
		width: 3em;
		background-color: var(--secondary-bg);
		border: solid 1px var(--primary-text);
	}
</style>
