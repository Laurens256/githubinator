import { PUBLIC_DEFAULT_USER } from '$env/static/public';
import type { UserProfile } from '$lib/models';

export const load = async ({fetch}) => {
	const fetchUser = async () => {
		const user: UserProfile = await (await fetch(`https://api.github.com/users/${PUBLIC_DEFAULT_USER}`)).json();

		return user;
	};

	return {
		user: fetchUser()
	};
};
