const { Brand } = require("../model/brand.model");

const brandController = {
  // Them brand Post: ../brand/

  addBrand: async (req, res) => {
    try {
      const newBrand = new Brand(req.body);
      res.send(newBrand);
      const saveBrand = await newBrand.save();
      res.status(200).json(saveBrand);
    } catch (err) {
      res.status(500).json(err); // search google: http request code nếu muốn biết code nghĩa là gì
    }
  },

  //Get All Brand GET: ../brand/
  getAll: async (req, res) => {
    try {
      let brands = await Brand.find();
      res.status(200).json(brands);
    } catch (error) {
      res.status(500).json(err);
    }
  },

  //Get 1 Brand GET: ../brand/:id
  getBrand: async (req, res) => {
    try {
      let brand = await Brand.findById(req.params.id);
      res.status(200).json(brand);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  editBrand: async (req, res) => {
    try {
      let brand = await Brand.findById(req.params.id);
      await brand.updateOne({ $set: req.body });
      res.status(200).json("Updated successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = brandController;
