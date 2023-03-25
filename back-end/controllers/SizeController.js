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
};

module.exports = sizeController;
