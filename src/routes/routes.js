const { Router } = require("express");
const router = Router();
const multer = require("multer");
const userController = require("../app/controllers/userController");
const providerController = require("../app/controllers/providerController");
const authController = require("../app/controllers/authController");
const authMiddleware = require("../app/middlewares/auth");
const searchProvider = require("../app/controllers/searchProvider");
const multerConfig = require("../config/multer");
const fileController = require("../app/controllers/fileController");
const postController = require("../app/controllers/postController");

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
router.patch("/user/image", authMiddleware, userController.updateImage);
router.patch("/user/banner", authMiddleware, userController.updateBanner);

// Provider
router.post("/provider", providerController.store);
router.get("/provider", providerController.index);
router.delete("/provider", authMiddleware, providerController.delete);
router.patch("/provider", authMiddleware, providerController.update);
router.patch(
  "/provider/banner",
  authMiddleware,
  providerController.updateBanner
);
router.patch("/provider/image", authMiddleware, providerController.updateImage);
router.patch(
  "/provider/banner",
  authMiddleware,
  providerController.updateBanner
);

// Buscar Provedores
router.post("/search", authMiddleware, searchProvider.index);
router.post("/search/type", authMiddleware, searchProvider.searchByType);

// comentários e posts

router.get("/provider/posts", authMiddleware, postController.indexByProviderId);
router.post("/provider/post", authMiddleware, postController.store);
router.patch("/provider/post", authMiddleware, postController.update);
router.delete("/provider/post", authMiddleware, postController.delete);

// * Authentication
router.post("/login", authController.login);

router.post(
  "/image/v2/photo",
  authMiddleware,
  multer(multerConfig).single("file"),
  fileController.storePhoto
);

router.post(
  "/image/v2/banner",
  multer(multerConfig).single("file"),
  fileController.storeBanner
);

module.exports = router;
