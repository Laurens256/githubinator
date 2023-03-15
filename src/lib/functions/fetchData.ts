const apiUrl = 'https://api.github.com/';

const fetchData = async (query: string) => {
	let data;
	try {
		data = await fetch(`${apiUrl}/${query}`);
	} catch (error) {
		console.log(error);
	}

	return data;
};


export { fetchData };	

