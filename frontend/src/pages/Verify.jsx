import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/verify.css";
import api from "../assets/api"

const Verify = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [resendDisabled, setResendDisabled] = useState(false);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) {
      setError("Session expired. Please log in again.");
    }
  }, [userId]);

  const handleVerify = async () => {
    if (!otp) {
      setError("Please enter OTP");
      return;
    }
  
    if (!userId) {
      setError("Session expired. Please log in again.");
      return;
    }
  
    try {
      const response = await api.post("/verify-otp", { userId, otp });
  
      if (response.data.success) {
        console.log("OTP matched ✅");
        localStorage.setItem("isAuthenticated", "true"); // Set isAuthenticated flag
        navigate("/admin"); // Route to /admin
      } else {
        setError(response.data.error || "Invalid or expired OTP");
      }
    } catch (error) {
      setError("Error verifying OTP");
      console.error("❌ Verification error:", error);
    }
  };

  const handleResendOtp = async () => {
    if (!userId) {
      setError("Session expired. Please log in again.");
      return;
    }

    try {
      setResendDisabled(true);
      const response = await axios.post("http://localhost:5000/api/resend-otp", { userId });

      if (response.data.success) {
        setError("OTP resent successfully");
        setTimeout(() => setResendDisabled(false), 60000); // Disable resend for 1 minute
      } else {
        setError(response.data.error || "Failed to resend OTP");
        setResendDisabled(false);
      }
    } catch (error) {
      setError("Error resending OTP");
      console.error("❌ Resend OTP error:", error);
      setResendDisabled(false);
    }
  };

  return (
    <div className="verify-container">
      <h2>Verify OTP</h2>
      {error && <p className="error-message">{error}</p>}
      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        required
      />
      <button onClick={handleVerify}>Verify</button>
      <button onClick={handleResendOtp} disabled={resendDisabled}>
        Resend OTP
      </button>
    </div>
  );
};

export default Verify;