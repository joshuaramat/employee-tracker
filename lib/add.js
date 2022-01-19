const inquirer = require('inquirer');
const db = require('../db/connection');
const { getDept, getRoles, getEmployees } = require('./get');

addDept = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'deptAdd',
            message: 'New department name',
            validate: deptInput => {
                if (deptInput) {
                    return true;
                } else {
                    console.log('Department must have a valid name');
                    return false;
                }
            }
        }
    ]).then (answers => {
        const sql = `INSERT INTO department (name) VALUES ('${answers.deptAdd}')`;

        db.query(sql, (err, results) => {
            if(err) {
                console.log(err);
                return;
            }
            console.table(results);
            console.log('Department added');
            questions();
        });
    });
};

addRole = (questions) => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'roleName',
            message: 'Provide name of role',
            validate: inputName => {
                if (inputName) {
                    return true;
                } else {
                    console.log('Please provide a valid role');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'roleSalary',
            message: 'Enter role salary',
            validate: Salary => {
                if (Salary) {
                    return true;
                } else {
                    console.log('Enter a valid salary amount');
                    return false;
                }
            }
        },
        {
            type: 'list',
            name:'deptSelection',
            message: 'Select a department',
            choices: getDept()
        }

    ]).then(answers => {
        let { deptSelection } = answers;
        const deptId  = deptSelection.split(' ');
        const sql = `INSERT INTO role (title, salary, department_id)
        VALUES ('${answers.roleName}', ${parseInt(answers.roleSalary)}, ${parseInt(deptId[0])})`;

        db.query(sql, (err, results) => {
            if (err) {
                console.log(err);
            }
            console.table(results);
            console.log('Added');
            questions();
        });
    });
};

addEmployee = (questions) => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'empFName',
            message: "Enter employee's first name",
            validate: firstName => {
                if (firstName) {
                    return true; 
                } else {
                    console.log('Enter a valid name');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'empLName',
            message: "Enter employee's last name",
            validate: lastName => {
                if (lastName) {
                    return true;
                } else {
                    console.log('Enter a valid name');
                    return false;
                }
            }
        },
        {
            type:'list',
            name: 'roleSelect',
            message: 'select role',
            choices: getRoles()
        },
        {
            type: 'list',
            name:'empManager',
            message: 'select manager',
            choices: getEmployees()
        }
    ]).then(answers => {
        let { empManager } = answers;
        const employeeSelection = empManager.split(' ');
        console.log(employeeSelection);
        console.log(answers);
        let { roleSelect } = answers;
        const roleSelection = roleSelect.split(' ');
        const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
        VALUES ('${answers.empFName}', '${answers.empLName}', ${roleSelection[0]}, ${employeeSelection[0]})`;
        db.query(sql, (err, results) => {
            if (err) {
                console.log(err);
            }
            console.table(results);
            console.log('Added');
            questions();
        })
    })
};

module.exports = { addDept, addRole, addEmployee };