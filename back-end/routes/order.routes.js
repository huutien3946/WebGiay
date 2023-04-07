const OrderController = require("../controllers/OrderController");
const { authJwt } = require("../middlewares");
const router = require("express").Router();

router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.post("/", authJwt.verifyToken, OrderController.addOrder);
router.get("/", authJwt.verifyToken, OrderController.getAll);
router.get("/:id", OrderController.getOrder);
router.put("/:id", OrderController.editOrder);

module.exports = router;
