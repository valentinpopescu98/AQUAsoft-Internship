const db = require("../init");

module.exports = app => {
    const routes = require("./create-routes");
  
    var router = require("express").Router();

    // Retrieve all Accounts
    router.get("/", routes.findAll);

    // Retrieve an Account by username and check if the password is correct
    router.get("/:username&:password", routes.findOne);

    // Create a new Account
    router.post("/", routes.create);

    // Update an Account by id
    router.put("/:id", routes.update);

    // Delete an Account by id
    router.delete("/:id", routes.delete);
    
    app.use('/api/accounts', router);
  };