const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../model/user.model.js");

dotenv.config();
verifyToken = (req, res, next) => {
  let token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, process.env.MY_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.userId;
    next();
  });
};

isAdmin = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    console.log(user);

    if (!user.permission) {
      res.status(403).send({ message: "Require Admin Role!" });
    } else {
      next();
    }
  });
};

const authJwt = {
  verifyToken,
  isAdmin,
};
module.exports = authJwt;
