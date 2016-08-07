var mysql = require('mysql');
var fs = require('fs');
var glob = require('glob')
var path = require('path');


var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  multipleStatements: true
});

var connectionMessage = `
successfully connected to mysql
now start executing migration queries
*************************************
`;

connection.connect(function(err) {
	if (!err) {
		console.log(connectionMessage);
		setupDB();
		runUpgradeQuery();
		connection.end();
	} else {
		console.log(err);
		connection.end();
	}
});

var runUpgradeQuery = function() {
	glob.sync('**/query/*.js').forEach(function(file) {
		var queryFileImport = require(path.resolve(file));
		connection.query(queryFileImport.upgradeSql, function(err, rows, field) {
			if (!err) {
				console.log('running migration #' + queryFileImport.migration_number + ': ' + queryFileImport.upgradeDescription);
			} else {
				console.log(err);
			}
		});
	});
};

var setupDB = function() {
	var setup = `
		DROP DATABASE IF EXISTS organic_planting_club;
		CREATE DATABASE organic_planting_club;
		USE organic_planting_club;
	`;
	connection.query(setup, function(err, rows, field) {
		if (!err) {
			console.log('Creating database organic_planting_club');
		} else {
			console.log(err);
			connection.end();
		}
	});
}

var runDowngradeQuery = function() {
	// to be implemented
}
