import React from 'react';
import { useContact, filterContacts, clearFilter } from '../../../Context/ContactContext/ContactState';

const ContactFilter = () => {
	const contactDispatch = useContact()[1];
	const handleChange = (e) => {
		if (e.target.value !== '') {
			filterContacts(contactDispatch, e.target.value);
		} else {
			clearFilter(contactDispatch);
		}
	};
	return (
		<form>
			<input type="text" placeholder="Search Your Contact by Name or Email" onChange={handleChange} />
		</form>
	);
};

export default ContactFilter;
