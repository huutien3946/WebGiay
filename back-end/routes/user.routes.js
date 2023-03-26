const userController = require("../controllers/UserController");

const router = require("express").Router();

router.post("/", userController.addUser);
router.get("/", userController.getAll);
router.get("/:id", userController.getUser);
router.put("/:id", userController.editUser);

module.exports = router;
