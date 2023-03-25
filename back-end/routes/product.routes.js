const productController = require("../controllers/ProductController");

const router = require("express").Router();

// Them Giay
router.post("/", productController.addProduct);

module.exports = router;
