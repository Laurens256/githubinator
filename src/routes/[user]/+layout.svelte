<script lang="ts">
	import { page } from '$app/stores';
	$: $page, userChanged();

	const userChanged = async () => {
		const userName = $page.params.user;
	};
</script>

<slot />
