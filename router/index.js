var express = require('express');
var router = express.Router();
var register = require('../utils/register');
var auth = require('../utils/authentication');
var resetPassword = require('../utils/resetPassword');
var successMessage = require('../utils/message').successMessage;
var errorMsg = require('../utils/message').errorMessage;

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

router.route('/resetPassword')
	.get(function(req, res) {
		res.render('resetPassword');
	})
	.post(function(req, res) {
		// resetPassword.resetPassword()
	});

router.route('/login')
	.get(auth.validate, function(req, res) {
		if (req.validation) {
			res.redirect('app');
		} else {
			res.render('login', {message: errorMsg.resignIn});
		}
	})
	.post(function(req, res) {
		userEmail = req.body.userEmail;
		password = req.body.password;
		auth.authenticate(userEmail, password, function(errorMessage, token) {
			if (errorMessage) {
				res.render('login', {message: errorMessage});
			} else {
				res.cookie("OPC_token", {
					"token": token,
					"status": 202
				});
				res.redirect('app');
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
				res.render('login', {message: successMessage.registerSuccess});
			}
		});
	});

router.get('/app', function(req, res) {
	res.render('app');
})

module.exports = router;