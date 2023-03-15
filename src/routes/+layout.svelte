<script lang="ts">
	import '../app.css';
	import Header from '$lib/header.svelte';
	import { navigating } from '$app/stores';
	import { setCurrentUser } from '$lib/functions/currentUser';

	$: if($navigating) test();

	const test = () => {
		
	};
</script>

<Header />
<slot />
