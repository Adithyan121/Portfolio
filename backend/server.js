require("dotenv").config();
const express = require("express");
const cors = require("cors");
const compression = require("compression");
const helmet = require("helmet");
const connectDB = require("./config/db");
const resumeRoutes = require("./routes/resumeRoutes")

const projectRoutes = require("./routes/projectRoutes");
const skillRoutes = require("./routes/skillRoutes");
const profileRoutes = require("./routes/profileRoutes");
const authRoutes = require("./routes/authRoutes")

const blogRoutes = require("./routes/blogRoutes");
const caseStudyRoutes = require("./routes/caseStudyRoutes");

const app = express();

// Security and Optimization Middleware
app.use(helmet());
app.use(compression());

app.use(express.json());

const corsOptions = {
  origin: [
    "https://adithyan-phi.vercel.app",
    "http://localhost:5173",
    "http://localhost:3000"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
};

app.use(cors(corsOptions));


connectDB();

app.use("/api/projects", projectRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api", authRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/casestudies", caseStudyRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
