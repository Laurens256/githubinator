import { PUBLIC_DEFAULT_USER } from '$env/static/public';

const getCurrentUser = () => {
	return (
		sessionStorage.getItem('currentUser') ||
		new URLSearchParams(window.location.search).get('user') ||
		PUBLIC_DEFAULT_USER
	);
};

const setCurrentUser = (user: string) => {
	sessionStorage.setItem('currentUser', user || PUBLIC_DEFAULT_USER);
};

export { getCurrentUser, setCurrentUser };
