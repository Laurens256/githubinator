<script lang="ts">
	import { user, loading } from '$lib/stores';
	import type { Repo } from '$lib/models';
	import type { Language } from '$lib/models';

	let languagesSorted: [string, number][] = [];

	const fetchRepos = async () => {
		const repos: Repo[] = await (
			await fetch(`https://api.github.com/users/${$user.login}/repos`)
		).json();
		return repos;
	};

	const fetchLanguages = async () => {
		const repos = await fetchRepos();
		const allLanguages: Language = {};

		for (const repo of repos) {
			const languages: Language = await (await fetch(repo.languages_url)).json();

			for (const language in languages) {
				if (allLanguages[language]) {
					allLanguages[language] += languages[language];
				} else {
					allLanguages[language] = languages[language];
				}
			}
		}
		return Object.entries(allLanguages).sort((a, b) => b[1] - a[1]);
	};

	const displayData = async () => {
		if (!$user) return;
		languagesSorted = await fetchLanguages();
		loading.set(false);
	};

	loading.set(true);
	$: $user, displayData();
</script>

<main>
	<h1>Favorite Languages</h1>
	{#each languagesSorted as [language, amount]}
		<div>
			<h2>{language}</h2>
			<p>{amount} bytes</p>
		</div>
	{/each}
</main>
