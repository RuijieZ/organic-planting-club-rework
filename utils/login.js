/* All login related code
 * Including: sign in, and reset password
 */
var connection = require('./database');
var errorMessage = require('./message').errorMessage;

function userEmailExsit(email, next) {
	connection.query('SELECT * FROM user WHERE email = ?', [email], function(err, rows, fields) {
		if (!err) {
			if (rows.length == 1) {
				next(null);
			} else { // user does not exist
				next(errorMessage.userDoesNotExist);
			}
		} else {
			console.log(err);
			next(errorMessage.systemError);
		}
	});
};

function passwordMatch(email, password, next) {
	connection.query('SELECT password FROM user WHERE email = ?', [email], function(err, rows, fields) {
		if (!err) {
			if (rows[0].password == password) {
				next(null);
			} else {
				next(errorMessage.userDoesNotExist);
			}
		} else {
			console.log(err);
			next(errorMessage.systemError);
		}
	});
};

function signIn(email, password, next) {
	userEmailExsit(email, function(message) {
		if (!message) { // user exsit
			passwordMatch(email, password, function(message) {
				if(!message) { // password match
					next(null);
				} else {
					next(message);
				}
			});
		} else {
			next(message);
		}
	});
};

module.exports = {
	'signIn': signIn,
	'passwordMatch': passwordMatch,
};