const express = require("express");

const loadData = require('../services/loadData')

const router = new express.Router();

router.get("/api/appointments", async (req, res) => {
  const appointmentData = loadData('appointmentData.json')
  res.send(appointmentData);
});

module.exports = router;
