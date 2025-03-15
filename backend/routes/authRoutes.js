const express = require("express");
const { login, verifyOtp, resendOtp } = require("../controllers/authController");

const router = express.Router();

// ✅ LOGIN & GENERATE OTP
router.post("/login", login);

// ✅ VERIFY OTP
router.post("/verify-otp", verifyOtp);

// ✅ RESEND OTP
router.post("/resend-otp", resendOtp);

module.exports = router;