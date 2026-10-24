const mongoose = require("mongoose");

const symptomCheckSchema = new mongoose.Schema(
  {
    symptoms: { type: String, required: true, trim: true, maxlength: 1000 },
    age: { type: Number, min: 0, max: 120 },
    gender: {
      type: String,
      enum: ["male", "female", "other", ""],
      default: "",
    },
    result: {
      urgency: { type: String, enum: ["low", "medium", "high", "emergency"] },
      possibleConditions: [String],
      recommendedDepartment: String,
      advice: String,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("SymptomCheck", symptomCheckSchema);
