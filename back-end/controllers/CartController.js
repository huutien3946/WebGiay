const Cart = require("../model/cart.model");

const mongoose = require("mongoose");

const cartController = {
  //Them vào cart
  addItem: async (req, res) => {
    try {
      const { sizeId, price } = req.body;
      const quantity = req.body.quantity || 1;
      const userId = req.userId;
      const userIdDb = mongoose.Types.ObjectId(userId); // userId cần tìm
      const sizeIdDb = mongoose.Types.ObjectId(sizeId); // userId cần tì
      const cart = await Cart.findOne({ userId: userIdDb });

      if (cart) {
        // Nếu giỏ hàng đã tồn tại, cập nhật số lượng sản phẩm
        const itemIndex = cart.items.findIndex((p) =>
          p.sizeId.equals(sizeIdDb)
        );

        if (itemIndex > -1) {
          // Sản phẩm đã tồn tại trong giỏ hàng, cập nhật số lượng
          cart.items[itemIndex].quantity += quantity;
        } else {
          // Sản phẩm chưa tồn tại trong giỏ hàng, thêm vào danh sách sản phẩm
          cart.items.push({ sizeId, quantity, price });
        }
        await cart.save();
        res.json(cart);
      } else {
        // Nếu giỏ hàng chưa tồn tại, tạo mới giỏ hàng và thêm sản phẩm
        console.log("vao else 1 ");
        const newCart = await Cart.create({
          userId: userId,
          items: [{ sizeId, quantity, price }],
        });
        console.log(newCart);
        res.json(newCart);
      }
    } catch (err) {
      res.status(500).json(err); // search google: http request code nếu muốn biết code nghĩa là gì
    }
  },

  // Xóa sản phẩm khỏi giỏ hàng
  removeItem: async (req, res) => {
    const sizeId = req.params.sizeId;
    const userId = req.userId;

    const userIdDb = mongoose.Types.ObjectId(userId); // userId cần tìm
    const sizeIdDb = mongoose.Types.ObjectId(sizeId);

    const cart = await Cart.findOne({ userId: userIdDb });
    if (cart) {
      const itemIndex = cart.items.findIndex((p) => p.sizeId.equals(sizeIdDb));
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
    const userId = req.userId;
    const userIdDb = mongoose.Types.ObjectId(userId); // userId cần tìm
    const cart = await Cart.findOne({ userId: userIdDb });
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
    const userId = req.userId;
    const userIdDb = mongoose.Types.ObjectId(userId); // userId cần tìm
    const cart = await Cart.findOne({ userId: userIdDb })
      .populate("items.sizeId")
      .populate({
        path: "items.sizeId",
        populate: { path: "productId" },
      });

    if (cart) {
      res.json(cart.items);
    } else {
      res.status(404).json({ message: "Cart not found" });
    }
  },

  // Lấy tổng số lượng sản phẩm trong giỏ hàng
  getTotalQuantity: async (req, res) => {
    const { userId } = req.body;
    const userIdDb = mongoose.Types.ObjectId(userId); // userId cần tìm
    const cart = await Cart.findOne({ userId: userIdDb });
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
      const { userId } = req.body;
      const userIdDb = mongoose.Types.ObjectId(userId);
      const cart = await Cart.findOne({ userId: userIdDb })
        .populate({
          path: "items.sizeId",
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
