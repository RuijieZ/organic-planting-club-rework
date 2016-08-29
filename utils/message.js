// helper file that stores error message and success message

var errorMessage = {
	'invalidEmailFormat': '电子邮箱格式不正确，请重新输入',
	'invalidUserName': '用户名长度必须在6到20之间，并且只能由数字，字母和下划线组成',
	'invalidPassword': '密码长度必须在6到10之间',
	'registeredEmail': '该邮箱已被注册，请尝试另一个邮箱地址',
	'systemError': '系统出了一点故障，请重试或联系管理员',
	'userDoesNotExist': '此用户不存在',
	'incorrectPassword': '密码不正确，请重新输入',
	'confirmPasswordMissmatch': '确认密码必须和密码新密码相同，请重试',
	'resignIn': '请登录',
	'registeredUserName': '此用户名已被注册， 请尝试另一个用户名'
};

var successMessage = {
	'registerSuccess': '您刚刚获得了一个账号！现在请登录',
};

module.exports = {
	'errorMessage': errorMessage,
	'successMessage': successMessage
};