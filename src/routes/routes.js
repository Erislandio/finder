const { Router } = require("express");
const router = Router();

const userController = require("../app/controllers/userController");
const authController = require("../app/controllers/authController");
const authMiddleware = require("../app/middlewares/auth");

router.get("/", (req, res) => {
  return res.send({
    running: true
  });
});

// * User
router.post("/user", userController.store);
router.get("/user", userController.index);
router.delete("/user", authMiddleware, userController.delete);
router.patch("/user", authMiddleware, userController.update);

// * Authentication
router.post("/login", authController.login);

module.exports = router;
