/* All the register related code
 * Including: sign in, logout, register, reset password
 */
var connection = require('./database');
var errorMessage = ['电子邮箱格式不正确，请重新输入',
					'用户名长度必须在6到20之间，并且只能由数字，字母和下划线组成',
					'密码长度必须在6到10之间',
					'该邮箱已被注册，请尝试另一个邮箱地址',
					'系统出了一点故障，请重试或联系管理员'];
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
				next(errorMessage[3]);
			}
		} else {
			console.log(err);
			next(errorMessage[4]);
		}
	});
};

function register(email, password, username, next) {
	if (!checkUserEmail(email)) {
		next(errorMessage[0]);
	} else if (!checkUserName(username)) {
		next(errorMessage[1]);
	} else if (!checkUserPassword(password)) {
		next(errorMessage[2]);
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
						next(errorMessage[4]);
					}
	        	});
			}
		});
	}
};

module.exports = {
	'register': register
};
