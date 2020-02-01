const { Router } = require("express");
const router = Router();

const userController = require("../app/controllers/userController");
const authController = require("../app/controllers/authController");

router.get("/", (req, res) => {
  return res.send({
    running: true
  });
});

router.post("/user", userController.store);
router.get("/user", userController.index);
router.post("/login", authController.login);

module.exports = router;
