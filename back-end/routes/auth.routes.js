const authController = require("../controllers/AuthController");
const { verifySignUp } = require("../middlewares");
const router = require("express").Router();

// router.use(function (req, res, next) {
//   res.header(
//     "Access-Control-Allow-Headers",
//     "x-access-token, Origin, Content-Type, Accept"
//   );
//   next();
// });

router.post("/login", authController.signin);
router.post(
  "/register",
  verifySignUp.checkDuplicateUsernameOrEmail,
  authController.register
);

module.exports = router;
