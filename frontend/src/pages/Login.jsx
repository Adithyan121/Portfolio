import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/login.css";
import api from "../assets/api"

const Login = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!userId || !password) {
      setError("Please enter both User ID and Password");
      return;
    }

    try {
      const response = await api.post("/login", { userId, password });

      if (response.data.success) {
        localStorage.setItem("userId", userId); // Save userId for OTP verification
        navigate("/verify");
      } else {
        setError(response.data.error || "Invalid credentials");
      }
    } catch (error) {
      setError("Login failed. Please check credentials.");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="login-container">
      <h2>Admin Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
