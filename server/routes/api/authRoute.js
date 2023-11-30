const express = require("express");
const router = express.Router();

const authController = require("../../controllers/authController");

router.post("/", authController.handleLogin);
router.post("/logout", authController.handleLogOut);

module.exports = router;
