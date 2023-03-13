import { fetchData } from '$lib/functions/fetchData';
import type { UserProfile, UsedLanguages, ContributedRepos } from '$lib/models';

const load = async () => {
	const userProfile: UserProfile | Promise<UserProfile> = fetchData('userProfile');
	const usedLanguages: UsedLanguages | Promise<UsedLanguages> = fetchData('usedLanguages');
	const contributedRepos: ContributedRepos | Promise<ContributedRepos> = fetchData('contributedRepos')

	return {
		userProfile,
		usedLanguages,
		contributedRepos
	};
};

export { load };
