const db = require("../init");
const Employees = db.employees;

module.exports = app => {
    const employees = require("./create-routes");
  
    var router = require("express").Router();
  
    // Retrieve all Employees
    router.get("/", employees.findAll);

    // Retrieve a single Employee with name
    router.get("/:name", employees.findOne);

    // Create a new Employee
    router.post("/", employees.create);

    // Update an Employee by id
    router.put("/:id", employees.update);

    // Delete an Employee by id
    router.delete("/:id", employees.delete);
  
    app.use('/api/employees', router);
  };