const express = require("express");
if (process.env.NODE_ENV !== "production") {
  const dns = require("node:dns");
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
}
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const mongoose = require("mongoose");

const appointmentRoutes = require("./routes/appointmentRoutes");
const symptomRoutes = require("./routes/symptomRoutes");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
// Middleware
app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());

// Health check route
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "CareMate API is running",
    database:
      mongoose.connection.readyState === 1 ? "connected" : "disconnected",
  });
});
app.use("/api/appointments", appointmentRoutes);
app.use("/api/symptoms", symptomRoutes);
// 404 handler for unknown API routes
app.use("/api", (req, res) => {
  res.status(404).json({ message: "API route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong on the server" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
