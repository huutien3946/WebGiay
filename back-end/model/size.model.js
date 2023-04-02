const mongoose = require("mongoose");

//định nghĩa schema size
const SizeSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  size: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

//Tạo model từ SizeSchema
const Size = mongoose.model("Size", SizeSchema);
module.exports = Size;
