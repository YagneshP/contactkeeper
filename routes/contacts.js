const express = require('express');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const Contact = require('../models/Contact');
const router = express.Router();

//=======================================//

//@route    POST api/contacts
//@desc     Add contact for the user
//@access   Private

router.post(
	'/',
	[
		auth,
		[
			//passing array of middleware
			check('name', 'Name is required').not().isEmpty()
		]
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ msg: errors.errors[0].msg });
		}
		const { email, name, phone, type } = req.body;
		try {
			const newContact = new Contact({
				name,
				email,
				phone,
				type,
				user: req.user.id
			});
			const contact = await newContact.save();
			res.json(contact);
		} catch (err) {
			res.status(500).send('Server Error');
		}
	}
);

//=======================================//

//@route    GET api/contacts
//@desc     Get contacts for the user
//@access   Private

router.get('/', auth, async (req, res) => {
	try {
		const contacts = await Contact.find({ user: req.user.id }).sort({
			date: 1
		});
		res.json(contacts);
	} catch (err) {
		console.log(err.message);
		res.status(500).send('Server Error');
	}
});

//=============Updating Contact ==========================//

//@route    PUT api/contacts
//@desc     Update contact for the user
//@access   Private

router.put('/:id', auth, async (req, res) => {
	const { name, email, phone, type } = req.body;
	const contactField = {};
	if (name) contactField.name = name;
	if (email) contactField.email = email;
	if (type) contactField.type = type;
	if (phone) contactField.phone = phone;

	try {
		let foundContact = await Contact.findById(req.params.id);
		if (!foundContact) {
			return res.status(401).json({ msg: 'Contact not found' });
		}

		//getting "req.user" from auth and foundContact user id will be object
		if (foundContact.user.toString() !== req.user.id) {
			return res.status(404).json({ msg: 'Not Authorized' });
		}
		foundContact = await Contact.findByIdAndUpdate(req.params.id, { $set: contactField }, { new: true });

		return res.json(foundContact);
	} catch (error) {
		console.log(error.message);
		res.status(500).send('Server Error');
	}
});

//===============Delete Contact========================//

//@route    DELETE api/contacts
//@desc     Update contact for the user
//@access   Private

router.delete('/:id', auth, async (req, res) => {
	try {
		let foundContact = await Contact.findById(req.params.id);

		if (!foundContact) return res.status(404).json({ msg: 'Contact not found' });

		if (foundContact.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: 'Not authorizied' });
		}
		await Contact.findByIdAndRemove(req.params.id);
		res.status(201).json({ msg: 'Contact has removed' });
	} catch (err) {
		console.log(err.message);
		return res.status(500).send('Server Error');
	}
});

module.exports = router;
