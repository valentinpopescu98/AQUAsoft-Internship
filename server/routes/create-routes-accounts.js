const bcrypt = require("bcrypt");
const db = require("../init");
const jwt = require('jsonwebtoken');
const Accounts = db.accounts;

// Retrieve all Accounts from the database
exports.findAll = (res) => { 
    Accounts.findAll()
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving the accounts."
        });
    });
};

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
        const token = jwt.sign({id: data.id}, 'RANDOM_TOKEN_SECRET', {expiresIn: '24h'});
        res.cookie('jwt', token, {httpOnly: true, maxAge: 60 * 60 * 24});
        res.send({
          id: data.id,
          // token: token,
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

// Update an Account by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Accounts.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Account was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update account with id=${id}. Maybe the account was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating account with id=" + id
      });
    });
};

// Delete an Account with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Accounts.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Account was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete account with id=${id}. Maybe the account was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete account with id=" + id
      });
    });
};