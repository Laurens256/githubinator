import { SECRET_GITHUB_TOKEN } from '$env/static/private';

const apiUrl = 'https://api.github.com/graphql';

export async function POST({ request }: any) {
	const query = await request.json();

	const data: { data: {} } = (
		await (
			await fetch(apiUrl, {
				method: 'POST',
				headers: {
					authorization: `Bearer ${SECRET_GITHUB_TOKEN}`,
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(query)
			})
		).json()
	).data;

	return new Response(JSON.stringify(data), {
		status: 200,
		headers: {
			'Content-Type': 'application/json'
		}
	});
}
