const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const config = require('config');

//============== Sign Up User Request =======================//

//check validation and user credential while signup  and create new User

module.exports.signup_post = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ msg: errors.errors[0].msg });
	}
	const { name, email, password } = req.body; // get the email and password from the body

	try {
		//first check the user already exists
		let user = await User.findOne({ email });

		if (user) {
			return res.status(400).json({ msg: 'User already exists' });
		}
		user = await User.create({ email, password, name });

		const payload = {
			user: {
				id: user.id
			}
		};
		const maxAge = 3 * 24 * 60 * 60;
		jwt.sign(
			payload,
			config.get('secretJwt'),
			{
				expiresIn: maxAge
			},
			(err, token) => {
				if (err) throw err;
				res.status(201).json({ token });
			}
		);
	} catch (err) {
		res.status(500).send('Server Error');
	}
};

//=============== Login User Request ==================//

module.exports.login_post = async (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({ msg: errors.errors[0].msg });
	}
	const { email, password } = req.body;
	try {
		try {
			let user = await User.login(email, password);

			const payload = {
				user: {
					id: user.id
				}
			};
			const maxAge = 3 * 24 * 60 * 60;
			jwt.sign(
				payload,
				config.get('secretJwt'),
				{
					expiresIn: maxAge
				},
				(err, token) => {
					if (err) throw err;

					res.status(200).json({ token });
				}
			);
		} catch (error) {
			return res.status(401).json({ msg: error.message });
		}
	} catch (err) {
		return res.status(500).json({ msg: 'Server Error' });
	}
};
