<script>
	import { getCurrentUser } from '$lib/functions/currentUser';

	export let data;

	const { repos } = data;

	// fix url and document title
	const user = getCurrentUser();
	window.history.replaceState({}, '', `?user=${user}`);

	const userCapitalized = user.charAt(0).toUpperCase() + user.slice(1);
	document.title = userCapitalized.endsWith('s')
		? `${userCapitalized}' Projects`
		: `${userCapitalized}'s Projects`;
</script>

<main>
	<ul>
		{#each repos as repo}
			<li>
				<a href={repo.html_url} target="_blank">
					<h2>{repo.name}</h2>
					<small>{repo.fork ? 'Forked' : '\u00A0'}</small>
					<p>{repo.description ? repo.description : '\u00A0'}</p>

					<ul>
						{#if repo.language}
							<li><span>K</span>{repo.language}</li>
						{/if}
						{#if repo.license}
							<li><span>⭐</span>{repo.license.name}</li>
						{/if}
						{#if repo.updated_at}
							<li><span>🍴</span>{repo.updated_at}</li>
						{/if}
					</ul>
				</a>
			</li>
		{/each}
	</ul>
</main>

<style>
	main > ul {
		display: flex;
		flex-direction: column;
		width: 1200px;
		max-width: 90vw;
		margin: 0 auto;
	}

	main > ul li {
		/* border-bottom: 2px solid var(--secondary-bg); */
	}

	main > ul li a {
		display: flex;
		flex-direction: column;
		height: 2em;
		border-bottom: 2px solid var(--secondary-bg);
		height: 9rem;
		padding: 1em 0;
		color: var(--primary-text);
		text-decoration: none;
		overflow: hidden;
	}

	main > ul li a h2 {
		color: var(--link-color);
	}

	main > ul li a:is(:hover, :focus-visible) h2 {
		text-decoration: underline;
		text-decoration-thickness: 2px;
	}

	main > ul li a small {
		color: var(--secondary-text);
	}

	main > ul li a > ul {
		display: flex;
	}
</style>
