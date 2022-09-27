const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config');

const verifyToken = (req, res, next) => {
  const token = req.cookies["jwt"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }

  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);
    req.user = decodedToken;
  } catch(err) {
    return res.status(401).send("Invalid Token");
  }

  return next();
};

module.exports = verifyToken;