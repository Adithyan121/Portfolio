import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import "../css/about.css";
import api from "../assets/api";

const About = () => {
  const [profileImage, setProfileImage] = useState("");
  const [skills, setSkills] = useState([]);
  const [resumeUrl, setResumeUrl] = useState(""); // ✅ Added missing state
  const [loading, setLoading] = useState(true);

  // Mouse Parallax Logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const shapeX = useTransform(mouseX, [0, window.innerWidth], [-20, 20]);
  const shapeY = useTransform(mouseY, [0, window.innerHeight], [-20, 20]);

  // Fetch Profile Image
  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const response = await api.get("/profile");
        setProfileImage(response.data.imageUrl);
      } catch (error) {
        console.error("Error fetching profile image:", error);
      }
    };
    fetchProfileImage();
  }, []);

  // Fetch Resume
  useEffect(() => {
    const fetchResume = async () => {
      try {
        const res = await api.get("/resume");
        setResumeUrl(res.data.resumeUrl);
      } catch (error) {
        console.error("Error fetching resume:", error);
      }
    };
    fetchResume();
  }, []);

  const handleDownload = async () => {
    try {
      const response = await fetch(resumeUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "Adithyan_G_Resume.pdf";
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading resume:", error);
    }
  };


  // Fetch Skills
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await api.get("/skills");
        setSkills(response.data);
      } catch (error) {
        console.error("Error fetching skills:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  // Helper to optimize Cloudinary URLs
  const getOptimizedImage = (url) => {
    if (!url || !url.includes("cloudinary.com")) return url;
    return url.replace("/upload/", "/upload/w_500,q_auto,f_auto/");
  };

  return (
    <section id="about">
      <div className="about-container">
        {/* Parallax Shapes */}
        <motion.div style={{ x: shapeX, y: shapeY }} className="shape-about-1" />
        <motion.div style={{ x: useTransform(shapeX, v => -v), y: useTransform(shapeY, v => -v) }} className="shape-about-2" />

        {/* Animated Image Section */}
        <motion.div
          className="about-image"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.3 }}
        >
          {profileImage ? (
            <img src={getOptimizedImage(profileImage)} alt="Profile" width="320" height="320" loading="lazy" />
          ) : (
            <p>Loading profile image...</p>
          )}
        </motion.div>

        {/* Animated Content Section */}
        <motion.div
          className="about-content"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <h2>About Me</h2>
          <p>
            I'm <b>Adithyan G</b>, a passionate <b>MERN Stack Developer</b> from Kerala, India.
            I specialize in building <b>interactive & scalable web applications</b>.
            With a background in Aeronautical Engineering, I bring a <b>unique analytical</b> approach to software development.
          </p>

          <h3>Contact</h3>
          <ul className="contact-list">
            <li>
              <a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${import.meta.env.VITE_EMAIL}`}>
                <i className="fas fa-envelope"></i> {import.meta.env.VITE_EMAIL}
              </a>
            </li>
            {/* <li>
              <i className="fas fa-phone"></i> {import.meta.env.VITE_PHONE}
            </li> */}
            <li>
              <i className="fas fa-map-marker-alt"></i> Kollam, Kerala, India
            </li>
          </ul>

          <h3>Connect with Me</h3>
          <div className="social-links">
            <a href={import.meta.env.VITE_GIT} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-github"></i>
            </a>
            <a href={import.meta.env.VITE_LINKED_IN} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href={import.meta.env.VITE_INSTAGRAM} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
          </div>

          <h3>Education</h3>
          <ul>
            <li><b>Bachelor of Technology (B.Tech) in Aeronautical Engineering</b> - Jawaharlal College Of Engineering and Technology (2019-2023)</li>
          </ul>

          <h3>Skills</h3>
          {loading ? (
            <p>Loading skills...</p>
          ) : (
            <motion.div
              className="skills"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {skills.length > 0 ? (
                skills.map((skill, index) => <span key={index}>{skill.name}</span>)
              ) : (
                <p>No skills found</p>
              )}
            </motion.div>
          )}

          <div className="buttons">
            {/* <a
    href={resumeUrl}
    download="Adithyan_G_Resume.pdf"
    target="_blank"
    rel="noopener noreferrer"
    className="resume-btn"
  >
    Download Resume
  </a> */}
            <button onClick={handleDownload} className="resume-btn">Download Resume</button>
            <a
              href="https://www.buymeacoffee.com/mr._a.d.i__"
              target="_blank"
              rel="noopener noreferrer"
              className="coffee-btn"
            >
              <i className="fas fa-coffee"></i> Buy Me a Coffee
            </a>

          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default About;
