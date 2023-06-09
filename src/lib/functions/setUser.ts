import type { UserProfile } from '$lib/models';
import { PUBLIC_DEFAULT_USER } from '$env/static/public';
import { user } from '$lib/stores';
import { get } from 'svelte/store';

export const setUser = async (userName = PUBLIC_DEFAULT_USER) => {
	// uitcommenten als ik niet meer geblokkeerd ben :(
	// return;
	const currentUser = get(user);
	if (currentUser && currentUser.login === userName) return;

	let userProfile: UserProfile = await (
		await fetch(`https://api.github.com/users/${userName}`)
	).json();

	if (userProfile.message) {
		userProfile = await (
			await fetch(`https://api.github.com/users/${PUBLIC_DEFAULT_USER}`)
		).json();

		window.history.replaceState({}, '',  window.location.href.replace(userName, PUBLIC_DEFAULT_USER));
	}

	if (userProfile.message) return;

	user.set(userProfile);
};
