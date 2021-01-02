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
    console.log('You are adding a department...')
  }

  function addRole(){
    console.log('You are adding a role...')
  }

  function addEmployee(){
    console.log('You are adding an employee...')
  }

  function viewDepartment(){
    console.log('You are viewing a department...')
  }

  function viewRole(){
    console.log('You are viewing a role...')
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

