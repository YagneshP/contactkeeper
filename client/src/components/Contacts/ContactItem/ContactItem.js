import React from 'react';
import { useContact, setCurrentContact, deleteContact } from '../../../Context/ContactContext/ContactState';
const ContactItem = (props) => {
	const contactDispatch = useContact()[1];

	const handleEditClick = () => {
		setCurrentContact(contactDispatch, props.contact);
	};
	const handleDeleteClick = () => {
		deleteContact(contactDispatch, props.contact._id);
	};
	const { name, email, phone, type } = props.contact;
	return (
		<div className="card bg-light">
			<h3 className="text-primary text-left">
				{name}
				<span
					style={{
						float: 'right'
					}}
					className={'badge ' + (type === 'professional' ? 'badge-success' : 'badge-primary')}
				>
					{type.charAt(0).toUpperCase() + type.slice(1)}
				</span>
			</h3>
			<ul className="list">
				{email && (
					<li>
						<i className="fas fa-at" /> {email}
					</li>
				)}
				{phone && (
					<li>
						<i className="fas fa-phone" /> {phone}
					</li>
				)}
			</ul>
			<p>
				<button className="btn btn-dark btn-sm" onClick={handleEditClick}>
					Edit
				</button>

				<button className="btn btn-danger btn-sm" onClick={handleDeleteClick}>
					Delete
				</button>
			</p>
		</div>
	);
};

export default ContactItem;
