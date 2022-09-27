const bcrypt = require("bcrypt");
const db = require("../init");
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require("../config/config");
const Accounts = db.accounts;

// Retrieve an Account by username and check if the password is correct
exports.findOne = async(req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // Check if username is empty
  if (!username) {
      console.log(req.body);

      res.status(409).send({
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

        if (!checkPassword) {
          res.status(409).send({
            message: "Bad password!"
          });

          return;
        }

        const token = jwt.sign({username: data.username, password: data.password}, JWT_SECRET, {expiresIn: '24h'});
        
        res.cookie('jwt', token, {httpOnly: true, maxAge: 60 * 60 * 24});
        res.send(token);
      }
      catch(err) {
        res.status(409).send({
          message: `Failed to generate JWT or user ${username} does not exist!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Failed to retrieve user ${username} from the database!`
      });
    });
};

// Insert a new Account
exports.create = async(req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const repeatPassword = req.body.repeatPassword;
  const email = req.body.email;

  // Check if username is empty
  if (!username) {
      console.log(req.body);

      res.status(409).send({
          message: "Content can not be empty!"
      });

      return;
  };

  // Check if passwords match
  if (password !== repeatPassword) {
    res.status(409).send({
      message: "Passwords do not match!"
    });

    return;
  }

  // Check if email is valid
  if (!email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
    res.status(409).send({
      message: "Email is invalid!"
    });

    return;
  }

  // Check if username already exists
  const foundUser = await Accounts.findOne({
    where: {username: username}
  })
  .catch(err => {
    res.status(500).send({
      message: "Failed to check if username is unique..."
    });
  });

  // If username already exists throw error and catch it in frontend to show alert
  if (foundUser) {
    res.status(409).send({
      message: "User already exists in the database!"
    });

    return;
  }
  // Otherwise, just create the account
  else {
    let hashedPassword = password;
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
  }
};