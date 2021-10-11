const db = require("../init");

module.exports = app => {
    const routes = require("./create-routes-projects");
  
    var router = require("express").Router();

    // Retrieve all Projects
    router.get("/", routes.findAll);

    // Retrieve a single Employee by id with its Project
    router.get("/:id", routes.findOne);

    // Create a new Project
    router.post("/", routes.create);

    // Update an Project by id
    router.put("/:id", routes.update);

    // Delete an Project by id
    router.delete("/:id", routes.delete);
    
    app.use('/api/projects', router);
  };