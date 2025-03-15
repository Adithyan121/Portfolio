const Profile = require("../models/profile");

exports.getProfileImage = async (req, res) => {
  try {
    const profile = await Profile.findOne();
    if (!profile) return res.status(404).json({ error: "No profile image found" });
    res.json({ imageUrl: profile.imageUrl });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch profile image" });
  }
};
