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

	console.log('before query');
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
		console.log('before');
		const data = await client.request(query);
		console.log(data);
		return data;
	} catch (error) {
		console.log(error);
		return {};
	}
}
