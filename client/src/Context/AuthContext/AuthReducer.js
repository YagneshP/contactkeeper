import { SIGNUP_USER, USER_LOADED, SIGNUP_FAIL, CLEAR_ERROR, LOGIN_USER, LOGIN_FAIL, LOGOUT } from '../actionTypes';

const AuthReducer = (state, action) => {
	switch (action.type) {
		case USER_LOADED:
			return {
				...state,
				user: action.payload,
				isAuthenticated: true,
				loading: false
			};
		case SIGNUP_USER:
		case LOGIN_USER:
			localStorage.setItem('token', action.payload.token);
			return {
				...state,
				...action.payload,
				isAuthenticated: true,
				loading: false
			};
		case SIGNUP_FAIL:
		case LOGIN_FAIL:
		case LOGOUT:
			localStorage.removeItem('token');
			return {
				...state,
				token: null,
				user: null,
				isAuthenticated: false,
				error: action.payload,
				loading: false
			};
		case CLEAR_ERROR:
			return {
				...state,
				error: null
			};
		default:
			return state;
	}
};
export default AuthReducer;
