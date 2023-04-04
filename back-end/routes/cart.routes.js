const cartController = require("../controllers/CartController");
const router = require("express").Router();

// Route to add an item to the cart
router.post("/addItem", cartController.addItem);

// Route to remove an item from the cart
router.delete("/removeItem/:productId", cartController.removeItem);

// Route to clear the cart
router.post("/clear/:id", cartController.clearCart);

// Route to get all items in the cart
router.get("/:id", cartController.getItems);

// Route to get the total quantity of items in the cart
router.get("/quantity/:id", cartController.getTotalQuantity);

// Route to get the total price of items in the cart
router.get("/price/:id", cartController.getTotalPrice);

module.exports = router;
