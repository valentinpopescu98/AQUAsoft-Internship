const db = require("../init");

module.exports = app => {
    const routes = require("./create-routes-accounts");
  
    var router = require("express").Router();

    // Create a new Account
    router.post("/register", routes.create);

    // Retrieve an Account by username and check if the password is correct
    router.post("/login", routes.findOne);
    
    app.use('/api', router);
  };