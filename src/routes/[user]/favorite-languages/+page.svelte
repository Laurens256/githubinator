<script lang="ts">
	export let data;

	const { languages } = data;

	const languagesSorted = Object.entries(languages).sort((a, b) => b[1] - a[1]);
</script>

<main>
	<h1>Favorite Languages</h1>

	{#each languagesSorted as [language, amount]}
		<div>
			<h2>{language}</h2>
			<p>{amount} bytes</p>
		</div>
	{/each}
</main>
