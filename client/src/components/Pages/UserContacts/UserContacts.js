import React from 'react';
import ContactForm from '../../Contacts/ContactForm/ContactForm';
import ContactFilter from '../../Contacts/ContactFilter/ContactFilter';
import Contacts from '../../Contacts/Contacts';

const UserContacts = () => {
	return (
		<div className="grid-2">
			<div>
				<ContactForm />
			</div>
			<div>
				<ContactFilter />
				<Contacts />
			</div>
		</div>
	);
};

export default UserContacts;
