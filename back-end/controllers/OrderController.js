const Order = require("../model/order.model");

const orderController = {
  // Them order Post: ../order/
  addOrder: async (req, res) => {
    try {
      const newOrder = new Order(req.body);
      const saveOrder = await newOrder.save();
      res.status(200).json(saveOrder);
    } catch (err) {
      res.status(500).json(err); // search google: http request code nếu muốn biết code nghĩa là gì
    }
  },

  //Get All Order GET: ../Order/
  getAll: async (req, res) => {
    try {
      let orders = await Order.find();
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
