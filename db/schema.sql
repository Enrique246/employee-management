DROP DATABASE IF EXISTS employee_DB;
CREATE database employee_DB;

USE employee_DB;

CREATE TABLE department(   
    id INT (11) PRIMARY KEY AUTO_INCREMENT Not Null, 
    department_name VARCHAR(30) Not Null
);

CREATE TABLE role_employee (   
    id INT(11) PRIMARY KEY AUTO_INCREMENT Not Null,
    title VARCHAR(30) Not Null,
    salary DECIMAL(12,2) Not Null, 
    department_id INT Not Null 
);
CREATE TABLE employee (   
    id INT PRIMARY KEY AUTO_INCREMENT Not Null,
    first_name VARCHAR(30)Not Null,
    last_name VARCHAR(30)Not Null,
    role_id INT Not Null,
    manager_id INT 
);


SELECT * FROM department;