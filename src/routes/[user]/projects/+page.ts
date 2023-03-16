import { PUBLIC_DEFAULT_USER } from '$env/static/public';
import type { Repo } from '$lib/models';
import type { LanguageColor } from '$lib/models';

export const load = async ({ fetch }) => {
	const fetchRepos = async () => {
		const repos: Repo[] = await (
			await fetch(`https://api.github.com/users/${PUBLIC_DEFAULT_USER}/repos`)
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

	return {
		repos: fetchRepos(),
		languageColors: fetchLanguageColors()
	};
};

export {};