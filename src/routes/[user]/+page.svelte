<script lang="ts">
	import { user } from '$lib/stores';

	const emojis = ['😎', '🥸', '🤙', '💃', '🤼‍♂️', '💀'];
	const getRandomEmoji = () => {
		return emojis[Math.floor(Math.random() * emojis.length)];
	};
</script>

<main>
	<section>
		<div>
			{#if $user}
				<img src={$user.avatar_url} alt="{$user.login} avatar icon" />
			{/if}

			<div>
				<span>{getRandomEmoji()}</span>
			</div>
		</div>
		{#if $user}
			<h1>{$user.login}</h1>
		{/if}
	</section>
</main>

<style>
	main {
		display: flex;
		justify-content: center;
		align-items: center;
		height: calc(100vh - 5em);
		min-height: fit-content;
	}

	main section > div:first-of-type {
		display: flex;
		align-items: center;
		position: relative;
		height: fit-content;
	}

	main section > div:first-of-type img {
		/* min-width: 200px; */
		max-width: 70vw;
		max-height: 50vh;
		border-radius: 50%;
	}

	main section > div:first-of-type > div {
		/* --size: 38px; */
		--size: clamp(20px, 10vw, 38px);
		font-size: 1.2rem;
		position: absolute;
		right: 2%;
		bottom: 20%;
		width: var(--size);
		height: var(--size);
		background: var(--secondary-bg);
		border: solid 2px var(--primary-bg);
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		container-type: size;
	}

	main section > div:first-of-type > div span {
		font-size: 60cqh;
	}

	main section h1 {
		text-align: center;
		margin-top: 0.2rem;
		font-size: clamp(0.8rem, 1.5rem, 5vw);
	}
</style>
