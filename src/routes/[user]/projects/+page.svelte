<script lang="ts">
	import { getLastUpdate } from '$lib/functions/getLastUpdate';
	import { user } from '$lib/stores';
	import type { Repo } from '$lib/models';
	import type { LanguageColor } from '$lib/models';

	let repos: Repo[] = [];
	let languageColors: LanguageColor = {};
	const fetchRepos = async () => {
		const repos: Repo[] = await (
			await fetch(`https://api.github.com/users/${$user.login}/repos`)
		).json();

		return repos;
	};

	const fetchLanguageColors = async () => {
		const languageColors: LanguageColor = await (
			await fetch(
				`https://raw.githubusercontent.com/ozh/github-colors/master/colors.json`
			)
		).json();

		return languageColors;
	};

	const displayData = async () => {
		if(!$user) return;
		repos = await fetchRepos();
		// repos = repos.sort((a, b) => {
		// 	if (a.pushed_at > b.pushed_at) return -1;
		// 	if (a.pushed_at < b.pushed_at) return 1;
		// 	return 0;
		// });
		repos = repos.sort((a, b) => {
			if (a.updated_at > b.updated_at) return -1;
			if (a.updated_at < b.updated_at) return 1;
			return 0;
		});
		languageColors = await fetchLanguageColors();
	};

	$: $user, displayData();
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
							<li class="license">
								<span>
									<svg viewBox="0 0 16 16" fill="currentColor">
										<path
											d="M8.75.75V2h.985c.304 0 .603.08.867.231l1.29.736c.038.022.08.033.124.033h2.234a.75.75 0 0 1 0 1.5h-.427l2.111 4.692a.75.75 0 0 1-.154.838l-.53-.53.529.531-.001.002-.002.002-.006.006-.006.005-.01.01-.045.04c-.21.176-.441.327-.686.45C14.556 10.78 13.88 11 13 11a4.498 4.498 0 0 1-2.023-.454 3.544 3.544 0 0 1-.686-.45l-.045-.04-.016-.015-.006-.006-.004-.004v-.001a.75.75 0 0 1-.154-.838L12.178 4.5h-.162c-.305 0-.604-.079-.868-.231l-1.29-.736a.245.245 0 0 0-.124-.033H8.75V13h2.5a.75.75 0 0 1 0 1.5h-6.5a.75.75 0 0 1 0-1.5h2.5V3.5h-.984a.245.245 0 0 0-.124.033l-1.289.737c-.265.15-.564.23-.869.23h-.162l2.112 4.692a.75.75 0 0 1-.154.838l-.53-.53.529.531-.001.002-.002.002-.006.006-.016.015-.045.04c-.21.176-.441.327-.686.45C4.556 10.78 3.88 11 3 11a4.498 4.498 0 0 1-2.023-.454 3.544 3.544 0 0 1-.686-.45l-.045-.04-.016-.015-.006-.006-.004-.004v-.001a.75.75 0 0 1-.154-.838L2.178 4.5H1.75a.75.75 0 0 1 0-1.5h2.234a.249.249 0 0 0 .125-.033l1.288-.737c.265-.15.564-.23.869-.23h.984V.75a.75.75 0 0 1 1.5 0Zm2.945 8.477c.285.135.718.273 1.305.273s1.02-.138 1.305-.273L13 6.327Zm-10 0c.285.135.718.273 1.305.273s1.02-.138 1.305-.273L3 6.327Z"
										/>
									</svg>
								</span>{repo.license.name}
							</li>
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

	main > ul li a {
		display: flex;
		flex-direction: column;
		border-bottom: 2px solid var(--secondary-bg);
		height: fit-content;
		min-height: 9rem;
		padding: 1em 0;
		color: var(--primary-text);
		text-decoration: none;
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

	main > ul li a p:not(:empty),
	main > ul li a small:not(:empty) {
		margin-bottom: 0.3rem;
	}

	main > ul li a p:empty,
	main > ul li a small:empty {
		height: 0.5ch;
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
		justify-content: center;
		gap: 0.3rem;
	}

	main > ul li a > ul li.license span,
	main > ul li a > ul li.primary-language span {
		display: flex;
		border-radius: 50%;
		width: 16px;
		aspect-ratio: 1;
	}

	main > ul li a > ul li.primary-language span {
		background-color: var(--language-color, var(--primary-text));
	}
</style>
