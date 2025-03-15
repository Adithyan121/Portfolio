import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({
  name: String,
  email: String,
  image: String,
});

const GallerySchema = new mongoose.Schema({
  image: String,
});

const AboutSchema = new mongoose.Schema({
  skills: [String],
  bio: String,
});

const ProjectSchema = new mongoose.Schema({
  name: String,
  summary: String,
  details: String,
  image: String,
});

export const Profile = mongoose.model("Profile", ProfileSchema);
export const Gallery = mongoose.model("Gallery", GallerySchema);
export const About = mongoose.model("About", AboutSchema);
export const Project = mongoose.model("Project", ProjectSchema);
