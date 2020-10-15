import React, { useReducer, useContext } from 'react';
import ContactContext from './ContactContext';
import ContactReducer from './ContactReducer';
import axios from 'axios';
import {
	GET_CONTACTS,
	ADD_CONTACT,
	REMOVE_CONTACT,
	UPDATE_CONTACT,
	SET_CURRENT,
	CLEAR_CURRENT,
	CONTACT_ERROR,
	FILTER_CONTACTS,
	REMOVE_CONTACT_ERROR,
	CLEAR_FILTER
} from '../actionTypes';

//Create a Custome hook for Contact State
export const useContact = () => {
	const { state, dispatch } = useContext(ContactContext);
	return [ state, dispatch ];
};

//creating config
const config = {
	header: {
		'Content-Type': 'application/json'
	}
};

//==========contact error handler =======//
export const contactError = (dispatch, msg) => {
	dispatch({
		type: CONTACT_ERROR,
		payload: msg
	});
};
export const clearContactError = (dispatch) => {
	dispatch({
		type: REMOVE_CONTACT_ERROR
	});
};
//================= GET the Contacts from the DB ================//
export const getContacts = async (dispatch) => {
	try {
		const res = await axios.get('/api/contacts');
		dispatch({
			type: GET_CONTACTS,
			payload: res.data
		});
	} catch (error) {
		contactError(dispatch, error);
	}
};

//==============Add a Contact to the DB ==================//
export const addContact = async (dispatch, contact) => {
	try {
		const res = await axios.post('/api/contacts', contact, config);
		dispatch({
			type: ADD_CONTACT,
			payload: res.data
		});
	} catch (error) {
		contactError(dispatch, error.response.data.msg);
	}
};
//=============== SET Current Contact for Update ===========//
export const setCurrentContact = (dispatch, contact) => {
	dispatch({
		type: SET_CURRENT,
		payload: contact
	});
};
//=========== CLEAR Current Contact after Updating ======//
export const clearCurrentContact = (dispatch) => {
	dispatch({
		type: CLEAR_CURRENT
	});
};

//============== UPDATE Contact ==============//
export const updateContact = async (dispatch, contact) => {
	try {
		const res = await axios.put(`/api/contacts/${contact._id}`, contact, config);

		dispatch({
			type: UPDATE_CONTACT,
			payload: res.data
		});
	} catch (error) {
		contactError(dispatch, error.response.msg);
	}
};

//============== Delete Contact ==============//
export const deleteContact = async (dispatch, id) => {
	try {
		await axios.delete(`/api/contacts/${id}`);
		dispatch({
			type: REMOVE_CONTACT,
			payload: id
		});
	} catch (error) {
		contactError(dispatch, error.response.msg);
	}
};

//=========  Filtering Contact and Clearing the filtered contacts =========//
export const filterContacts = (dispatch, text) => {
	dispatch({
		type: FILTER_CONTACTS,
		payload: text
	});
};

export const clearFilter = (dispatch) => {
	dispatch({
		type: CLEAR_FILTER
	});
};
const ContactState = (props) => {
	const initialState = {
		contacts: null,
		current: null,
		error: null,
		filtered: null,
		loading: true
	};

	const [ state, dispatch ] = useReducer(ContactReducer, initialState);

	return (
		<ContactContext.Provider
			value={{
				state: state,
				dispatch: dispatch
			}}
		>
			{props.children}
		</ContactContext.Provider>
	);
};
export default ContactState;
