/* All login related code
 * Including: sign in, and reset password
 */
var connection = require('./database');
var errorMessage = require('./message').errorMessage;

function userNameExsit(username, next) {
	connection.query('SELECT * FROM user WHERE username = ?', [username], function(err, rows, fields) {
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

function passwordMatch(username, password, next) {
	connection.query('SELECT password FROM user WHERE username = ?', [username], function(err, rows, fields) {
		if (!err) {
			if (rows[0].password == password) {
				next(null);
			} else {
				next(errorMessage.incorrectPassword);
			}
		} else {
			console.log(err);
			next(errorMessage.systemError);
		}
	});
};

function signIn(username, password, next) {
	userNameExsit(username, function(message) {
		if (!message) { // user exsit
			passwordMatch(username, password, function(message) {
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