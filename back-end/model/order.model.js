const mongoose = require("mongoose");

// Khai báo Schema cho bảng Đơn hàng
const orderSchema = new mongoose.Schema({
  orderDate: { type: Date, default: Date.now },
  orderStatus: {
    type: String,
    enum: ["Đang xử lý", "Đã giao hàng", "Đã hủy"],
    default: "Đang xử lý",
  },
  deliveryAddress: { type: String, required: true },
  paymentMethod: { type: String, enum: ["COD", "Online"], default: "COD" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

// Tạo model từ schema Đơn hàng
let Order = mongoose.model("Order", orderSchema);
module.exports = { Order };
