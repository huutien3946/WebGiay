const { default: mongoose } = require("mongoose");
const OrderDetail = require("../model/orderdetail.model");
const orderDetailController = {
  //   // Them orderDetail Post: ../orderDetail/
  //   addOrderDetail: async (req, res) => {
  //     // try {
  //     //   const newOrderDetail = new OrderDetail(req.body);
  //     //   const saveOrderDetail = await newOrderDetail.save();
  //     //   res.status(200).json(saveOrderDetail);
  //     // } catch (err) {
  //     //   res.status(500).json(err); // search google: http request code nếu muốn biết code nghĩa là gì
  //     // }

  //     try {
  //       let product = await Product.findById(req.body.productId);
  //       let newOrderDetail = new OrderDetail(req.body);

  //       //gán price từ product + tính amout
  //       newOrderDetail.price = product.price;
  //       newOrderDetail.amount = newOrderDetail.price * newOrderDetail.quantity;

  //       let saveOrderDetail = await newOrderDetail.save();
  //       res.status(200).json(saveOrderDetail);
  //     } catch (err) {
  //       res.status(500).json(err); // search google: http request code nếu muốn biết code nghĩa là gì
  //     }
  //   },

  //Get All OrderDetail GET: ../OrderDetail/
  getAll: async (req, res) => {
    try {
      let orderDetails = await OrderDetail.find();
      res.status(200).json(orderDetails);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  //Get 1 OrderDetail GET: ../OrderDetail/:id
  getOrderDetail: async (req, res) => {
    try {
      const orderId = mongoose.Types.ObjectId(req.params.orderId);

      let orderDetails = await OrderDetail.find({ orderId: orderId })
        .populate("sizeId")
        .populate({
          path: "sizeId",
          populate: { path: "productId" },
        });
      res.status(200).json(orderDetails);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  //Edit 1 OrderDetail PUT: ../OrderDetail/:id
  editOrderDetail: async (req, res) => {
    try {
      let orderDetail = await OrderDetail.findById(req.params.id);
      await orderDetail.updateOne({ $set: req.body });
      res.status(200).json("Updated successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = orderDetailController;
