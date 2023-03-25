const mongoose = require("mongoose");

// Khai báo Schema cho bảng Người dùng
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  permission: {
    type: Boolean,
    default: false,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

// Tạo model từ schema Người dùng
let User = mongoose.model("User", userSchema);

module.exports = { User };
