const authUrl = '/api/authorize';

const fetchData = async (query: keyof typeof queries) => {
	const data = await (
		await fetch(authUrl, {
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
		'{viewer {repositoriesContributedTo(first: 100, contributionTypes: [COMMIT, PULL_REQUEST]) {nodes {nameWithOwner}}repositories(first: 100, ownerAffiliations: [OWNER]) {nodes {nameWithOwner}}}}'
};

export { fetchData };
