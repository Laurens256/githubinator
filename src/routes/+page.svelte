<script lang="ts">
	import { PUBLIC_DEFAULT_USER } from '$env/static/public';
	import { goto } from '$app/navigation';

	goto(`/${PUBLIC_DEFAULT_USER}`, { replaceState: true });
</script>

<style>
</style>
