/* All login related code
 * Including: sign in, logout
 */
var connection = require('./database');
var errorMessage = ['此用户不存在', '密码不正确，请重新输入', '系统出现了一些故障，请联系管理员'];

function userEmailExsit(email, next) {
	connection.query('SELECT * FROM user WHERE email = ?', [email], function(err, rows, fields) {
		if (!err) {
			if (rows.length == 1) {
				next(null);
			} else { // user does not exist
				next(errorMessage[0]);
			}
		} else {
			console.log(err);
			next(errorMessage[2]);
		}
	});
};

function passwordMatch(email, password, next) {
	connection.query('SELECT password FROM user WHERE email = ?', [email], function(err, rows, fields) {
		if (!err) {
			if (rows[0].password == password) {
				next(null);
			} else {
				next(errorMessage[1]);
			}
		} else {
			console.log(err);
			next(errorMessage[2]);
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
	'signIn': signIn
};