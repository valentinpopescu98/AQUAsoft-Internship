const db = require("../init");

module.exports = app => {
    const projects = require("./create-routes-projects");
  
    var router = require("express").Router();

    // Retrieve all Projects
    router.get("/", projects.findAll);

    // Retrieve a single Employee by id with its Project
    router.get("/:id", projects.findOne);

    // Create a new Project
    router.post("/", projects.create);

    // Update an Project by id
    router.put("/:id", projects.update);

    // Delete an Project by id
    router.delete("/:id", projects.delete);
    
    app.use('/api/projects', router);
  };