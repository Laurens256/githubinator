<script lang="ts">
	import { fetchData } from '$lib/functions/fetchData';
	// export let data;
	// console.log(data);

	const fetchRepositories = async () => {
		const response = await fetchData('contributedRepos');

		console.log(response);
	};
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<a href="/projecten">testlink</a>

<button on:click={fetchRepositories}>get</button>
