# DB init 
DROP TABLE IF EXISTS account_log;
DROP TABLE IF EXISTS pay_method;
DROP TABLE IF EXISTS category;
DROP TABLE IF EXISTS member;

CREATE TABLE member (
	memno INT(11) NOT NULL AUTO_INCREMENT,
	uid VARCHAR(50) NOT NULL,
	pw VARCHAR(50) NOT NULL,
	mname VARCHAR(50) NOT NULL,
	email VARCHAR(255) NOT NULL,
	create_time DATETIME NOT NULL,
	PRIMARY KEY (memno),
	UNIQUE INDEX id (uid)
)
COLLATE='utf8_general_ci'
ENGINE=InnoDB
;

CREATE TABLE category (
	cateno INT(11) NOT NULL AUTO_INCREMENT,
	catename VARCHAR(100) NOT NULL DEFAULT '0',
	iemode CHAR(1) NOT NULL DEFAULT '0',
	PRIMARY KEY (cateno)
)
COLLATE='utf8_general_ci'
ENGINE=InnoDB
;

CREATE TABLE pay_method (
	payno INT(11) NOT NULL AUTO_INCREMENT,
	payname VARCHAR(100) NOT NULL DEFAULT '0',
	memno INT(11) NULL DEFAULT NULL,
	PRIMARY KEY (payno),
	INDEX FK_pay_method_member (memno),
	CONSTRAINT FK_pay_method_member FOREIGN KEY (memno) REFERENCES member (memno)
)
COLLATE='utf8_general_ci'
ENGINE=InnoDB
;

CREATE TABLE account_log (
	logno INT(11) NOT NULL AUTO_INCREMENT,
	iemode CHAR(1) NOT NULL,
	memno INT(11) NOT NULL,
	cateno INT(11) NULL DEFAULT NULL,
	payno INT(11) NULL DEFAULT NULL,
	money INT(11) NOT NULL,
	memo VARCHAR(100) NOT NULL,
	rdate DATETIME NOT NULL,
	PRIMARY KEY (logno),
	INDEX FK_transaction_category (cateno),
	INDEX FK_transaction_pay_method (payno),
	INDEX FK_account_log_member (memno),
	CONSTRAINT FK_account_log_member FOREIGN KEY (memno) REFERENCES member (memno),
	CONSTRAINT FK_transaction_category FOREIGN KEY (cateno) REFERENCES category (cateno),
	CONSTRAINT FK_transaction_pay_method FOREIGN KEY (payno) REFERENCES pay_method (payno)
)
COLLATE='utf8_general_ci'
ENGINE=InnoDB
;