const Resume = require("../models/resumeModel");

const uploadResume = async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }
  
      // With Cloudinary, the URL is in req.file.path or req.file.url
      const resumeUrl = req.file.path || req.file.url;
  
      // Delete existing resume before saving a new one
      await Resume.deleteMany({});
  
      // Save resume URL in the database
      const newResume = new Resume({ resumeUrl });
      await newResume.save();
  
      res.status(201).json({ 
        message: "Resume uploaded successfully", 
        resumeUrl 
      });
    } catch (error) {
      console.error("Error uploading resume:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

// Get Resume
const getResume = async (req, res) => {
  try {
    const resume = await Resume.findOne().sort({ createdAt: -1 }); // Get the latest resume
    if (!resume) {
      return res.status(404).json({ error: "Resume not found" });
    }
    res.json({ resumeUrl: resume.resumeUrl });
  } catch (error) {
    console.error("Error fetching resume:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete Resume
const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findOne();
    if (!resume) {
      return res.status(404).json({ error: "No resume found to delete" });
    }

    await Resume.deleteMany({});
    res.json({ message: "Resume deleted successfully" });
  } catch (error) {
    console.error("Error deleting resume:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { uploadResume, getResume, deleteResume };
