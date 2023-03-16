import type { UserProfile } from '$lib/models';
import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';

export const user: Writable<UserProfile> = writable();

export const loading: Writable<boolean> = writable(false);
