const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "You reach to particular test area" });
});

module.exports = router;
