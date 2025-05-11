import React, { useEffect, useState } from "react";
import "../css/about.css";
import api from "../assets/api";

const About = () => {
  const [profileImage, setProfileImage] = useState("");
  const [skills, setSkills] = useState([]);
  const [resumeUrl, setResumeUrl] = useState(""); // ✅ Added missing state
  const [loading, setLoading] = useState(true);
  

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

  return (
    <section id="about">
      <div className="about-container">
        <div className="about-image">
          {profileImage ? (
            <img src={profileImage} alt="Profile" />
          ) : (
            <p>Loading profile image...</p>
          )}
        </div>

        <div className="about-content">
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
            <li>
              <i className="fas fa-phone"></i> {import.meta.env.VITE_PHONE}
            </li>
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
            <div className="skills">
              {skills.length > 0 ? (
                skills.map((skill, index) => <span key={index}>{skill.name}</span>)
              ) : (
                <p>No skills found</p>
              )}
            </div>
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

</div>

        </div>
      </div>
    </section>
  );
};

export default About;
