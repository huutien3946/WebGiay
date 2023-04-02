const User = require("../model/user.model");
const bcrypt = require("bcrypt");
const userController = {
  // Them User Post: ../User/

  //Get All User GET: ../User/
  getAll: async (req, res) => {
    try {
      let users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  //Get 1 User GET: ../User/:id
  getUser: async (req, res) => {
    try {
      let user = await User.findById(req.params.id);
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //Edit 1 User PUT: ../User/:id
  editUser: async (req, res) => {
    try {
      let user = await User.findById(req.params.id);
      await user.updateOne({ $set: req.body });
      res.status(200).json("Updated successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = userController;
