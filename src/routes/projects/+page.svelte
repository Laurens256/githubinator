<script>
	import { getCurrentUser } from '$lib/functions/currentUser';
	import { getLastUpdate } from '$lib/functions/getLastUpdate';

	export let data;

	const { repos, languageColors } = data;

	// fix url and document title
	const user = getCurrentUser();
	window.history.replaceState({}, '', `?user=${user}`);

	const userCapitalized = user.charAt(0).toUpperCase() + user.slice(1);
	document.title = userCapitalized.endsWith('s')
		? `${userCapitalized}' Projects`
		: `${userCapitalized}'s Projects`;
	// style="--language-color:{languageColors[repo.language].color};"
</script>

<main>
	<ul>
		{#each repos as repo}
			<li>
				<a href={repo.html_url} target="_blank">
					<h2>{repo.name}</h2>
					<small>{repo.fork ? 'Forked' : ''}</small>
					<p>{repo.description ? repo.description : ''}</p>

					<ul>
						{#if repo.language}
							<li class="primary-language">
								<span
									style={languageColors[repo.language]
										? `--language-color:${languageColors[repo.language].color};`
										: ''}
								/>{repo.language}
							</li>
						{/if}
						{#if repo.license}
							<li class="license"><span>⭐</span>{repo.license.name}</li>
						{/if}
						{#if repo.updated_at}
							<li class="last-updated">Updated {getLastUpdate(repo.updated_at)}</li>
						{/if}
					</ul>
				</a>
			</li>
		{/each}
	</ul>
</main>

<style>
	main {
		margin: 2em 0;
	}

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
		border-bottom: 2px solid var(--secondary-bg);
		height: fit-content;
		min-height: 9rem;
		padding: 1em 0;
		color: var(--primary-text);
		text-decoration: none;
		/* overflow: hidden; */
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

	main > ul li a p:empty,
	main > ul li a small:empty {
		height: .5ch;
		width: 1px;
	}

	main > ul li a > ul {
		display: flex;
		gap: 1em;
	}

	/* lijstje met primary language, license en datum */
	main > ul li a > ul li {
		color: var(--secondary-text);
		display: flex;
		align-items: center;
		gap: .3rem;
	}

	main > ul li a > ul li.primary-language span {
		background-color: var(--language-color, var(--primary-text));
		display: inline-block;
		border-radius: 50%;
		width: 16px;
		aspect-ratio: 1;
	}

	main > ul li a > ul li.license {
	}

</style>
