const brandController = require("../controllers/BrandController");

const router = require("express").Router();

router.post("/", brandController.addBrand);
router.get("/", brandController.getAll);
router.get("/:id", brandController.getBrand);
router.put("/:id", brandController.editBrand);

module.exports = router;
