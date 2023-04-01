const { Product } = require("../model/product.model");

const productController = {
  // Add product POST: /product/
  addProduct: async (req, res) => {
    try {
      const newProduct = new Product(req.body);
      const saveProduct = await newProduct.save();
      res.status(200).json(saveProduct);
    } catch (err) {
      res.status(500).json(err); // search google: http request code nếu muốn biết code nghĩa là gì
    }
  },

  //Get All Brand GET: ../product/
  getAll: async (req, res) => {
    try {
      let allProducts = await Product.find()
        .populate("sizes")
        .populate("brandId");
      res.status(200).json(allProducts);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  //Get 1 Brand GET: ../brand/:id
  getProduct: async (req, res) => {
    try {
      let product = await Product.findById(req.params.id).populate("sizes");
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //Edit 1 Brand PUT: ../brand/:id
  editProduct: async (req, res) => {
    try {
      let product = await Product.findById(req.params.id);
      await product.updateOne({ $set: req.body });
      res.status(200).json("Updated successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //Get 8 product mới GET: ../newbrands/
  getNewProducts: async (req, res) => {
    try {
      const listNewProducts = await Product.find()
        .sort({ createdAt: -1 })
        .limit(6);
      res.status(200).json(listNewProducts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = productController;
