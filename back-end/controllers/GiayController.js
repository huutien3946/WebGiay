const { Giay } = require("../model/model");

const giayController = {
  // Them giay
  addShose: async (req, res) => {
    res.status(200).json(req.body);
  },
};

module.exports = giayController;
