// allemaal met de hand geschreven
export const getLastUpdate = (lastUpdate: Date, exact = true) => {
	const lastUpdateDate = new Date(lastUpdate);
	const currentDate = new Date();
	const diffTime = Math.abs(currentDate.getTime() - lastUpdateDate.getTime());

	const minute = 60 * 1000;
	const hour = 60 * minute;
	const day = 24 * hour;
	const week = 7 * day;
	const twoWeeks = 2 * week;
	const month = 4 * week;

	switch (true) {
		case diffTime < minute:
			return 'just now';
		case diffTime < hour:
			const minutes = Math.floor(diffTime / minute);
			return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
		case diffTime < day:
			const hours = Math.floor(diffTime / hour);
			return `${hours} hour${hours > 1 ? 's' : ''} ago`;
		case diffTime < day * 2:
			return 'yesterday';
		case diffTime < week:
			const days = Math.floor(diffTime / day);
			return `${days} day${days > 1 ? 's' : ''} ago`;
		case diffTime < twoWeeks:
			return 'last week';
		case diffTime < month:
			const weeks = Math.floor(diffTime / week);
			return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
		case diffTime < 2 * month:
			return 'last month';
		case lastUpdateDate.getFullYear() === currentDate.getFullYear():
			return lastUpdateDate.toLocaleDateString('en-US', {
				month: 'short',
				day: 'numeric'
			});
		default:
			const yearDiff = currentDate.getFullYear() - lastUpdateDate.getFullYear();
			return exact
				? `on ${lastUpdateDate.toLocaleDateString('en-US', {
						month: 'short',
						day: 'numeric',
						year: 'numeric'
				  })}`
				: `${yearDiff} year${yearDiff > 1 ? 's' : ''} ago`;
	}
};
