import React, { useReducer, useContext } from 'react';
import AlertContext from './AlertContext';
import { v4 as uuidv4 } from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from '../actionTypes';
import AlertReducer from './AlertReducer';
export const useAlert = () => {
	const { state, dispatch } = useContext(AlertContext);
	return [ state, dispatch ];
};

export const setAlert = (dispatch, msg, type, timeout = 5000) => {
	const id = uuidv4();
	dispatch({
		type: SET_ALERT,
		payload: { msg, type, id }
	});
	setTimeout(() => {
		dispatch({
			type: REMOVE_ALERT,
			payload: id
		});
	}, timeout);
};
const AlertState = (props) => {
	const initialState = {
		alert: []
	};

	const [ state, dispatch ] = useReducer(AlertReducer, initialState);

	return (
		<AlertContext.Provider
			value={{
				state: state,
				dispatch
			}}
		>
			{props.children}
		</AlertContext.Provider>
	);
};

export default AlertState;
