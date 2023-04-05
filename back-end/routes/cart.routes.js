const cartController = require("../controllers/CartController");
const { authJwt } = require("../middlewares");
const router = require("express").Router();

router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

// Route to add an item to the cart
router.post("/addItem", authJwt.verifyToken, cartController.addItem);

// Route to remove an item from the cart
router.delete("/removeItem/:productId", cartController.removeItem);

// Route to clear the cart
router.post("/clear/:id", cartController.clearCart);

// Route to get all items in the cart
router.get("/", authJwt.verifyToken, cartController.getItems);

// Route to get the total quantity of items in the cart
router.get("/quantity/:id", cartController.getTotalQuantity);

// Route to get the total price of items in the cart
router.get("/price/:id", cartController.getTotalPrice);

module.exports = router;
