<script lang="ts">
	import { request, gql, GraphQLClient } from 'graphql-request';
	import '../app.css';
	import Header from '$lib/header.svelte';
</script>

<Header />
<slot />
