const mongoose = require('mongoose');
const bcypt = require('bcryptjs');
const UserSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	Date: {
		type: Date,
		default: Date.now
	}
});

//******before saving the user this "pre" hook will hash the password and save it to DB *****//

//==== we need to use "function" key word to get "this" instance means User instance ===//
UserSchema.pre('save', async function(next) {
	const salt = await bcypt.genSalt(10); // creating salt "genSalt" async process
	this.password = await bcypt.hash(this.password, salt);
	next();
});

//**************** Static method to login user ********************/

UserSchema.statics.login = async function(email, password) {
	const user = await this.findOne({ email });
	if (user) {
		const isMatch = await bcypt.compare(password, user.password);
		if (isMatch) {
			return user;
		}

		throw Error('Incorrect Credentials');
	}

	throw Error('Incorrect Credentials');
};
module.exports = mongoose.model('user', UserSchema);
