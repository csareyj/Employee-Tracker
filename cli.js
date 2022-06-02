const mysql = require("mysql2");
const inquirer = require("inquirer");
const consoleT = require("console.table");


let connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Cyclone1!",
    database: "employee_db"
});

connection.connect(function (err) {
    if (err) throw err;
    start();
});

function start() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View all employees?",
                "View all employees by deparment?",
                // "View all employees by manager?",
                "Add an employee?",
                "Remove an employee?",
                "Add a new role?",
                "Add a new department?",
                "exit"
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "View all employees?":
                    viewEmployees();
                    break;

                case "View all employees by deparment?":
                    viewByDepartment();
                    break;

                // case "View all employees by manager?":
                //     viewByManager();
                //     break;

                case "Add an employee?":
                    addEmployee();
                    break;

                case "Remove an employee?":
                    removeEmployee();
                    break;

                case "Add a new role?":
                    addRole();
                    break;

                case "Add a new department?":
                    addDepartment();
                    break;

                case "exit":
                    connection.end();
                    break;
            }
        });
};

function viewEmployees() {
    connection.query("select * from employee", function (err, res) {
        if (err) throw err;

        console.table(res);

    });
    start();
};

function viewByDepartment() {
    connection.query("SELECT department.id, department.name, first_name, last_name FROM department join employee where department.id = employee.role_id order by department.name", function (err, res) {
        if (err) throw err;

        console.table(res);

        start();
    });
};

// function viewByManager() {
//     connection.query("select * from manager", function (err, res) {
//         if (err) throw err;

//         console.table(res);

//     });
//     start();

// };

function addEmployee() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "first_name",
                message: "What is the employees first name?",
            },
            {
                type: "input",
                name: "last_name",
                message: "What is the employees last name?",
            },
            {
                type: "input",
                name: "role_id",
                message: "What is the employees role id number?",
            },
            {
                type: "input",
                name: "manager_id",
                message: "What is the employees, mamanger id number?",
            },

        ])
        
		.then(function(answer) {
            let newFirst_name = answer.first_name;
            let newLast_name = answer.last_name;
            let newRole_id = answer.role_id;
            let newManager_id = answer.manager_id;
	
			let query = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ?";
			connection.query(query, [[[newFirst_name, newLast_name, newRole_id, newManager_id]]], function(err, res) {
            });
            console.log (`You added ${newFirst_name} to employees.`)
            start();
		});
};


function removeEmployee() {
    inquirer
		.prompt([
            {
			name: "removeEmployee",
			type: "input",
            message: "what is the employee's id number?"
            },
        ])
		.then(function(answer) {
			console.log(answer);
			let query = "DELETE FROM employee WHERE ?";
			let newId = Number(answer.removeEmployee);
			console.log(newId);
			connection.query(query, { id: newId }, function(err, res) {
				start();
			});
		});
};


function addRole() {
    inquirer
    .prompt([
        {
            type: "input",
            name: "title",
            message: "What is the new role?",
        },
        {
            type: "input",
            name: "salary",
            message: "What is the yearly salary of the new role?",
        },
        {
            type: "input",
            name: "department_id",
            message: "What is the department id number asssociated with the new role?",
        },

    ])
    
    .then(function(answer) {
        let newTitle = answer.title;
        let newSalary = answer.salary;
        let newDepartment_id = answer.department_id;

        let query = "INSERT INTO role (title, salary, department_id) VALUES ?";
        connection.query(query, [[[newTitle, newSalary, newDepartment_id]]], function(err, res) {
        });
        console.log (`You added ${newTitle} to roles.`)
        start();
    });
};

function addDepartment() {
    inquirer
    .prompt([
        {
            type: "input",
            name: "name",
            message: "What is the new department?",
        },

    ])
    
    .then(function(answer) {
        let newName = answer.name;
        
        let query = "INSERT INTO department (name) VALUES ?";
        connection.query(query, [[[newName]]], function(err, res) {
        });
        console.log (`You added ${newName} to departments.`)
        start();
    });
};