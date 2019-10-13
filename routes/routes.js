const express = require("express");

const router = new express.Router();

router.get("/api/appointments", async (req, res) => {
  res.send("test");
});

module.exports = router;
