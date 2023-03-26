const sizeController = require("../controllers/SizeController");

const router = require("express").Router();

// Them Giay
router.post("/", sizeController.addSize);
router.get("/", sizeController.getAll);
router.get("/:id", sizeController.getSize);
router.put("/:id", sizeController.editSize);
module.exports = router;
