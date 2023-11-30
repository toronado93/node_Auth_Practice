const express = require("express");
const router = express.Router();
const systemController = require("../../controllers/systemController");
const checkFileExistence = require("../../middleware/checkFileExistence");

router
  .route("/")
  .get(systemController.getMethod)
  .post(systemController.postMethod);

router.route("/os").get(systemController.getOS);

router.route("/copyfile").post(checkFileExistence, systemController.copyfile);

module.exports = router;
