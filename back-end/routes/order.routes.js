const OrderController = require("../controllers/OrderController");

const router = require("express").Router();

router.post("/", OrderController.addOrder);
router.get("/", OrderController.getAll);
router.get("/:id", OrderController.getOrder);
router.put("/:id", OrderController.editOrder);

module.exports = router;
