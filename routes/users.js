const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');

//=======================================// // This information required in Front End to get User Info //
//@route    GET api/users
//@desc     Find a user
//@access   Private
router.get('/', auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select('-password');
		res.json(user);
	} catch (err) {
		res.status(500).send('Server Error');
	}
});
//=======================================//
module.exports = router;