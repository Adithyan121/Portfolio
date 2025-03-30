// In your resumeRoutes.js
const express = require("express");
const router = express.Router();
const { uploadResume, getResume, deleteResume } = require("../controllers/resumeController");
const { uploadResume: resumeUpload } = require("../middleware/upload"); // Import the specific upload middleware

router.post("/", resumeUpload.single("resume"), uploadResume);
router.get("/", getResume);
router.delete("/", deleteResume);

module.exports = router;