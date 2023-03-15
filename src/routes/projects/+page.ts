import type { Repo } from '$lib/models/Repo';
import type { LanguageColor } from '$lib/models/LanguageColors';
import { getCurrentUser } from '$lib/functions/currentUser';

export const load = async ({ fetch }) => {
	const user = getCurrentUser();

	const fetchRepos = async () => {
		const repos: Repo[] = await (
			await fetch(`https://api.github.com/users/${user}/repos`)
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
