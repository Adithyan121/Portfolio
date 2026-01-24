import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/login.css";
import api from "../assets/api"

import { useNotification } from "../context/NotificationContext";

const Login = () => {
  const { notify } = useNotification();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!userId || !password) {
      setError("Please enter both User ID and Password");
      notify.warning("Please enter both User ID and Password");
      return;
    }

    try {
      const response = await api.post("/login", { userId, password });

      if (response.data.success) {
        localStorage.setItem("isAuthenticated", "true"); // Direct auth
        localStorage.setItem("userId", userId);
        notify.success("Login successful!");
        navigate("/admin");
      } else {
        const msg = response.data.error || "Invalid credentials";
        setError(msg);
        notify.error(msg);
      }
    } catch (error) {
      const msg = "Login failed. Please check credentials.";
      setError(msg);
      notify.error(msg);
      console.error("Login error:", error);
    }
  };

  return (
    <div className="login-container">
      <Helmet>
        <title>Admin Login | Adithyan G</title>
        <meta name="robots" content="noindex" />
      </Helmet>
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
