const jwt = require('jsonwebtoken');
const secret_key = "israrkhan@123456";
const UserModel = require('../models/User.js');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer')) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, secret_key, (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ status: "failed", message: "Invalid token" });
      } else {
        const { userID } = decodedToken;
        UserModel.findById(userID)
          .then(user => {
            if (user) {
              req.user = { userID: user._id };
              next();
            } else {
              return res.status(401).json({ status: "failed", message: "User not found" });
            }
          })
          .catch(error => {
            return res.status(500).json({ status: "failed", message: "Internal server error" });
          });
      }
    });
  } else {
    return res.status(401).json({ status: "failed", message: "Unauthorized access" });
  }
};

module.exports = authenticateToken;
