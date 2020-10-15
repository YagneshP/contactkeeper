const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
	//GET the token from the header  *****  you can get it from "x-auth-token"
	const token = req.header('x-auth-token');
	//if there is no token deny auth
	if (!token) {
		return res.status(401).json({ msg: 'No token , authorization denied' });
	}
	//if there is token try and catch if the token is valid
	try {
		// jwt method "verify"  will take the "token" and "secret key" to decode the user from db
		const decoded = jwt.verify(token, config.get('secretJwt'));
		req.user = decoded.user;
		next();
	} catch (err) {
		res.status(401).json({ msg: 'Token is not valid' });
	}
};
