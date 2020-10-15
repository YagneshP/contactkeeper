import React, { useEffect, useContext, Fragment } from 'react';
import ContactItem from './ContactItem/ContactItem';
import Spinner from '../Layout/Spinner/Spinner';

import { useContact, getContacts } from '../../Context/ContactContext/ContactState';
const Contacts = () => {
	const [ contactState, contactDispatch ] = useContact();

	const { contacts, loading, filtered } = contactState;
	useEffect(
		() => {
			getContacts(contactDispatch);
		},
		[ contactDispatch ]
	);
	if (!loading && contacts !== null && contacts.length === 0) {
		return <h3>Please Add Contacts</h3>;
	}

	return (
		<Fragment>
			{contacts !== null && !loading ? filtered !== null && filtered.length !== 0 ? (
				<div>{filtered.map((contact) => <ContactItem key={contact._id} contact={contact} />)}</div>
			) : filtered !== null && filtered.length === 0 ? (
				<div style={{ textAlign: 'center' }}>
					<h3>No Match found</h3>
				</div>
			) : (
				<div>{contacts.map((contact) => <ContactItem key={contact._id} contact={contact} />)}</div>
			) : (
				<div style={{ textAlign: 'center' }}>
					<Spinner />
				</div>
			)}
		</Fragment>
	);
};

export default Contacts;
