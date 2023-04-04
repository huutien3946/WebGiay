const jwt = require("jsonwebtoken");
const User = require("../model/user.model");
const bcrypt = require("bcrypt");

const dotenv = require("dotenv");

dotenv.config();

exports.register = (req, res) => {
  const user = new User(req.body);
  const salt = bcrypt.genSalt(10).then(() => {
    user.password = bcrypt.hashSync(req.body.password, salt);
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    } else {
      res.send({ message: "User was registered successfully!" });
    }
  });
};

exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }

    var token = jwt.sign(
      { userId: user.id, username: user.name, permission: user.permission },
      process.env.MY_SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).send({
      userId: user._id,
      username: user.username,
      permission: user.permission,
      accessToken: token,
    });
  });
};
