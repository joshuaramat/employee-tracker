const inquirer = require('inquirer');

const { addDept, addRole, addEmployee } = require('./lib/add');
const { viewDept, viewRoles, viewEmployees } = require('./lib/view');
const { updateEmployee } = require('./lib/update');

questions = () => {
    inquirer.prompt ([
        {
            type: 'list',
            name: 'optionQuestions',
            message: 'What would you like to do?',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee',
                'Exit'
            ]
        }
    ]).then (answers => {
        return init(answers);
    });
}

init = (answers) => {
    switch (answers.optionQuestions) {
        case 'View all departments':
            viewDept(questions);
            break;
        case 'View all roles':
            viewRoles(questions);
            break;
        case 'View all employees':
            viewEmployees(questions);
            break;
        case 'Add a department':
            addDept(questions);
            break;
        case 'Add a role':
            addRole(questions);
            break;
        case 'Add an employee':
            addEmployee(questions);
            break;
        case 'Update an employee':
            updateEmployee(questions);
            break;
        default:
            console.log('See you next time!');
    }
}

questions();