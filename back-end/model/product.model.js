const mongoose = require("mongoose");

// Khai báo Schema cho bảng Sản phẩm
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  image: { type: String },
  brandId: { type: mongoose.Schema.Types.ObjectId, ref: "Brand" },
  sizes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Size" }],
  createdAt: { type: Date, default: Date.now },
});

// Tạo model từ schema Sản phẩm
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
