const db = require("../init");

module.exports = app => {
    const auth = require('../middleware/auth');
    const routes = require("./create-routes-employees");
  
    var router = require("express").Router();

    // Retrieve all Employees
    router.get("/", auth, routes.findAll);

    // Create a new Employee
    router.post("/", auth, routes.create);

    // Update an Employee by id
    router.put("/:id", auth, routes.update);

    // Delete an Employee by id
    router.delete("/:id", auth, routes.delete);
    
    app.use('/api/employees', router);
  };