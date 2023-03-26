const OrderDetailController = require("../controllers/OrderDetailController");

const router = require("express").Router();

router.post("/", OrderDetailController.addOrderDetail);
router.get("/", OrderDetailController.getAll);
router.get("/:id", OrderDetailController.getOrderDetail);
router.put("/:id", OrderDetailController.editOrderDetail);

module.exports = router;
