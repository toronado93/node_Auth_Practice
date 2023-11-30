const express = require("express");
const router = express.Router();

const userController = require("../../controllers/userController");
const checkAuthor = require("../../middleware/checkAuth");

router.get("/", userController.getUserName);
router.post("/userprofile/:name", checkAuthor, userController.getProfileData);

module.exports = router;
