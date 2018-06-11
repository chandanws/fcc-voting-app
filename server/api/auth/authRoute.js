const router = require("express").Router();
const authController = require("./authController");

router.post("/login", authController.login);

router.post("/register", authController.register);

router.get("/username/:username", authController.username_available);

module.exports = router;
