const mongoose = require("mongoose");

const orderDetailSchema = new mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
  },
  sizeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Size",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const OrderDetail = mongoose.model("OrderDetail", orderDetailSchema);
module.exports = OrderDetail;
