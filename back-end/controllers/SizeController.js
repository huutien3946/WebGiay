const { Product } = require("../model/product.model");
const { Size } = require("../model/size.model");

const sizeController = {
  // Them size
  addSize: async (req, res) => {
    try {
      const newSize = new Size(req.body);
      const saveSize = await newSize.save();
      let product = Product.findById(newSize.productId);
      await product.updateOne({ $push: { sizes: saveSize._id } });

      res.status(200).json(saveSize);
    } catch (err) {
      res.status(500).json(err); // search google: http request code nếu muốn biết code nghĩa là gì
    }
  },

  //Get All size GET: ../size/
  getAll: async (req, res) => {
    try {
      let allSize = await Size.find().populate("productId");
      res.status(200).json(allSize);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  //Get 1 Size GET: ../size/:id
  getSize: async (req, res) => {
    try {
      let size = await Size.findById(req.params.id).populate("productId");
      res.status(200).json(size);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //Edit 1 Brand PUT: ../brand/:id
  editSize: async (req, res) => {
    try {
      let size = await Size.findById(req.params.id);
      await size.updateOne({ $set: req.body });
      res.status(200).json("Updated successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = sizeController;
