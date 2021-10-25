// dependencies
const inquirer = require('inquirer');
const consoleTable = require('console.table');
const mysql = require('mysql2');
const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Daedalus21!',
    database: 'employee_db'
})

mysqlConnection.connect((err) => {
    if (err) throw err;
    inquirerPrompts();
})

// inquirer prompts
function inquirerPrompts() {
    inquirer.prompt (
        {
        name: 'modify',
        type: 'list',
        message: 'Select a task:',
        choices:
            [
                'View All Departments',
                'View All Roles',
                'View All Employees',
                'Add a Department',
                'Add a Role',
                'Add an Employee',
                'Update an Employee Role'
            ]
        }
    ).then((answer) => {
        if (answer === 'View All Departments') {
            return viewDepartments();
        } else if (answer === 'View All Roles') {
            return viewRoles();
        } else if (answer === 'View All Employees') {
            return viewEmployees();
        } else if (answer === 'Add a Department') {
            return addDepartment();
        } else if (answer === 'Add a Role') {
            return addRole();
        } else if (answer === 'Add an Employee') {
            return addEmployee();
        } else if (answer === 'Update an Employee Role') {
            return updateEmployeeRole();
        }
    })
};

// functions
function viewEmployees() {
    let query = 'SELECT * FROM employee';
    connection.query(query,(err,res) => {
        if (err) throw err;
        console.log(res.length + 'Employees found');
        console.table('All Employees : ',res);
        inquirerPrompts();
    })
};

function viewDepartments() {
    let query = 'SELECT * FROM department';
    connection.query(query,(err,res) => {
        if (err) throw err;
        console.log(res.length + 'Departments found')
        console.table('All Departments : ', res);
        inquirerPrompts();
    })
};

function viewRoles() {
    let query = 'SELECT * FROM roles';
    connection.query(query,(err,res) => {
        if (err) throw err;
        console.log(res.length + 'Roles found');
        console.table('All Roles ', res);
        inquirerPrompts();
    })
};

function addEmployee() {
    connection.query('SELECT * FROM role', (err, res) => {
        if (err) throw err;
        inquirer.prompt([
            {
                name: 'first_name',
                type: 'input',
                message: "What is the employee's first name?"
            },
            {
                name: 'last_name',
                type: 'input',
                message: "What is the employee's last name?"
            },
            {
                name: 'manager_id',
                type: 'input',
                message: "What is the employee's manager ID?"
            },
            {
                name: 'role',
                type: 'list',
                message: "What is the employee's role?",
                choices: [
                    function() {
                        let roleArray = [];
                        for (let i = 0; i < res.length; i++) {
                            roleArray.push(res[i].title);
                        }
                        return roleArray;
                    }
                ]
            }
        ]).then((answer) => {
            let role_id;
            for (let j = 0; j < res.length; j++) {
                if (res[j].title == answer.role) {
                    role_id = res[j].id;
                    console.log(role_id)
                }
            }
            connection.query('INSERT INTO employee VALUES ',
            ({
                first_name: answer.first_name,
                last_name: answer.last_name,
                manager_id: answer.manager_id,
                role_id: role_id
            }),
            function (err) {
                if (err) throw err;
                console.log('New employee added');
                inquirerPrompts();
            })
        })
    })
};