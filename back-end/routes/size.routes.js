const sizeController = require("../controllers/SizeController");

const router = require("express").Router();

// Them Giay
router.post("/", sizeController.addSize);

module.exports = router;
