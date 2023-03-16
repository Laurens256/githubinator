const apiUrl = 'https://api.github.com/';

const fetchData = async (query: string) => {
	let data;
	try {
		data = await (await fetch(`${apiUrl}${query}`)).json();
	} catch (error) {
		return { err: error };
	}
	return data;
};

export { fetchData };
