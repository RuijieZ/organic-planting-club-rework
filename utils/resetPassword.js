var connection = require('./database');
var login = require('./login');   // for using the password match funciton
var register = require('./register'); // for using the password format check function
var errorMessage = require('./message').errorMessage;

function confirmPasswordMatch(newPassword, confirmPassword) {
	return newPassword == confirmPasswordMatch;
};

function resetPassword(useremail, oldPassword, newPassword, confirmPassword, next) {
	if (!register.checkUserPassword(newPassword)) {
		return next('error message');
	} else {

	});
}