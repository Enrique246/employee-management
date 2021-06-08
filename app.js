//require mysql and inquirer
const path = require ("path");
let mysql = require ('mysql');
let inquirer = require('inquirer');
const connection = require('./config/connection');

//Error detection

connection.connect(function(err){
    if(err) throw err;
    console.log(`Connected with id number ${connection.threadId}`);
    init()
})

//Initialization function
function init(){
    console.log('Hello I am the Employee Management System')
    whatTo();
}
//What would you like to do prompts

function whatTo(){
    inquirer.prompt([{
        type: "list",
        name: "Todo",
        message:"Choose from the option list",
        choices: [       
{
    name:"Show Departments",
    value:"show_depart"
},
{
    name:"Show Roles",
    value:"show_roles"
},
{
    name:"Show Employees",
    value:"show_emp"

            },
{
   name:"Add employee",
    value:"add_emp"
            
                        },
{
    name:"Update Employee",
    value:"update_emp"

            },
 {
    name:"Add Role",
    value:"add_role"
            
                        },
{
     name:"Add Department",
     value:"add_depart"
                        },  
{
    name:"Update Role",
     value:"update_role"
}                                            
        ]              
       
    }]) .then(({Todo})=>{
        if(Todo === "show_depart"){
            showDepart()
        } else if (Todo === "add_role"){
        addRole();
        }
        else if (Todo === "add_emp"){
            addEmp();
            }
        else if (Todo === "add_depart"){
        addDepart();
        }
        else if (Todo === "update_emp"){
            updateEmp();
            }
        else if (Todo === "update_role"){
        updateRole();
        }
        else if (Todo === "show_roles"){
            showRole();
            }
        else if (Todo === "show_emp"){
        showEmp();
        }
    })
}

//Show Departments
function showDepart(){
    console.log("I am selecting all departments...\n");
    connection.query("SELECT id AS `ID`, department_name AS `Department` FROM department", function (err,res){
    if (err) throw err;

    console.table(res);
    allFinished();
});
}
//Show Roles
function showRole(){
    console.log("I am selecting all roles...\n");
    connection.query("SELECT title AS `Title`, salary AS `Salary`, department_id AS `Department ID` FROM role_employee" , function (err,res){
    
    if (err) throw err;

    console.table(res);
    allFinished();
});
}
//Show Employees
function showEmp(){
    console.log("I am selecting all employees...\n");
    connection.query("SELECT first_name AS `First Name`, last_name AS `Last Name`, manager_id  AS `Manager ID`, role_id  AS `Role ID` FROM employee" , function (err,res){
        // id INT PRIMARY KEY AUTO_INCREMENT Not Null,
        // first_name VARCHAR(30)Not Null,
        // last_name VARCHAR(30)Not Null,
        // role_id INT Not Null,
        // manager_id INT Not Null, 
        // PRIMARY KEY (id)
    if (err) throw err;

    console.table(res);
    allFinished();
});
}
//Update role
//Add employee
//Update Employee
//Update Role
//Add Department
//Add Role
//All finished function
function allFinished(){
inquirer.prompt([
{
    type:"list",
    name:"goon",
    message: "Would you like to do something else?",
    choices:[
{
    name: "Yes",
    value:true
},
{
    name:"No",
    value: false
        }

    ]
}
]).then(function(answers){
    if (answers.goon){
        whatTo()
    }else {
        console.log(`See you!`)
        process.exit();
    }
})

}