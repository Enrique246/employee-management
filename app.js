//require mysql and inquirer
const path = require ("path");
const mysql = require ('mysql');
const inquirer = require('inquirer');
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
function updateRole(){
    connection.query("SELECT * FROM role_employee",function (err,res){
        if (err) throw err;
        const role = res.map(element => {
            return element.id
        })

inquirer
.prompt([
    {
        type:"input",
        name:"first_name",
        message: "What is the employee first name?"
    },
    {
        type:"input",
        name:"last_name",
        message: "What is the employee last name?"
    },
    {
        type:"list",
        name:"role_id",
        message: "What is the role ID?",
        choices: role
    }
])
.then(function(answer){
    connection.query(
        "INSERT INTO employee SET ?",
        answer,
        function(err){
                if (err) throw err;
                console.log(`${answer.first_name}${answer.last_name} was added!`);
                allFinished();
            }
    )
})

})
}
//Add employee
function addEmp(){
    connection.query("SELECT id, title, department_id FROM role_employee",function(err,res){
        if (err) throw err;
        const role=res.map(element=>element.title)
        const man=res.map(element=>element.department_id)
        // console.log("MANAGER: ", man)
        // console.log(res)
        inquirer.prompt([
            {
                type:"input",
                name:"first_name",
                message: "What is the employee first name?"
            },
            {
                type:"input",
                name:"last_name",
                message: "What is the employee last name?"
            },
            {
                type:"list",
                name:"role",
                message: "What is the title of their role?",
                choices: role
            },
            {
                type:"list",
                name:"man",
                message: "What is the id of their manager?",
                choices: man
            }
        ]).then(answers=>{
            // console.log(answers)
            const chRole=res.find(element=>{
                return element.title===answers.role
                //return element.title.toUpperCase()===answers.role.toUpperCase()
            });
            const chMan=res.find(element=>{
                return element.department_id===answers.man
            });
            console.log(chRole.id,chMan.department_id);
            // console.log(chRole.id,chMan.manager_id);
            const newEmployee={
                first_name: answers.first_name,
                last_name: answers.last_name,
                role_id: chRole.id,
                manager_id: chMan.department_id
            };
            // id INT PRIMARY KEY AUTO_INCREMENT Not Null,
        // first_name VARCHAR(30)Not Null,
        // last_name VARCHAR(30)Not Null,
        // role_id INT Not Null,
        // manager_id INT Not Null, 
        // PRIMARY KEY (id)
        connection.query("INSERT INTO employee SET ?", newEmployee,(err)=>{
            if (err) throw err;
            console.log(`${newEmployee.first_name} has been added successfully!`);
            allFinished();
        })
        })
    })
}
//Update Employee
//Add Department
function addDepart(){
    connection.query("SELECT * FROM departments", function(err, res){
        if (err) throw err;
        const department= res.map(element=>{
            return element.id
        })
        inquirer
        .prompt([
            {
                name:"department",
                type:"input",
                message:"Insert the new department"
            }
        ]).then(function(answer){
            connection.query(
                "INSERT INTO department SET ?",
                answer,
                function(err){
                    if (err) throw err;
                    console.log(`${answer.department}has been added successfully!`)
                    allFinished();
                }
            )
        })
    })
}
//Add Role
function addRole(){
    connection.query("SELECT * FROM department", function (err, res){
        if (err) throw err;
        const department =res.map(element=>{
            return element.id
        })
        inquirer .prompt([
            {
                name:"title",
                type:"input",
                message: "What is the title?"
            },
            {
                name:"salary",
                type:"input",
                message: "What is the salary?"
            },
            {
                name:"department_id",
                type:"input",
                message: "What is the department ID?"
            },
        ]).then (function(answer){
            connection.query("INSERT INTO role_employee SET ?",
            answer,
            function (err){
                if (err) throw err;
                console.log(`${answer.title} was added successfully`);
                allFinished();
            })
        })
    })
}
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