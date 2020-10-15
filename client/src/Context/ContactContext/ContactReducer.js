import {
	GET_CONTACTS,
	CONTACT_ERROR,
	ADD_CONTACT,
	UPDATE_CONTACT,
	REMOVE_CONTACT,
	CLEAR_CURRENT,
	SET_CURRENT,
	FILTER_CONTACTS,
	CLEAR_FILTER,
	REMOVE_CONTACT_ERROR
} from '../actionTypes';

export default (state, action) => {
	switch (action.type) {
		case GET_CONTACTS:
			return {
				...state,
				contacts: action.payload,
				loading: false
			};
		case ADD_CONTACT:
			return {
				...state,
				contacts: [ action.payload, ...state.contacts ],
				loading: false
			};
		case UPDATE_CONTACT:
			return {
				...state,
				contacts: state.contacts.map(
					(contact) => (contact._id === action.payload._id ? action.payload : contact)
				),
				loading: false
			};
		case FILTER_CONTACTS:
			return {
				...state,
				filtered: state.contacts.filter(({ name, email }) => {
					const testString = `${name}${email}.toLowerCase()`;
					return testString.includes(action.payload.toLowerCase());
				})
			};

		case CLEAR_FILTER:
			return {
				...state,
				filtered: null
			};
		case REMOVE_CONTACT:
			return {
				...state,
				contacts: state.contacts.filter((contact) => contact._id !== action.payload),
				loading: false
			};
		case SET_CURRENT:
			return {
				...state,
				current: action.payload
			};
		case CLEAR_CURRENT:
			return {
				...state,
				current: null
			};
		case CONTACT_ERROR:
			return {
				...state,
				error: action.payload,
				loading: false
			};
		case REMOVE_CONTACT_ERROR:
			return {
				...state,
				error: null,
				loading: false
			};
		default:
			return state;
	}
};
