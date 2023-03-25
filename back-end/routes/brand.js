const brandController = require("../controllers/BrandController");

const router = require("express").Router();

// Them Giay
router.post("/", brandController.addBrand);

module.exports = router;
