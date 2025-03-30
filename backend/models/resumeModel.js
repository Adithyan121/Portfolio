const mongoose = require("mongoose");

const ResumeSchema = new mongoose.Schema({
  resumeUrl: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("Resume", ResumeSchema);
