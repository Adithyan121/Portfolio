const express = require("express");
const { getProfileImage, uploadProfileImage, deleteProfileImage } = require("../controllers/profileController");
const {upload} = require("../middleware/upload");

const router = express.Router();

router.get("/", getProfileImage);
router.post("/", upload.single("image"), uploadProfileImage); // Added missing POST route
router.delete("/", deleteProfileImage);

module.exports = router;
