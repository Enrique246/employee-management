USE employee_DB;

-- Department Seeds
INSERT INTO department (id,deparment_name) VALUES ("1","Accounting");
INSERT INTO department (id,deparment_name) VALUES ("2","Marketing");
INSERT INTO department (id,deparment_name) VALUES ("3","Human Resources");

-- Role Seeds
INSERT INTO role_employee (id, title, salary, department_id) VALUES ("1","ACCOUNTANT","3000","1");
INSERT INTO role_employee (id, title, salary, department_id) VALUES ("2","DEVELOPER","4000","2");
INSERT INTO role_employee (id, title, salary, department_id) VALUES ("3","RECRUITER","5000","3");

-- Employee Seeds
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES ("1","Sofia","Hernandez","1","1");
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES ("2","Enrique","Fernandez","2","2");
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES ("3","Esteban","Hernandez","3","3");

