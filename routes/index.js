
/*
 * GET home page.
 */

exports.index = function(req, res){
	res.render('index');
};

exports.home = function(req, res){
	res.render('home');
};

exports.contact = function(req, res) {
	res.render('contact');
};

exports.about = function(req, res) {
	res.render('about');
};

exports.login = function(req, res) {
	res.render('login');
};