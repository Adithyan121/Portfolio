import React from "react";
import "../css/footer.css";

const handleSmoothScroll = (e, targetId) => {
  e.preventDefault();
  const section = document.getElementById(targetId);
  if (section) {
    window.scrollTo({
      top: section.offsetTop - 60,
      behavior: "smooth",
    });
  }
};

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Identity block (VERY IMPORTANT FOR SEO) */}
        <div className="footer-content">
          <h2 className="footer-title">Adithyan G</h2>
          <p className="footer-subtitle">
            MERN Stack Developer | Full Stack Web Developer
          </p>
          <p className="footer-location">Kerala, India</p>

          {/* Plain text link helps Google */}
          <p className="footer-website">
            Portfolio:{" "}
            <a href="https://adithyan-phi.vercel.app">
              https://adithyan-phi.vercel.app
            </a>
          </p>
        </div>

        {/* Internal navigation */}
        <div className="footer-links">
<<<<<<< HEAD
          <a href="#home" onClick={(e) => handleSmoothScroll(e, "home")}>
            Home
          </a>
          <a href="#about" onClick={(e) => handleSmoothScroll(e, "about")}>
            About
          </a>
          <a href="#projects" onClick={(e) => handleSmoothScroll(e, "projects")}>
            Projects
          </a>
          <a href="#contact" onClick={(e) => handleSmoothScroll(e, "contact")}>
            Contact
          </a>
=======

          <a href="#home" onClick={(e) => handleSmoothScroll(e, "home")}>Home</a>
          <a href="#about" onClick={(e) => handleSmoothScroll(e, "about")}>About</a>
          <a href="#projects" onClick={(e) => handleSmoothScroll(e, "projects")}>Projects</a>
          <Link to="/faq">FAQ</Link>
          <a href="#contact" onClick={(e) => handleSmoothScroll(e, "contact")}>Contact</a>

>>>>>>> c48ce3c (updated)
        </div>

        {/* Social profiles */}
        <div className="footer-socials">
          <a
            href={import.meta.env.VITE_GIT}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile of Adithyan G"
            className="footer-icon"
          >
            <i className="fab fa-github"></i>
          </a>

          <a
            href={import.meta.env.VITE_LINKED_IN}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile of Adithyan G"
            className="footer-icon"
          >
            <i className="fab fa-linkedin"></i>
          </a>

          <a
            href={import.meta.env.VITE_INSTAGRAM}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram profile of Adithyan G"
            className="footer-icon"
          >
            <i className="fab fa-instagram"></i>
          </a>

          <a
            href={import.meta.env.VITE_FACEBOOK || "https://facebook.com"}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook profile of Adithyan G"
            className="footer-icon"
          >
            <i className="fab fa-facebook"></i>
          </a>
        </div>

        {/* Copyright */}
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()}{" "}
            <strong>Adithyan G</strong> · MERN Stack Developer · All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
