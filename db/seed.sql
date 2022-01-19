INSERT INTO department (name)
VALUES
('Branch Management'),
('Sales'),
('Accounting'),
('Quality Assurance'),
('Order Fulfillment'),
('HR'),
('Reception'),
('Customer Relations');

INSERT INTO role (title, salary, department_id)
VALUES
('Branch Manager', 50000, 1),
('Assistant to the Regional Manager', 40000, 2),
('Sales Manager', 45000, 2),
('Sales Rep', 35000, 2),
('Accountant', 40500, 3),
('Temp.', 25000, 8),
('QA Rep', 30000, 4),
('Warehouse Manager', 49000, 5),
('HR Rep', 35000, 6),
('Receptionist', 30000, 7),
('Customer Service Rep', 3000, 8);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Michael', 'Scott', 1, 1),
('Jim', 'Halpert', 3, 3),
('Dwight', 'Schrute', 2, 2),
('Andy', 'Bernard', 4, NULL),
('Stanley', 'Hudson', 4, NULL),
('Ryan', 'Howard', 8, NULL),
('Angela', 'Martin', 5, 4),
('Oscar', 'Martinez', 5, NULL),
('Creed', 'Bratton', 7, NULL),
('Darryl', 'Philbin', 8, 5),
('Kevin', 'Malone', 5, NULL),
('Kelly', 'Kapoor', 11, 6),
('Pamela', 'Beesly', 10, NULL),
('Toby', 'Flenderson', 9, NULL);