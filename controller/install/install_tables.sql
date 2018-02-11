
USE Ziffy;

CREATE TABLE user_role (
	id INT NOT NULL AUTO_INCREMENT,
	role_name varchar(50) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE country (
	id INT NOT NULL AUTO_INCREMENT,
	country_name varchar(100) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE state (
	id INT NOT NULL AUTO_INCREMENT,
	country_id INT NOT NULL,
	state_name varchar(100) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE city (
	id INT NOT NULL AUTO_INCREMENT,
	state_id INT NOT NULL,
	city_name varchar(100) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE device (
	id INT NOT NULL AUTO_INCREMENT,
	device_name varchar(50) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE user_tbl (
	id INT NOT NULL AUTO_INCREMENT,
	fname varchar(50) NOT NULL,
	lname varchar(50) NOT NULL,
	gender varchar(50) NOT NULL,
	user_email varchar(100) NOT NULL,
	user_role INT NOT NULL,
	country_code INT NOT NULL,
	state_code INT NOT NULL,
	city_code INT NOT NULL,
	postal_code INT NOT NULL,
	user_name varchar(30) NOT NULL UNIQUE,
	password varchar(50) NOT NULL,
	promotion_code varchar(50) NOT NULL UNIQUE,
	PRIMARY KEY (id)
);

CREATE TABLE User_tokens (
	user_id INT NOT NULL,
	device_type INT NOT NULL,
	device_token varchar(30) NOT NULL,
	socket_token varchar(30) NOT NULL,
	PRIMARY KEY (user_id)
);

CREATE TABLE service_category (
	id INT NOT NULL AUTO_INCREMENT,
	service_name varchar(100) NOT NULL,
	unit_price INT NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE job_status (
	id INT NOT NULL AUTO_INCREMENT,
	status varchar(100) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE job_requests (
	id INT NOT NULL AUTO_INCREMENT,
	service_category INT NOT NULL,
	requested_by INT NOT NULL,
	job_status INT NOT NULL,
	job_accepter INT NOT NULL,
	job_requested_time DATETIME NOT NULL,
	job_accepted_time DATETIME NOT NULL,
	job_completed_time DATETIME NOT NULL,
	requester_comment varchar(250) NOT NULL,
	accepter_comment varchar(250) NOT NULL,
	job_location varchar(250) NOT NULL,
	job_hour INT NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE payout_details (
	id INT NOT NULL AUTO_INCREMENT,
	job_id INT NOT NULL,
	working_hours INT NOT NULL,
	payment_status INT NOT NULL,
	total_bill_amount INT NOT NULL,
	payment_mode INT NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE payment_mode (
	id INT NOT NULL AUTO_INCREMENT,
	payment_option varchar(100) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE payment_status (
	id INT NOT NULL AUTO_INCREMENT,
	status varchar(100) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE credit_available (
	id INT NOT NULL AUTO_INCREMENT,
	credit INT NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE discounts (
	id INT NOT NULL AUTO_INCREMENT,
	promo_code varchar(50) NOT NULL UNIQUE,
	expire_on DATETIME NOT NULL,
	discount_cap INT NOT NULL,
	description varchar(200) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE discount_type (
	id INT NOT NULL AUTO_INCREMENT,
	type varchar(50) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE discount_taken (
	user_id INT NOT NULL,
	redemption_date DATETIME NOT NULL,
	discount_type INT NOT NULL,
	promo_code varchar(50) NOT NULL
);

ALTER TABLE state ADD CONSTRAINT state_fk0 FOREIGN KEY (country_id) REFERENCES country(id);

ALTER TABLE city ADD CONSTRAINT city_fk0 FOREIGN KEY (state_id) REFERENCES state(id);

ALTER TABLE user_tbl ADD CONSTRAINT user_tbl_fk0 FOREIGN KEY (user_role) REFERENCES user_role(id);

ALTER TABLE user_tbl ADD CONSTRAINT user_tbl_fk1 FOREIGN KEY (country_code) REFERENCES country(id);

ALTER TABLE user_tbl ADD CONSTRAINT user_tbl_fk2 FOREIGN KEY (state_code) REFERENCES state(id);

ALTER TABLE user_tbl ADD CONSTRAINT user_tbl_fk3 FOREIGN KEY (city_code) REFERENCES city(id);

ALTER TABLE User_tokens ADD CONSTRAINT User_tokens_fk0 FOREIGN KEY (user_id) REFERENCES user_tbl(id);

ALTER TABLE User_tokens ADD CONSTRAINT User_tokens_fk1 FOREIGN KEY (device_type) REFERENCES device(id);

ALTER TABLE job_requests ADD CONSTRAINT job_requests_fk0 FOREIGN KEY (service_category) REFERENCES service_category(id);

ALTER TABLE job_requests ADD CONSTRAINT job_requests_fk1 FOREIGN KEY (requested_by) REFERENCES user_tbl(id);

ALTER TABLE job_requests ADD CONSTRAINT job_requests_fk2 FOREIGN KEY (job_status) REFERENCES job_status(id);

ALTER TABLE job_requests ADD CONSTRAINT job_requests_fk3 FOREIGN KEY (job_accepter) REFERENCES user_tbl(id);

ALTER TABLE payout_details ADD CONSTRAINT payout_details_fk0 FOREIGN KEY (job_id) REFERENCES job_requests(id);

ALTER TABLE payout_details ADD CONSTRAINT payout_details_fk1 FOREIGN KEY (payment_status) REFERENCES payment_status(id);

ALTER TABLE payout_details ADD CONSTRAINT payout_details_fk2 FOREIGN KEY (payment_mode) REFERENCES payment_mode(id);

ALTER TABLE credit_available ADD CONSTRAINT credit_available_fk0 FOREIGN KEY (id) REFERENCES user_tbl(id);

ALTER TABLE discount_taken ADD CONSTRAINT discount_taken_fk0 FOREIGN KEY (user_id) REFERENCES user_tbl(id);

ALTER TABLE discount_taken ADD CONSTRAINT discount_taken_fk1 FOREIGN KEY (discount_type) REFERENCES discount_type(id);
