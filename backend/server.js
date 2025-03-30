require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const resumeRoutes = require("./routes/resumeRoutes")

const projectRoutes = require("./routes/projectRoutes");
const skillRoutes = require("./routes/skillRoutes");
const profileRoutes = require("./routes/profileRoutes");
const authRoutes = require("./routes/authRoutes")

const app = express();
app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/projects", projectRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api", authRoutes);
app.use("/api/resume", resumeRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
