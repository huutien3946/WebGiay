const { Shoe } = require("../model/model");

const giayController = {
  // Them giay
  addShose: async (req, res) => {
    try {
      const newShoe = new Shoe(req.body);
      const saveShoe = await newShoe.save();
      res.status(200).json(saveShoe);
    } catch (err) {
      res.status(500).json(err); // search google: http request code nếu muốn biết code nghĩa là gì
    }
  },
};

module.exports = giayController;
