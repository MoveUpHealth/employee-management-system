var mysql = require("mysql");
var inquirer = require('inquirer')

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "*117Rica",
  database: "employee_db"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  runApp();
});

function runApp() {
    inquirer
      .prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "Add departments, roles, or employees",
          "View departments, roles, or employees",
          "Update employee roles",
          "Exit"
          
        ]
      })
      .then(function(answer) {
        switch (answer.action) {
        case "Add departments, roles, or employees":
          add();
          break;
  
        case "View departments, roles, or employees":
          view();
          break;
  
        case "Update employee roles":
          update();
          break;
        
        case "Exit":
          exit();
          break;

        }
      });
  }

  function chooseAdd() {
    inquirer
      .prompt({
        name: "adding",
        type: "list",
        message: "What would you like to add?",
        choices: [
          "Add departments",
          "Add roles",
          "Add employees",
          "Go to Main Menu"
          
        ]
      })
      .then(function(answer) {
        switch (answer.adding) {
        case "Add departments":
          addDepartment();
          break;
  
        case "Add roles":
          addRole();
          break;
  
        case "Add employees":
          addEmployee();
          break;
        
        case "Go to Main Menu":
          runApp();
          break;

        }
      });
  }

  function chooseView() {
    inquirer
      .prompt({
        name: "viewing",
        type: "list",
        message: "What would you like to view?",
        choices: [
          "View departments",
          "View roles",
          "View employees",
          "Go to Main Menu"
          
        ]
      })
      .then(function(answer) {
        switch (answer.viewing) {
        case "View departments":
          viewDepartment();
          break;
  
        case "View roles":
          viewRole();
          break;
  
        case "View employees":
          viewEmployee();
          break;
        
        case "Go to Main Menu":
          runApp();
          break;

        }
      });
  }

  function add() {
      console.log('You are adding something...')
      chooseAdd()
      
  }

  function view() {
    console.log('You are viewing something...')
    chooseView()
    
  }
  
  function update() {
    console.log('You are updating something...')
    updateRole()
  }

  function exit() {
    console.log('Thank you for using the App. Have a good day!')
    connection.end()
  }

  function addDepartment(){
    inquirer
    .prompt([
    {  
        name: "department",
        type: "input",
        message: "What department would you like to add?"
    },
    {
        name: "id_department",
        type: "input",
        message: "What is the ID for this department?"
    }
    
    ])
    .then(function(answer) {
      var query = connection.query(
          "INSERT INTO department SET ?",
          { id: answer.id_department,
            name: answer.department }, 
        (err) => {
         if (err) throw err
         console.log('Department saved successfully');
         runApp();
        }
        )
        console.log(query.sql)
        
      });
  }

  function addRole(){
    inquirer
    .prompt([
    {  
        name: "role",
        type: "input",
        message: "What role would you like to add?"
    },
    {  
        name: "role_id",
        type: "input",
        message: "What role would you like to add?"
    },
    {  
        name: "role_salary",
        type: "input",
        message: "What role would you like to add?"
    },
    {
        name: "dep_id",
        type: "input",
        message: "What is the ID for the department that this role belongs to?"
    }
    
    ])
    .then(function(answer) {
      var query = connection.query(
          "INSERT INTO role SET ?",
          { id: answer.role_id,
            title: answer.role,
            salary: answer.role_salary,
            department_id: answer.dep_id }, 
        (err) => {
         if (err) throw err
         console.log('Role saved successfully');
         runApp();
        }
        )
        console.log(query.sql)
        
      });
  }

  function addEmployee(){
    inquirer
    .prompt([
    {  
        name: "first",
        type: "input",
        message: "What is the employee's first name?"
    },
    {  
        name: "last",
        type: "input",
        message: "What is the employee's last name?"
    },
    {  
        name: "emp_id",
        type: "input",
        message: "What is the employee's ID?"
    },
    {
        name: "emp_role_id",
        type: "input",
        message: "What is the ID for this employee's role?"
    },
    {  
        name: "manager_id",
        type: "input",
        message: "What is the ID for this employee's manager? (Enter 0 if there is no manager)"
    },
    
    ])
    .then(function(answer) {
      var query = connection.query(
          "INSERT INTO employee SET ?",
          { id: answer.emp_id,
            first_name: answer.first,
            last_name: answer.last,
            role_id: answer.emp_role_id,
            manager_id: answer.manager_id }, 
        (err) => {
         if (err) throw err
         console.log('Employee saved successfully');
         runApp();
        }
        )
        console.log(query.sql)
        
      });
  }

  function viewDepartment(){
    inquirer
    .prompt({
      name: "dep_name",
      type: "input",
      message: "What department would you like to view?"
    })
    .then(function(answer) {
      var query = "SELECT id, name FROM department WHERE ?";
      connection.query(query, { name: answer.dep_name }, function(err, res) {
        for (var i = 0; i < res.length; i++) {
          console.log("Department: " + res[i].name + " || Department ID: " + res[i].id);
        }
        runApp();
      });
    });
  }

  function viewRole(){
    inquirer
    .prompt({
      name: "role_title",
      type: "input",
      message: "What role do you want to view?"
    })
    .then(function(answer) {
      var query = "SELECT id, title, salary, department_id FROM employee_role WHERE ?";
      connection.query(query, { title: answer.role_title }, function(err, res) {
        for (var i = 0; i < res.length; i++) {
          console.log("Role Title: " + res[i].title + " || Role ID: " + res[i].id + " || Salary: " + res[i].salary + " || Department ID: " + res[i].department_id);
        }
        runApp();
      });
    });
  }


  function viewEmployee() {
    inquirer
    .prompt({
      name: "employee",
      type: "input",
      message: "What is the employee's last name?"
    })
    .then(function(answer) {
      var query = "SELECT first_name, last_name, id FROM employee WHERE ?";
      connection.query(query, { last_name: answer.employee }, function(err, res) {
        for (var i = 0; i < res.length; i++) {
          console.log("First Name: " + res[i].first_name + " || Last Name: " + res[i].last_name + " || ID: " + res[i].id);
        }
        runApp();
      });
    });
  }

  function updateRole(){
      console.log('You are updating a role')
  }

