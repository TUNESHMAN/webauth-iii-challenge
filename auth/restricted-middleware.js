const bcrypt = require("bcryptjs");
const Users = require("../users/user-model");
module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    // verify is it valid?
    // it's made by us (was made using the secret)
    // the token hasn't expired
    // hasn't been tampered with etc
    jwt.verify(
      token,
      process.env.JWT_SECRET || 'thesecret',
      // callback (err, decodedToken)
      (err, decoded) => {
        if (err) {
          res.status(401).json({ message: 'token bad' })
        } else {
          // let's put the decoded token on req
          req.decodedToken = decoded;
          next();
        }
      }
    )
  } else {
    res.status(400).json({ message: 'No credentials provided' });
  }
};