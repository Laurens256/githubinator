<script lang="ts">
	import { request, gql, GraphQLClient } from 'graphql-request';
	import '../app.css';
	import Header from '$lib/header.svelte';

	const client = new GraphQLClient('https://api.github.com/graphql', {
    headers: {
      Authorization: 'Bearer <bearer>',
    },
  })

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

	const func = async() => {
	const data = await client.request(query);
	console.log(await data);
	}
	// func();
</script>

<Header />
<slot />
