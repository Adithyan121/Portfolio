import React from "react";
import { Link } from "react-router-dom";
import "../css/footer.css";

const handleSmoothScroll = (e, targetId) => {
  e.preventDefault();
  const section = document.getElementById(targetId);
  if (section) {
    window.scrollTo({
      top: section.offsetTop - 60, // Adjust for navbar height
      behavior: "smooth",
    });
  }
  setMenuOpen(false); // Close menu after clicking a link
};

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <h2 className="footer-title">Adithyan G</h2>
          <p className="footer-subtitle">Full Stack Developer | MERN</p>
          <p className="footer-location">Based in Kerala, India</p>
        </div>

        <div className="footer-links">

          <a href="#home" onClick={(e) => handleSmoothScroll(e, "home")}>Home</a>
          <a href="#about" onClick={(e) => handleSmoothScroll(e, "about")}>About</a>
          <a href="#projects" onClick={(e) => handleSmoothScroll(e, "projects")}>Projects</a>
          <a href="#contact" onClick={(e) => handleSmoothScroll(e, "contact")}>Contact</a>

        </div>

        <div className="footer-socials">
          <a href={import.meta.env.VITE_GIT} target="_blank" rel="noopener noreferrer" className="footer-icon">
            <i className="fab fa-github"></i>
          </a>
          <a href={import.meta.env.VITE_LINKED_IN} target="_blank" rel="noopener noreferrer" className="footer-icon">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href={import.meta.env.VITE_INSTAGRAM} target="_blank" rel="noopener noreferrer" className="footer-icon">
            <i className="fab fa-instagram"></i>
          </a>
          <a href={import.meta.env.VITE_FACEBOOK || "https://facebook.com"} target="_blank" rel="noopener noreferrer" className="footer-icon">
            <i className="fab fa-facebook"></i>
          </a>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Adithyan G | All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
