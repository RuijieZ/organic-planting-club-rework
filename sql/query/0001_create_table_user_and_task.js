var upgradeSql = `
			
CREATE TABLE user (  
	id INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
	email VARCHAR(80),
	password VARCHAR(80),
	username VARCHAR(80),
	PRIMARY KEY (id),
	UNIQUE (email),
	UNIQUE (username)
);

CREATE TABLE task (
    id INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    name NVARCHAR(255),
    account_id INTEGER UNSIGNED,
    description NVARCHAR(3000),
    creater_id INTEGER UNSIGNED,
    assignee_id INTEGER UNSIGNED,
    PRIMARY KEY (id)
);
`
var downgradeSql = `
DROP TABLE task;
DROP TABLE user;
`
var upgradeDescription = "Now creating table user and task"
var downgradeDescription = "Now dropping table user and task"

module.exports = {
	'upgradeSql': upgradeSql,
	'downgradeSql': downgradeSql,
	'upgradeDescription': upgradeDescription,
	'downgradeDescription': downgradeDescription,
	'migration_number': '0001'
}