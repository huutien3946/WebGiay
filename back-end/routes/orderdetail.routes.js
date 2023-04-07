const OrderDetailController = require("../controllers/OrderDetailController");
const { authJwt } = require("../middlewares");
const router = require("express").Router();

// router.post("/", OrderDetailController.addOrderDetail);
router.get(
  "/getall",
  authJwt.verifyToken,
  authJwt.isAdmin,
  OrderDetailController.getAll
);
router.get(
  "/:orderId",
  authJwt.verifyToken,
  OrderDetailController.getOrderDetail
);
router.put("/:id", OrderDetailController.editOrderDetail);

module.exports = router;
