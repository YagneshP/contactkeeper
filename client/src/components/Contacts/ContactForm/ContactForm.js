import React, { useState, useContext, useEffect } from 'react';
import { useAlert, setAlert } from '../../../Context/AlertContext/AlertState';
import {
	useContact,
	addContact,
	updateContact,
	clearCurrentContact,
	clearContactError
} from '../../../Context/ContactContext/ContactState';
const ContactForm = () => {
	const [ contactState, contactDispatch ] = useContact();
	const [ alertState, alertDispatch ] = useAlert();
	const { current, error } = contactState;
	const [ contact, setContact ] = useState({
		email: '',
		phone: '',
		name: '',
		type: 'personal'
	});
	useEffect(
		() => {
			if (current !== null) {
				setContact(current);
			} else {
				setContact({
					email: '',
					phone: '',
					name: '',
					type: 'personal'
				});
			}
		},
		[ current ]
	);
	useEffect(
		() => {
			// if (isAuthenticated) {
			// 	props.history.push('/contacts');
			// }
			if (error) {
				console.log('Error in Contact form :', error);
				setAlert(alertDispatch, error, 'danger');
				clearContactError(contactDispatch);
			}
		},
		[ error, clearContactError, setAlert, alertDispatch ]
	);
	// submitting add contact
	const handleSubmit = (e) => {
		e.preventDefault();
		if (email === '' && phone === '') {
			setAlert(alertDispatch, 'Email or Phone is required', 'danger');
		}
		if (current === null) {
			addContact(contactDispatch, contact);
		} else {
			updateContact(contactDispatch, contact);
		}

		clearAll();
	};
	const clearAll = () => {
		setContact({
			email: '',
			phone: '',
			name: '',
			type: 'personal'
		});
		clearCurrentContact(contactDispatch);
	};
	const handleChange = (e) => {
		setContact({ ...contact, [e.target.name]: e.target.value });
	};

	const { name, email, phone, type } = contact;
	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input
					id="name"
					name="name"
					type="text"
					placeholder="Person's Name"
					value={name}
					onChange={handleChange}
				/>
				<input
					id="email"
					name="email"
					type="text"
					placeholder="Add Email Address"
					value={email}
					onChange={handleChange}
				/>
				<input
					id="phone"
					name="phone"
					type="text"
					placeholder="Add Phone Number"
					value={phone}
					onChange={handleChange}
				/>
				<h5>Content Type</h5>
				<input
					type="radio"
					name="type"
					value="personal"
					checked={type === 'personal'}
					onChange={handleChange}
				/>Personal
				<input
					type="radio"
					name="type"
					value="professional"
					checked={type === 'professional'}
					onChange={handleChange}
				/>Professional
				<div>
					<input
						type="submit"
						value={current ? 'Update Contact' : 'Add Contact'}
						className="btn btn-primary btn-block"
					/>
				</div>
				{current && (
					<div>
						<button className="btn btn-light btn-block" onClick={clearAll}>
							Clear
						</button>
					</div>
				)}
			</form>
		</div>
	);
};

export default ContactForm;
