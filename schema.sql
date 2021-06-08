DROP DATABASE IF EXISTS employee_DB;
CREATE database employee_DB;

USE employee_DB;

CREATE TABLE department (   
    id INT PRIMARY KEY AUTO_INCREMENT Not Null, 
    deparment_name VARCHAR(30) Not Null,
    PRIMARY KEY (id)
);

CREATE TABLE role_employee (   
    id INT PRIMARY KEY AUTO_INCREMENT Not Null,
    title VARCHAR(30) Not Null,
    salary DECIMAL Not Null, 
    department_id INT Not Null, 
    PRIMARY KEY (id)
);
CREATE TABLE employee (   
    id INT PRIMARY KEY AUTO_INCREMENT Not Null,
    first_name VARCHAR(30)Not Null,
    last_name VARCHAR(30)Not Null,
    role_id INT Not Null,
    manager_id INT Not Null, 
    PRIMARY KEY (id)
);


SELECT * FROM deparment;