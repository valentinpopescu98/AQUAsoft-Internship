const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  // try {
  const token = req.cookies["jwt"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }

  try {
    const decodedToken = jwt.verify(token, 'SECRET');
    req.user = decodedToken;
  } catch(err) {
    return res.status(401).send("Invalid Token");
  }

  return next();

    // const token = req.cookies.jwt;
    // const token = req.headers.authorization.split(' ')[1];
    
  //   const userId = decodedToken.userId;
  //   if (req.body.userId && req.body.userId !== userId) {
  //     throw 'Invalid user ID';
  //   }
  //   else {
  //     next();
  //   }
  // } catch {
  //   res.status(401).json({
  //     error: new Error('Invalid request!')
  //   });
  // }
};

module.exports = verifyToken;