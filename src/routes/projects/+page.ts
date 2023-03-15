import type { Repo } from '$lib/models/Repo';
import { getCurrentUser } from '$lib/functions/currentUser';

export const load = async ({ fetch }) => {
	const user = getCurrentUser();
	const fetchRepos = async () => {
		const repos: Repo[] = await (await fetch(`https://api.github.com/users/${user}/repos`)).json();

		return repos;
	};

	return {
		repos: fetchRepos()
	};
};