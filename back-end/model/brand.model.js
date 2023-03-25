const mongoose = require("mongoose");

// Khai báo Schema cho bảng Hãng giày
const brandSchema = new mongoose.Schema({
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Tạo model từ schema Hãng giày
let Brand = mongoose.model("Brand", brandSchema);
module.exports = { Brand };
