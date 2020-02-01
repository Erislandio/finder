const { Router } = require("express");
const router = Router();

const userController = require("../app/controllers/userController");
const providerController = require("../app/controllers/providerController");
const authController = require("../app/controllers/authController");
const authMiddleware = require("../app/middlewares/auth");
const searchProvider = require("../app/controllers/searchProvider");
const multerConfig = require("../config/multer");
const multer = require("multer");
const fileController = require("../app/controllers/fileController");

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

// Buscar Provedores
router.post("/search", authMiddleware, searchProvider.index);

// * Authentication
router.post("/login", authController.login);

router.post("/file", multer(multerConfig).single("file"), fileController.store);

module.exports = router;
