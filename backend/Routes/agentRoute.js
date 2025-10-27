const express = require("express");
const router = express.Router();
const { verifyToken, isAgent } = require("../middleware/auth");

router.get("/dashboardAgent", verifyToken, isAgent, (req, res) => {
  res.json({ message: "Agent dashboard" });
});

module.exports = router;
