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
    value:"show_employees"

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
       
    }]) .then(({getWhat})=>{
        if(getWhat === "show_depart"){
            showDepart()
        } else if (getWhat === "add_role"){
        addRole();
        }
        else if (getWhat === "add_emp"){
            addEmp();
            }
        else if (getWhat === "add_depart"){
        addDepart();
        }
        else if (getWhat === "update_emp"){
            updateEmp();
            }
        else if (getWhat === "update_role"){
        updateRole();
        }
        else if (getWhat === "show_roles"){
            showRole();
            }
        else if (getWhat === "show_employees"){
        showEmp();
        }
    })
}
