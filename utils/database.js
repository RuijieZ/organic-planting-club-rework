/*
 * This is the helper file for accessing mysql database
 */

var mysql = require('mysql');
var connection = mysql.createConnection({
	host     : 'localhost',
  	user     : 'root',
  	password : '123456',
  	database : 'organic_planting_club',
  	multipleStatements: true
});

connection.connect(function(err) {
	if (!err) {
		console.log('successfully connected to database');
	} else {
		console.log(err);
		connection.end();
	}
});

module.exports = connection;
