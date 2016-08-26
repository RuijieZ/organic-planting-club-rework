/* All the register related code
 * Including: sign in, logout, register, reset password
 */
var connection = require('./database');
var errorMessage = require('./message').errorMessage;

function checkUserEmail(email) {
	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

function checkUserName(username) {
	return username.match(/(\w)+/) && username.length >= 6 && username.length <= 20;
};

function checkUserPassword(password) {
	// for now, we only require the user's password is greater than or equal to 6
	return password.length >= 6;
};

function checkDuplicateUserEmail(email, next) {
	connection.query('SELECT * FROM user WHERE email = ?', [email], function(err, rows, field) {
		if(!err) {
			if(rows.length ==0) {
				next(null);
			} else {
				next(errorMessage.registeredEmail);
			}
		} else {
			console.log(err);
			next(errorMessage.systemError);
		}
	});
};

function register(email, password, username, next) {
	if (!checkUserEmail(email)) {
		next(errorMessage.invalidEmailFormat);
	} else if (!checkUserName(username)) {
		next(errorMessage.invalidUserName);
	} else if (!checkUserPassword(password)) {
		next(errorMessage.invalidPassword);
	} else {
		checkDuplicateUserEmail(email, function(message) {
			if (message) { // some type of error has appended
				next(message);
				console.log(message);
			} else {
				connection.query('INSERT INTO user (email, password, username) VALUES (?, ?, ?)', [email, password, username], function(err, rows, field) {
					if (!err){
						console.log('user ' + email + ' saved!');
						next(null);
					} else {
						console.log(err);
						next(errorMessage,systemError);
					}
	        	});
			}
		});
	}
};

module.exports = {
	'register': register,
	'checkUserPassword': checkUserPassword
};
