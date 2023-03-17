const giayController = require("../controllers/GiayController");

const router = require("express").Router();

// Them Giay
router.post("/", giayController.addShose);

module.exports = router;
