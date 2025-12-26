const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  name: String,
  description: String,
  technologies: [String],
  image: String,
  previewLink: String,
  gitLink: String,
  adminLink: String, // Optional Access to Admin Panel
  adminLabel: String, // Custom Label for Admin Button
  appLink: String,   // Optional Link to Mobile App
  appLabel: String,   // Custom Label for App Button
  slug: { type: String, unique: true }, // URL friendly slug
  problemSolved: String, // SEO: What problem did this project solve?
  challenges: String, // New SEO Field: Challenges faced
  solutions: String, // New SEO Field: Solutions implemented
  performance: String, // New SEO Field: Performance optimizations
});

module.exports = mongoose.model("Project", projectSchema);
