const productController = require("../controllers/ProductController");
const { authJwt } = require("../middlewares");
const router = require("express").Router();

router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});
// Them Giay
router.post("/", productController.addProduct);
router.get("/", productController.getAll);
router.get("/newProducts", productController.getNewProducts);
router.get("/ProductBrand/:brandId", productController.getProductBrand);

router.get("/:id", productController.getProduct);
router.put("/:id", productController.editProduct);

module.exports = router;
