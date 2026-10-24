const Appointment = require("../models/Appointment");

// POST /api/appointments
const createAppointment = async (req, res, next) => {
  try {
    const { patientName, email, phone, department, date, timeSlot, reason } =
      req.body;

    if (!patientName || !email || !phone || !department || !date || !timeSlot) {
      return res
        .status(400)
        .json({ message: "Please fill in all required fields" });
    }

    const appointmentDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (isNaN(appointmentDate) || appointmentDate < today) {
      return res
        .status(400)
        .json({ message: "Please choose a valid future date" });
    }

    // Prevent double booking of the same department, date and slot
    const taken = await Appointment.findOne({
      department,
      date: appointmentDate,
      timeSlot,
      status: { $ne: "cancelled" },
    });
    if (taken) {
      return res
        .status(409)
        .json({
          message: "This time slot is already booked. Please pick another.",
        });
    }

    const appointment = await Appointment.create({
      patientName,
      email,
      phone,
      department,
      date: appointmentDate,
      timeSlot,
      reason,
    });

    res
      .status(201)
      .json({ message: "Appointment booked successfully", appointment });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    next(error);
  }
};

// GET /api/appointments/slots?department=Cardiology&date=2026-11-01
const getBookedSlots = async (req, res, next) => {
  try {
    const { department, date } = req.query;
    if (!department || !date) {
      return res
        .status(400)
        .json({ message: "department and date are required" });
    }
    const booked = await Appointment.find({
      department,
      date: new Date(date),
      status: { $ne: "cancelled" },
    }).select("timeSlot -_id");

    res.json({ bookedSlots: booked.map((a) => a.timeSlot) });
  } catch (error) {
    next(error);
  }
};

// GET /api/appointments?email=someone@mail.com
const getAppointmentsByEmail = async (req, res, next) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.status(400).json({ message: "email is required" });
    }
    const appointments = await Appointment.find({
      email: email.toLowerCase(),
    }).sort({ date: -1 });
    res.json({ appointments });
  } catch (error) {
    next(error);
  }
};

module.exports = { createAppointment, getBookedSlots, getAppointmentsByEmail };
