const mysql = require ('mysql');

//Connect to SQL database

module.exports = mysql.createConnection({
    host: "localhost",
    port: 3003,
//User and password
    user: "root",
    password:"root",
    database: 'employee_db'
});