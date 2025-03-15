import React, { useState, useEffect } from "react";
import "../css/home.css";
import Navbar from "../components/Navbar";
import About from "../components/About";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

const texts = ["Adithyan G.....", "a MERN Stack Developer"];

const Home = () => {
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!deleting && charIndex < texts[index].length) {
        setDisplayText((prev) => prev + texts[index][charIndex]);
        setCharIndex(charIndex + 1);
      } else if (deleting && charIndex > 0) {
        setDisplayText((prev) => prev.slice(0, -1));
        setCharIndex(charIndex - 1);
      } else {
        setDeleting(!deleting);
        if (!deleting) {
          setTimeout(() => setIndex((prev) => (prev + 1) % texts.length), 1000);
        }
      }
    }, deleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, index]);

  return (
    <div>
      <Navbar />
      <section id="home">
        <div className="overlay">
          <div className="content">
            <h1>
              I am <span className="typing-effect">{displayText}</span>
            </h1>
            <h3>Welcome to My Portfolio</h3>
          </div>
        </div>
      </section>
      <section id="about">
        <About />
      </section>
      <section id="projects">
        <Projects />
      </section>
      <section id="contact">
        <Contact />
      </section>
      <Footer />
    </div>
  );
};

export default Home;
