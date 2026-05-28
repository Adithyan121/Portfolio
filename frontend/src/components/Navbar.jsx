import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa"; // FontAwesome icons
import { RiMenuUnfold2Fill } from "react-icons/ri";
import "../css/navbar.css";

const Navbar = () => {
  const [scrolling, setScrolling] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    if (location.pathname === "/") {
      const section = document.getElementById(targetId);
      if (section) {
        window.scrollTo({
          top: section.offsetTop - 60, // Adjust for navbar height
          behavior: "smooth",
        });
      }
    } else {
      navigate(`/#${targetId}`);
    }
    setMenuOpen(false); // Close menu after clicking a link
  };

  return (
    <nav className={`navbar ${scrolling ? "scrolling" : ""}`}>
      <div className="right">
        <Link to="/">ADI</Link>
      </div>

      {/* Hamburger Icon (Mobile) */}
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <RiMenuUnfold2Fill />}
      </div>

      {/* Navbar Links */}
      <div className={`left ${menuOpen ? "open" : ""}`}>
        <a href="#home" onClick={(e) => handleSmoothScroll(e, "home")}>Home</a>
        <a href="#about" onClick={(e) => handleSmoothScroll(e, "about")}>About</a>
        <a href="#projects" onClick={(e) => handleSmoothScroll(e, "projects")}>Projects</a>
        <Link to="/blogs" onClick={() => setMenuOpen(false)}>Blogs</Link>
        {/* <Link to="/casestudies" onClick={() => setMenuOpen(false)}>Case Studies</Link> */}
        <a href="#contact" onClick={(e) => handleSmoothScroll(e, "contact")}>Contact</a>
      </div>

      {/* Mobile Menu Backdrop */}
      <div className={`nav-overlay ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(false)}></div>
    </nav>
  );
};

export default Navbar;
