const productController = require("../controllers/ProductController");

const router = require("express").Router();

// Them Giay
router.post("/", productController.addProduct);
router.get("/", productController.getAll);
router.get("/:id", productController.getProduct);
router.put("/:id", productController.editProduct);

module.exports = router;
