const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  name: String,
  description: String,
  technologies: [String],
  image: String,
  previewLink: String,
  gitLink: String,
});

module.exports = mongoose.model("Project", projectSchema);
