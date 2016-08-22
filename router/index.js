var express = require('express');
var router = express.Router();
var register = require('../utils/register');
var login = require('../utils/login');

var successMessage = ['您刚刚获得了一个账号！现在请登录'];

router.get('/', function(req, res) {
	res.render('index');
}); 

router.get('/index', function(req, res) {
	res.render('index');
}); 

router.get('/about', function(req, res) {
	res.render('about');
}); 

router.get('/contact', function(req, res) {
	res.render('contact');
});

router.route('/login')
	.get(function(req, res) {
		res.render('login', {message: ''});
	})
	.post(function(req, res) {
		userEmail = req.body.userEmail;
		password = req.body.password;
		login.signIn(userEmail, password, function(errorMessage) {
			if (errorMessage) {
				res.render('login', {message: errorMessage});
			} else {
				res.render('about');
			}
		});
	});

router.route('/register')
	.get(function(req, res) {
		res.render('register', {message: ''});
	})
	.post(function(req, res) {
		userEmail = req.body.userEmail;
		password = req.body.password;
		username = req.body.username;
		register.register(userEmail, password, username, function(errorMessage) {
			if (errorMessage) {
				res.render('register', {message: errorMessage});
			} else {
				res.render('login', {message: successMessage[0]});
			}
		});	
	});

module.exports = router;