const express = require("express");
const {
  createAppointment,
  getBookedSlots,
  getAppointmentsByEmail,
} = require("../controllers/appointmentController");

const router = express.Router();

router.post("/", createAppointment);
router.get("/slots", getBookedSlots);
router.get("/", getAppointmentsByEmail);

module.exports = router;
