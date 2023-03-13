import { PUBLIC_BASE_URL } from '$env/static/public';
const authUrl = '/api/authorize';

const fetchData = async (query: keyof typeof queries) => {
	const data = await (
		await fetch(PUBLIC_BASE_URL + authUrl, {
			method: 'POST',
			body: JSON.stringify({ query: queries[query] }),
			headers: {
				'Content-Type': 'application/json'
			}
		})
	).json();

	return data;
};

const queries = {
	contributedRepos:
		'{viewer {repositoriesContributedTo(first: 100, contributionTypes: [COMMIT, PULL_REQUEST]) {nodes {nameWithOwner}}repositories(first: 100, ownerAffiliations: [OWNER]) {nodes {nameWithOwner}}}}',
	usedLanguages:
		'{ viewer { repositoriesContributedTo(last: 100, includeUserRepositories: true, contributionTypes: [COMMIT, PULL_REQUEST]) { nodes { name languages(first: 10) { edges { size node { name } } } } } } } ',
	userProfile: '{ viewer { login name avatarUrl bio url } }'
};

type QueriesUnion = keyof typeof queries;

export { fetchData };	
export type { QueriesUnion };

