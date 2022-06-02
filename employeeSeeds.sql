DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;
USE employee_db;

CREATE TABLE department(
  id INT AUTO_INCREMENT NOT NULL,
  name VARCHAR(30),
  PRIMARY KEY (id)
);

insert into department (name) values
("Transportation"),
("Warehouse"),
("Admin"),
("Inventory"),
("Purchasing");


CREATE TABLE role(
  id INT AUTO_INCREMENT NOT NULL,
  title VARCHAR(30),
  salary DECIMAL(10, 2),
  department_id INT,
  PRIMARY KEY (id)
);

insert into role(department_id, title, salary)
values
(2, "Stocker", 40000),
(1, "Lumper", 36000),
(4, "Inventory control", 45000),
(1, "Loader", 45000),
(2, "Selector", 38000),
(2, "Full Case", 450000),
(2, "Freezer selector", 46000),
(3, "Supervisor", 55000),
(3, "Lead", 49000);



CREATE TABLE employee(
  id INT(11) AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT NOT NULL,
  manager_id INT,
  PRIMARY KEY (id)
);

insert into employee(first_name, last_name, role_id, manager_id)
values
("Diana", "Mancillias", 3, 2),
("Chance", "Payne", 3, 1),
("Mike", "Walker", 2, 2),
("Henry", "Jerman", 3, 1),
("Kenny", "Freeman", 2, 2),
("Cristin", "Mayo", 2, 1),
("Albert", "Franco", 2, 2),
("Reuben", "Mendoza", 1, 2),
("Joe", "Sanchez", 4, 2),
("Tiwarren", "Crockett", 1, 4);