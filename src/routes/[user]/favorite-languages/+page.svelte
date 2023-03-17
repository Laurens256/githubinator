<script lang="ts">
	import { user, loading } from '$lib/stores';
	import type { Repo, Language, LanguageColor } from '$lib/models';
	import { onMount } from 'svelte';

	let mainElement: HTMLElement;
	let languagesSorted: [string, number][] = [];

	const fetchRepos = async () => {
		const repos: Repo[] = await (
			await fetch(`https://api.github.com/users/${$user.login}/repos`)
		).json();
		return repos;
	};

	const fetchLanguages = async () => {
		const repos = await fetchRepos();

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

		return Object.entries(languagesTotal).sort((a, b) => b[1] - a[1]);
	};

	const displayData = async () => {
		if (!$user) return;
		languagesSorted = await fetchLanguages();
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
		// mainElement.scrollTop = 0;
		setTimeout(() => {
			scrollToBottom(mainElement.scrollHeight, 5000);
		}, 2000);
		// scrollToBottom(mainElement.scrollHeight, 5000);
		// setTimeout(() => {
		// 	mainElement.scrollTo({
		// 		top: mainElement.scrollHeight,
		// 		left: 0,
		// 		behavior: 'smooth'
		// 	});
		// }, 1000);
	});

	// uitcommenten als ik niet meer geblokkeerd ben :(
	loading.set(true);
	$: $user, displayData();
</script>

<main bind:this={mainElement}>
	<h1>Your Favorite Languages</h1>
	<ul>
		{#each languagesSorted as [language, amount]}
			<li>
				{#if amount > 100000}
					<span>{language}</span>
				{/if}
				<div style="height:{amount / 10}px" />
				<span>{language}</span>
			</li>
		{/each}
	</ul>
</main>

<style>
	main {
		height: calc(100vh - 5em);
		background: teal;
		display: grid;
		grid-template-rows: min-content 1fr;
		overflow-y: auto;
	}

	main ul {
		display: flex;
		justify-content: center;
		align-items: end;
		border: solid 2px red;
		gap: 2em;
	}

	main ul li {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	main ul li div {
		width: 3em;
		background: red;
	}
</style>
