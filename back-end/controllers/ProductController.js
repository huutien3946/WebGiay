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
};

module.exports = productController;
