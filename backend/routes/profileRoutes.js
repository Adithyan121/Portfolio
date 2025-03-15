const express = require("express");
const { getProfileImage } = require("../controllers/profileController");

const router = express.Router();

router.get("/", getProfileImage);

module.exports = router;
