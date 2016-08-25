var jwt = require('jwt-simple'),
	moment = require('moment'),
    login = require('./login');

var privateKey = "hardcoded_key_for_now";

function authenticate(email, password, next) {
	login.signIn(email, password, function(errMessage) {
		if (!errMessage) {
			console.log('signIn successful!');
			var token = jwt.encode({
  				userEmail: email,
  				exp: moment().add('days', 1).valueOf(), // token expires in one day
			}, privateKey);
			next(null, token);
		} else {
			console.log('authentication fails');
			next(errMessage, null);
		} 
	});
};

module.exports = {
	'authenticate': authenticate,
};