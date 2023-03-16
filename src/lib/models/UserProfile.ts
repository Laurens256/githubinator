export default interface UserProfile {
	login: string;
	id: number;
	avatar_url: string;
	url: string;
	html_url: string;
	name: string;
	bio?: string;
	twitter_username?: any;
	public_repos: number;
	public_gists: number;
	followers: number;
	following: number;
	created_at: Date;
	updated_at: Date;
	message?: string; // dit is een extra property die alleen in de error response zit
}