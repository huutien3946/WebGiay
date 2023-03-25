const { Brand } = require("../model/model");

const brandController = {
  // Them brand
  addBrand: async (req, res) => {
    try {
      const newBrand = new Brand(req.body);
      const saveBrand = await newBrand.save();
      res.status(200).json(saveBrand);
    } catch (err) {
      res.status(500).json(err); // search google: http request code nếu muốn biết code nghĩa là gì
    }
  },
};

module.exports = brandController;
