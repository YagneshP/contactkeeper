const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');
const { check } = require('express-validator');

//@route    POST api/auth
//@desc     Register the user
//@access   Private

router.post(
	'/signup',
	[
		check('name', 'Please add name').not().isEmpty(),
		check('email', 'Please include a valid email').isEmail(),
		check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
	],
	authController.signup_post
);

//@route    POST api/auth
//@desc     Login the user
//@access   Private

router.post(
	'/login',
	[ check('email', 'Please include a valid email').isEmail(), check('password', 'Password is required').exists() ],
	authController.login_post
);

module.exports = router;
