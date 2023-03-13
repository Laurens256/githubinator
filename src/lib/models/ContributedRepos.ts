export default interface ContributedRepos {
	repositoriesContributedTo: {
		nodes: {
			nameWithOwner: string;
		}[];
	};
	repositories: {
		nodes: {
			nameWithOwner: string;
		}[];
	};
}
