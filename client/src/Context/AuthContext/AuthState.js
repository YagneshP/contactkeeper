import AuthContext from './AuthContext';
import setAuthToken from '../../utilities/setAuthToken';
import React, { useReducer, useContext, useEffect } from 'react';
import AuthReducer from './AuthReducer';
import axios from 'axios';
import {
	SIGNUP_USER,
	SIGNUP_FAIL,
	USER_LOADED,
	LOGIN_USER,
	AUTH_ERROR,
	LOGIN_FAIL,
	LOGOUT,
	CLEAR_ERROR
} from '../actionTypes';

export const useAuth = () => {
	const { state, dispatch } = useContext(AuthContext);
	return [ state, dispatch ];
};
const config = {
	headers: {
		'Content-Type': 'application/json'
	}
};

//=============== SET OR LOAD User ====================//
export const loadUser = async (dispatch) => {
	try {
		const res = await axios.get('/api/users');
		dispatch({
			type: USER_LOADED,
			payload: res.data
		});
	} catch (error) {
		dispatch({
			type: AUTH_ERROR
		});
	}
};
//================ SigningUp User ======================//
export const signupUser = async (dispatch, formData) => {
	try {
		const res = await axios.post('/api/auth/signup', formData, config);
		dispatch({
			type: SIGNUP_USER,
			payload: res.data
		});
		loadUser(dispatch);
	} catch (error) {
		dispatch({
			type: SIGNUP_FAIL,
			payload: error.response.data.msg
		});
	}
};
//================ Login User ======================//
export const loginUser = async (dispatch, formData) => {
	try {
		const res = await axios.post('/api/auth/login', formData, config);
		dispatch({
			type: LOGIN_USER,
			payload: res.data
		});
		loadUser(dispatch);
	} catch (error) {
		dispatch({
			type: LOGIN_FAIL,
			payload: error.response.data.msg
		});
	}
};
//=============== LogoutUser =================//
export const logout = (dispatch) => {
	dispatch({
		type: LOGOUT
	});
};
//=============== ClearError================//
export const clearError = (dispatch) => {
	dispatch({
		type: CLEAR_ERROR
	});
};
const AuthState = (props) => {
	const initialState = {
		token: localStorage.getItem('token'),
		isAuthenticated: false,
		loading: true,
		user: null,
		error: null
	};
	const [ state, dispatch ] = useReducer(AuthReducer, initialState);
	//set token on intial App loadin
	setAuthToken(state.token);

	//load user on first loading or refresh
	if (state.loading) {
		loadUser(dispatch);
	}
	//watch state.token and set headears and local storage on any change
	useEffect(
		() => {
			setAuthToken(state.token);
		},
		[ state.token ]
	);
	return (
		<AuthContext.Provider
			value={{
				state: state,
				dispatch
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthState;
