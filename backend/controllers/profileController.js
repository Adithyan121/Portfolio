const Profile = require("../models/profile");
const { v2: cloudinary } = require("cloudinary");
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.getProfileImage = async (req, res) => {
  try {
    const profile = await Profile.findOne();
    if (!profile) return res.status(404).json({ error: "No profile image found" });
    res.json({ imageUrl: profile.imageUrl });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch profile image" });
  }
};

exports.uploadProfileImage = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const result = await cloudinary.uploader.upload(req.file.path);

    let profile = await Profile.findOne();
    if (profile) {
      profile.imageUrl = result.secure_url;
      await profile.save();
    } else {
      profile = await Profile.create({ imageUrl: result.secure_url });
    }

    res.json({ imageUrl: result.secure_url });
  } catch (error) {
    res.status(500).json({ error: "Failed to upload profile image" });
  }
};

exports.deleteProfileImage = async (req, res) => {
  try {
    const profile = await Profile.findOne();
    if (!profile) return res.status(404).json({ error: "No profile image found" });

    await Profile.deleteOne();
    res.json({ message: "Profile image deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete profile image" });
  }
};
