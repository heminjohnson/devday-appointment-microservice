const express = require("express");
const fs = require("fs");

const loadData = require("../services/loadData");

const router = new express.Router();

router.get("/api/appointments", async (req, res) => {
  const appointmentData = loadData("appointmentData.json");
  res.send(appointmentData);
});

router.post("/api/appointments", async (req, res) => {
  const appointmentData = req.body;
  console.log(
    !appointmentData.userIds ||
      !appointmentData.restaurantId ||
      !appointmentData.date_time
  );
  if (
    !appointmentData.userIds ||
    !appointmentData.restaurantId ||
    !appointmentData.date_time
  ) {
    res.status(403).send("Wrong properties, check documentation");
  }
  const appointments = loadData("appointmentData.json");
  const lastId = !appointments[appointments.length - 1]
    ? 1
    : appointments[appointments.length - 1].id + 1;
  appointments.push({
    id: lastId,
    ...appointmentData
  });
  fs.writeFileSync("appointmentData.json", JSON.stringify(appointments));
  res.send(appointmentData);
});

router.delete("/api/appointments", async (req, res) => {
  const { password } = req.body;
  if (!password) {
    res.status(403).send("Wrong properties, check documentation");
  }
  if (password !== "12345") {
    res.status(403).send("Wrong Password");
  } else {
    fs.writeFileSync("appointmentData.json", JSON.stringify([]));
    res.send("Successfully deleted all appointments");
  }
});

module.exports = router;
