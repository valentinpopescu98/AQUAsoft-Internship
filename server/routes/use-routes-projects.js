const db = require("../init");

module.exports = app => {
    const auth = require('../middleware/auth');
    const routes = require("./create-routes-projects");
  
    var router = require("express").Router();

    // Retrieve all Projects
    router.get("/", auth, routes.findAll);

    // Create a new Project
    router.post("/", auth, routes.create);

    // Update an Project by id
    router.put("/:id", auth, routes.update);

    // Delete an Project by id
    router.delete("/:id", auth, routes.delete);
    
    app.use('/api/projects', auth, router);
  };