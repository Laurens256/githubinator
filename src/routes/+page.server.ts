import { request, gql, GraphQLClient } from 'graphql-request';
import { SECRET_GITHUB_TOKEN } from '$env/static/private';

const api_uri = 'https://api.github.com/graphql';

export async function load({ params }) {
	const client = new GraphQLClient(api_uri, {
		headers: {
			Authorization: `Bearer ${SECRET_GITHUB_TOKEN}`,
			'Content-Type': 'application/json'
		}
	});

	const query = gql`
		{
			viewer {
				repositoriesContributedTo(first: 100, contributionTypes: [COMMIT, PULL_REQUEST]) {
					nodes {
						nameWithOwner
					}
				}
				repositories(first: 100, ownerAffiliations: [OWNER]) {
					nodes {
						nameWithOwner
					}
				}
			}
		}
	`;

	try {
		const data = await client.request(query);
		return data;
	} catch (error) {
		console.log(error);
		return {};
	}
}
