const bcrypt = require("bcrypt");
const db = require("../init");
const jwt = require('jsonwebtoken');
const Accounts = db.accounts;

// Retrieve an Account by username and check if the password is correct
exports.findOne = (req, res) => {
  const username = req.params.username;
  const password = req.params.password;

  Accounts.findOne({
    where: {username: username}
  })
    .then(data => {
      try {
        const checkPassword = bcrypt.compareSync(password, data.password);
        const token = jwt.sign({id: data.id}, 'SECRET', {expiresIn: '24h'});
        res.cookie('jwt', token, {httpOnly: true, maxAge: 60 * 60 * 24});
        res.send({
          id: data.id,
          token: token,
          checkPassword: checkPassword
        });
      }
      catch(err) {
        res.status(400).send({
          message: err.message
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving account with username=" + username
      });
    });
};

// Insert a new Account
exports.create = async(req, res) => {
  // Validate request
  if (!req.body.username) {
      console.log(req.body);
      res.status(400).send({
          message: "Content can not be empty!"
      });
      return;
  };

  let hashedPassword = req.body.password;
  const salt = await bcrypt.genSalt();
  hashedPassword = await bcrypt.hash(hashedPassword, salt);

  // Create an Account
  const account = {
    id: req.body.id,
    username: req.body.username,
    password: hashedPassword,
    email: req.body.email
  };

  // Save Account in the database
  Accounts.create(account)
  .then(data => {
      res.send(data);
      })
      .catch(err => {
          res.status(500).send({
              message: err.message || "Some error occurred while creating the account."
          });
      });
};

// Log In
exports.login = async(req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // Validate request
  if (!username) {
      console.log(req.body);
      res.status(400).send({
          message: "Content can not be empty!"
      });
      return;
  };

  // Read the account from the database
  Accounts.findOne({
    where: {username: username}
  })
    .then(data => {
      try {
        const checkPassword = bcrypt.compareSync(password, data.password);
        const token = jwt.sign({id: data.id}, 'SECRET', {expiresIn: '24h'});
        
        res.cookie('jwt', token, {httpOnly: true, maxAge: 60 * 60 * 24});
        res.send({
          id: data.id,
          token: token,
          checkPassword: checkPassword
        });
      }
      catch(err) {
        res.status(400).send({
          message: err.message
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error while trying to log with user " + username
      });
    });
};