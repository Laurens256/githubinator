<script lang="ts">
	import { PUBLIC_DEFAULT_USER } from '$env/static/public';
	import { user } from '$lib/stores';
	const headings = [
		{
			name: 'Home',
			href: '/'
		},
		{
			name: 'Projects',
			href: '/projects'
		},
		{
			name: 'Favorite Languages',
			href: '/favorite-languages'
		}
	];
</script>

<header>
	<ul>
		<li>
			<img src="/github-mark-white.svg" alt="github icon" />
		</li>
		{#each headings as heading}
			<li>
				<a
					class="underline"
					href="/{$user ? $user.login : PUBLIC_DEFAULT_USER}{heading.href}"
					>{heading.name}</a
				>
			</li>
		{/each}
		<li>
			{#if $user}
				<img src={$user.avatar_url} alt="{$user.login} avatar icon" />
			{/if}
		</li>
	</ul>
</header>

<style>
	header {
		background-color: var(--secondary-bg);
		color: var(--primary-text);
		height: 5em;
		container-type: size;
	}

	header ul {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		width: 100%;
		max-width: 1200px;
		margin: 0 auto;
		gap: 3em;
		padding: 0 1em;
	}

	header ul li {
		text-align: center;
	}

	header ul li:last-of-type {
		margin-left: auto;
	}

	header ul li img {
		height: 60cqh;
		border-radius: 50%;
	}

	header ul li a {
		font-size: clamp(0.7rem, 1.3rem, 4vw);
		font-weight: bold;
		color: var(--primary-text);
	}
</style>
