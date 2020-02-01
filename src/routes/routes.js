const { Router } = require("express");
const router = Router();

const userController = require("../app/controllers/userController");
const providerController = require("../app/controllers/providerController");
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

// Provider
router.post("/provider", providerController.store);
router.get("/provider", providerController.index);
router.delete("/provider", authMiddleware, providerController.delete);
router.patch("/provider", authMiddleware, providerController.update);

// * Authentication
router.post("/login", authController.login);

module.exports = router;
