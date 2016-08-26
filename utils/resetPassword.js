var connection = require('./database');
var login = require('./login');   // for using the password match funciton
var register = require('./register'); // for using the password format check function
var errorMessage = require('./message').errorMessage;

function confirmPasswordMatch(newPassword, confirmPassword) {
	return newPassword == confirmPasswordMatch;
};

function resetPassword(useremail, oldPassword, newPassword, confirmPassword, next) {
	// check if the oldPassword matches the one on the database
	login.passwordMatch(useremail, oldPassword, function(errorMessage) {
		if (errorMessage) {
			next(errorMessage);
			console.log(errorMessage);
		} else {
			if (!register.checkUserPassword(newPassword)) { //  new password format check
				next(errorMessage.invalidePassword);
			} else {
				if (!confirmPasswordMatch(newPassword, confirmPassword)) { // new password confirm match
					next(errorMessage.confirmPasswordMissmatch);
				} else {
					connection.query('UPDATE TABLE user SET password = ? WHERE email = ? ', [newPassword, useremail], function(err, rows, fields) {
						if (err) {
							console.log(err);
							next(errorMessage.systemError);
						} else {
							// password reset successful!
							next(null);
						}
					});
				}
			}
		}
	});
};

module.exports = {
	'resetPassword': resetPassword,
}