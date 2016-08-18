var express = require('express');
var router = express.Router();

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

router.get('/login', function(req, res) {
	res.render('login');
}); 

router.route('/register')
	.get(function(req, res) {
		res.render('register');
	})
	.post(function(req, res) {
		console.log(req.body.userEmail);
		console.log(req.body.password);
		res.render('about');
	});

module.exports = router;