const { Giay } = require("../model/model");

const giayController = {
  // Them giay
  addShose: async (req, res) => {
    try {
      const newShose = new Giay(req.body);
      const saveShose = await newShose.save();
      res.status(200).json(saveShose);
    } catch (err) {
      res.status(500).json(err); // search google: http request code nếu muốn biết code nghĩa là gì
    }
  },
};

module.exports = giayController;
