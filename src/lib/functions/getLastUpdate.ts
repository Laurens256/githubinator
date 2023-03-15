export const getLastUpdate = async (lastUpdate: string) => {
	const lastUpdateDate = new Date(lastUpdate);
	const currentDate = new Date();
	const diffTime = Math.abs(currentDate.getTime() - lastUpdateDate.getTime());
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
	return diffDays;
};