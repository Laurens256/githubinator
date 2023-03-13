<script lang="ts">
	export let data;

	const { userProfile, usedLanguages, contributedRepos } = data;
	console.log(userProfile, usedLanguages, contributedRepos);
</script>

<img src="{userProfile.avatarUrl}" alt="{userProfile.name} avatar">
<p>{userProfile.login}</p>
