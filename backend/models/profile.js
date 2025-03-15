const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  imageUrl: String,
});

module.exports = mongoose.model("Profile", profileSchema);
