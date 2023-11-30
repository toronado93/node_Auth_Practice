const express = require("express");
const router = express.Router();

const userController = require("../../controllers/userController");

router.get("/", userController.getUserName);
router.post("/userprofile", userController.getProfileData);

module.exports = router;
