const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

// Image Storage Configuration
const imageStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "portfolio_images",
    format: async (req, file) => "png",
    public_id: (req, file) => file.originalname.replace(/\.[^/.]+$/, ""),
  },
});

const upload = multer({ storage: imageStorage });

// Resume Storage Configuration
const resumeStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "portfolio_resumes",
    format: async (req, file) => "pdf",
    public_id: (req, file) => `resume_${Date.now()}`,
    resource_type: "raw",
  },
});

const uploadResume = multer({ 
  storage: resumeStorage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed!"), false);
    }
  }
});

// Corrected Export
module.exports = { upload, uploadResume };
