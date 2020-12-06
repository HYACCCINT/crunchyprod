import { useContext } from 'react';
import { UserContext } from './user-context';

export const useAuth = () => {
	const value = useContext(UserContext);
	const isPending = value.state.status === 'pending';
	const isError = value.state.status === 'error';
	const isSuccess = value.state.status === 'success';
	const isAuthenticated = value.state.user && isSuccess;
	return {
		...value.state,
		isPending,
		isError,
		isSuccess,
		isAuthenticated
	};

};

// export const UpdateAuth = (user:any) => {
// 	const state = useContext(UserContext);
// 	state.status='success', 
// 	state.user=user;
// 	console.log(state);
// 	return {
// 		...state
// 	};
// };