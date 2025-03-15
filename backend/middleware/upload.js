const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "portfolio_images",
    format: async (req, file) => "png",
    public_id: (req, file) => file.originalname.replace(/\.[^/.]+$/, ""),
  },
});

const upload = multer({ storage });

module.exports = upload;
