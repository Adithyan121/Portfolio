const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  code: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 120 }, // Auto delete after 2 minutes
  lastRequestedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("OTP", otpSchema);