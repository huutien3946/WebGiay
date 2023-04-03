const Cart = require("../model/cart.model");

const mongoose = require("mongoose");

const cartController = {
  //Them vào cart
  addItem: async (req, res) => {
    try {
      const { productId, quantity, price } = req.body;
      const userId = mongoose.Types.ObjectId(req.body.userId); // userId cần tìm
      const cart = await Cart.findOne({ userId: userId });
      console.log(userId);

      if (cart) {
        // Nếu giỏ hàng đã tồn tại, cập nhật số lượng sản phẩm
        console.log("vao if 1  ");
        const itemIndex = cart.items.findIndex((p) => p.productId == productId);
        if (itemIndex > -1) {
          // Sản phẩm đã tồn tại trong giỏ hàng, cập nhật số lượng
          cart.items[itemIndex].quantity += quantity;
          console.log("vao if 2  ");
        } else {
          // Sản phẩm chưa tồn tại trong giỏ hàng, thêm vào danh sách sản phẩm
          console.log("vao else 2 ");
          cart.items.push({ productId, quantity, price });
        }
        await cart.save();
        res.json(cart);
      } else {
        // Nếu giỏ hàng chưa tồn tại, tạo mới giỏ hàng và thêm sản phẩm
        console.log("vao else 1 ");
        const newCart = await Cart.create({
          userId: userId,
          items: [{ productId, quantity, price }],
        });
        res.json(newCart);
      }
    } catch (err) {
      res.status(500).json(err); // search google: http request code nếu muốn biết code nghĩa là gì
    }
  },

  // Xóa sản phẩm khỏi giỏ hàng
  removeItem: async (req, res) => {
    const { productId } = req.params;
    const cart = await Cart.findOne({ userId: req.userId });
    if (cart) {
      const itemIndex = cart.items.findIndex((p) => p.productId == productId);
      if (itemIndex > -1) {
        cart.items.splice(itemIndex, 1);
        await cart.save();
      }
      res.json(cart);
    } else {
      res.status(404).json({ message: "Cart not found" });
    }
  },

  // Xóa toàn bộ giỏ hàng
  clearCart: async (req, res) => {
    const cart = await Cart.findOne({ userId: req.params.id });
    if (cart) {
      cart.items = [];
      await cart.save();
      res.json(cart);
    } else {
      res.status(404).json({ message: "Cart not found" });
    }
  },

  // Lấy danh sách sản phẩm trong giỏ hàng
  getItems: async (req, res) => {
    const cart = await Cart.findOne({ userId: req.params.id });
    if (cart) {
      res.json(cart.items);
    } else {
      res.status(404).json({ message: "Cart not found" });
    }
  },

  // Lấy tổng số lượng sản phẩm trong giỏ hàng
  getTotalQuantity: async (req, res) => {
    const cart = await Cart.findOne({ userId: req.params.id });
    if (cart) {
      const totalQuantity = cart.items.reduce(
        (acc, item) => acc + item.quantity,
        0
      );
      res.json({ totalQuantity });
    } else {
      res.json({ totalQuantity: 0 });
    }
  },

  getTotalPrice: async (req, res) => {
    try {
      const cart = await Cart.findOne({ userId: req.params.id })
        .populate({
          path: "items.product",
          select: "name price",
        })
        .lean();

      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }

      const total = cart.items.reduce((acc, item) => {
        return acc + item.product.price * item.quantity;
      }, 0);

      res.status(200).json({ total });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },
};

module.exports = cartController;
