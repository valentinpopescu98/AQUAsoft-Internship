const db = require("../init");

module.exports = app => {
    const routes = require("./create-routes-accounts");
  
    var router = require("express").Router();

    // Retrieve an Account by username and check if the password is correct
    // router.get("/:username&:password", routes.findOne);

    // Create a new Account
    router.post("/register", routes.create);

    // Log In
    router.post("/login", routes.login);
    
    app.use('/api', router);
  };