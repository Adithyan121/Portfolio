const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const User = require("../models/User");
const OTP = require("../models/OTP");

// Email Configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

// ✅ LOGIN & GENERATE OTP
const login = async (req, res) => {
  const { userId, password } = req.body;
  console.log("🔹 Login Request:", req.body);

  if (!userId || !password) {
    return res.status(400).json({ success: false, error: "Missing userId or password" });
  }

  try {
    const user = await User.findOne({ userId });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ success: false, error: "Invalid credentials" });
    }

    // Prevent OTP spam (Allow only after 1 min)
    const existingOtp = await OTP.findOne({ userId });

    if (existingOtp && Date.now() - existingOtp.lastRequestedAt < 60000) {
      return res.status(429).json({ success: false, error: "Please wait 1 minute before requesting a new OTP." });
    }

    // Generate new OTP
    const otpCode = Math.floor(1000 + Math.random() * 9000).toString();
    console.log("✅ Generated OTP:", otpCode);

    if (existingOtp) {
      existingOtp.code = otpCode;
      existingOtp.createdAt = new Date();
      existingOtp.lastRequestedAt = new Date();
      await existingOtp.save();
      console.log("Updated existing OTP in DB");
    } else {
      await OTP.create({ userId, code: otpCode, createdAt: new Date(), lastRequestedAt: new Date() });
      console.log("Created new OTP in DB");
    }

    // Send OTP via Email
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: "techtoday038@gmail.com",
      subject: "Your OTP Code",
      text: `Your OTP is: ${otpCode}. It is valid for 2 minutes.`,
    });

    res.json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    console.error("❌ Login error:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// ✅ VERIFY OTP
const verifyOtp = async (req, res) => {
  const { userId, otp } = req.body;
  console.log("🔹 OTP Verification Request:", req.body);

  if (!userId || !otp) {
    return res.status(400).json({ success: false, error: "Missing userId or OTP" });
  }

  try {
    const validOtp = await OTP.findOne({ userId });
    console.log("Retrieved OTP from DB:", validOtp);

    if (!validOtp) {
      return res.status(400).json({ success: false, error: "OTP not found or expired" });
    }

    console.log("✅ Retrieved OTP from DB:", validOtp.code);

    const otpAge = Date.now() - validOtp.createdAt;
    if (otpAge > 120000) { // 2 minutes expiry
      await OTP.deleteOne({ userId });
      return res.status(400).json({ success: false, error: "OTP expired" });
    }

    if (validOtp.code !== otp) {
      return res.status(400).json({ success: false, error: "Incorrect OTP" });
    }

    // OTP is correct
    console.log("OTP matched ✅"); // Add this line
    await OTP.deleteOne({ userId });

    res.json({ success: true, message: "OTP verified successfully" });
  } catch (error) {
    console.error("❌ OTP verification error:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// ✅ RESEND OTP
const resendOtp = async (req, res) => {
  const { userId } = req.body;
  console.log("🔹 Resend OTP Request:", req.body);

  if (!userId) {
    return res.status(400).json({ success: false, error: "Missing userId" });
  }

  try {
    const user = await User.findOne({ userId });

    if (!user) {
      return res.status(400).json({ success: false, error: "User not found" });
    }

    // Prevent OTP spam (Allow only after 1 min)
    const existingOtp = await OTP.findOne({ userId });

    if (existingOtp && Date.now() - existingOtp.lastRequestedAt < 60000) {
      return res.status(429).json({ success: false, error: "Please wait 1 minute before requesting a new OTP." });
    }

    // Generate new OTP
    const otpCode = Math.floor(1000 + Math.random() * 9000).toString();
    console.log("✅ Generated OTP:", otpCode);

    if (existingOtp) {
      existingOtp.code = otpCode;
      existingOtp.createdAt = new Date();
      existingOtp.lastRequestedAt = new Date();
      await existingOtp.save();
    } else {
      await OTP.create({ userId, code: otpCode, createdAt: new Date(), lastRequestedAt: new Date() });
    }

    // Send OTP via Email
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: "techtoday038@gmail.com",
      subject: "Your OTP Code",
      text: `Your OTP is: ${otpCode}. It is valid for 2 minutes.`,
    });

    res.json({ success: true, message: "OTP resent successfully" });
  } catch (error) {
    console.error("❌ Resend OTP error:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

module.exports = {
  login,
  verifyOtp,
  resendOtp,
};
