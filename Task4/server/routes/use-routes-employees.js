const db = require("../init");

module.exports = app => {
    const routes = require("./create-routes-employees");
  
    var router = require("express").Router();

    // Retrieve all Employees
    router.get("/", routes.findAll);

    // Retrieve a single Employee with name
    router.get("/:name", routes.findOne);

    // Create a new Employee
    router.post("/", routes.create);

    // Update an Employee by id
    router.put("/:id", routes.update);

    // Delete an Employee by id
    router.delete("/:id", routes.delete);
    
    app.use('/api/employees', router);
  };