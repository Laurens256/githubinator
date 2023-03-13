export default interface UsedLanguages {
	repositoriesContributedTo: {
		nodes: {
			name: string;
			languages: {
				edges: {
					size: number;
					node: {
						name: string;
					};
				}[];
			};
		}[];
	};
}
