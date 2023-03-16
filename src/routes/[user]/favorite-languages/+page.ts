import { PUBLIC_DEFAULT_USER } from '$env/static/public';
import type { Repo } from '$lib/models';
import type { Language } from '$lib/models';

export const load = async ({ fetch }) => {
	const fetchRepos = async () => {
		const repos: Repo[] = await (
			await fetch(`https://api.github.com/users/${PUBLIC_DEFAULT_USER}/repos`)
		).json();
		return repos;
	};

	const fetchLanguages = async () => {
		const allLanguages: Language = {};

		const repos = await fetchRepos();

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
		return allLanguages;
	};

	return {
		languages: fetchLanguages()
	};
};
