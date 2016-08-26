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

// validate is a middle ware that first exam the cookies sent
function validate(req, res, next) {
	console.log(req.cookies);
	if (!req.cookies.OPC_token) {
		req.validation = false;
		next();
	}
	try {
		var session = jwt.decode(req.cookies.OPC_token.token, privateKey);
		req.validation = true;
		console.log(session);
		next();
	} catch(err) {
		req.validation = false;
		console.log(err);
		next(err);
	}
	return;
};

module.exports = {
	'authenticate': authenticate,
	'validate': validate
};