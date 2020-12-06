import React, {
	createContext,
	useState,
	useEffect
} from 'react';

const UserContext: React.Context<any> = createContext({});

UserContext.displayName = 'UserContext';

const getUser = () => fetch(`http://localhost:5000/api/cur-user`, { credentials : 'include' })
	.then((response) => {
		if (!response.ok) {
			throw new Error(response.statusText);
		}
		return response.json();
	});

const UserContextProvider = ({ children }: any) => {
	const [state, setState] = useState({
		status: 'pending',
		error: null,
		user: null
	});

	useEffect(() => {
		if (state.user) {
			console.log(state, 'qaq');
			return;
		}
		getUser().then(
			(user) => setState({
				status: 'success',
				error: null,
				user
			} as any)
		).catch(
			(error) => setState({
				status: 'error',
				error,
				user: null
			} as any)
		);
	}, []);
console.log("user", state);
	return (
		<UserContext.Provider value={{state:state, setState:setState}}>
			{ children }
		</UserContext.Provider>
	);
};


export {
	UserContext,
	UserContextProvider
};
