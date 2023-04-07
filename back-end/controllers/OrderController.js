const { default: mongoose } = require("mongoose");
const Order = require("../model/order.model");
const Size = require("../model/size.model");
const Cart = require("../model/cart.model");
const OrderDetail = require("../model/orderdetail.model");

const orderController = {
  // Them order Post: ../order/
  addOrder: async (req, res) => {
    try {
      const userId = req.userId;
      req.body.userId = userId;
      const newOrder = new Order(req.body);
      const saveOrder = await newOrder.save();

      const userIdDb = mongoose.Types.ObjectId(userId); // userId cần tìm
      const cart = await Cart.findOne({ userId: userIdDb });

      // cart.items.map((item, index) => {
      //   var id = item.sizeId;
      //   var idString = id.toString();
      //   console.log(idString);
      //   Size.findById({ idString }, function (err, size) {
      //     console.log(size);
      //     if (size.quantity - item.quantity < 0) {
      //       console.log("hết giày");
      //       res.status(500).json({ message: "hết giày" });
      //       return;
      //     }
      //   });
      // });
      cart.items.map((item, index) =>
        OrderDetail.create(
          {
            userId,
            orderId: saveOrder._id,
            sizeId: item.sizeId._id,
            quantity: item.quantity,
          },
          function (error, orderDetail) {
            if (error) {
              console.log("loi tao orderDetail");
            } else {
              Size.findById(item.sizeId._id, (err, size) => {
                if (err) {
                  console.log(err);
                  return;
                }

                // Trừ đi quantity khách đặt mua
                size.quantity -= item.quantity;

                // Lưu lại thông tin sản phẩm
                size.updateOne({ quantity: size.quantity }, (err) => {
                  if (err) {
                    console.log(err);
                    return;
                  }

                  console.log("Quantity updated successfully!");
                });
              });
              console.log(orderDetail);
            }
          }
        )
      );
      res.status(200).json(saveOrder);
    } catch (err) {
      console.log("vo catch ngoai");
      res.status(500).json(err);
    }
  },

  //Get All Order GET: ../Order/
  getAll: async (req, res) => {
    try {
      const userId = req.userId;
      const userIdDb = mongoose.Types.ObjectId(userId);
      let orders = await Order.find({ userId: userIdDb });
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  //Get 1 Order GET: ../Order/:id
  getOrder: async (req, res) => {
    try {
      let order = await Order.findById(req.params.id);
      res.status(200).json(order);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //Edit 1 Order PUT: ../Order/:id
  editOrder: async (req, res) => {
    try {
      let order = await Order.findById(req.params.id);
      await order.updateOne({ $set: req.body });
      res.status(200).json("Updated successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = orderController;
