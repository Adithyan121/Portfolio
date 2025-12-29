import React, { useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValue } from "framer-motion";
import Typewriter from "typewriter-effect";
import { FaReact, FaNodeJs } from "react-icons/fa";
import { SiJavascript, SiMongodb } from "react-icons/si";

import "../css/home.css";
import Navbar from "../components/Navbar";
import About from "../components/About";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

const Home = () => {
  const { scrollY } = useScroll();
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

  // Mouse Parallax
  const shapeX = useTransform(mouseX, [0, window.innerWidth], [-20, 20]);
  const shapeY = useTransform(mouseY, [0, window.innerHeight], [-20, 20]);
  const iconX = useTransform(mouseX, [0, window.innerWidth], [-40, 40]);

  // Scroll Parallax
  const textY = useTransform(scrollY, [0, 500], [0, 200]);
  const yBlob1 = useTransform(scrollY, [0, 1000], [0, 400]);
  const yBlob2 = useTransform(scrollY, [0, 1000], [0, -300]);

  const particles = Array.from({ length: 20 });

  return (
    <div className="home-wrapper">
      <Navbar />

      <section id="home">
        {/* Background blobs */}
        <motion.div style={{ y: yBlob1, x: shapeX }} className="blob blob-1" />
        <motion.div
          style={{ y: yBlob2, x: useTransform(shapeX, (v) => -v) }}
          className="blob blob-2"
        />

        {/* Floating tech icons */}
        <div className="floating-icons">
          <motion.div style={{ x: iconX }} className="icon icon-react">
            <FaReact />
          </motion.div>
          <motion.div
            style={{ x: useTransform(iconX, (v) => -v) }}
            className="icon icon-node"
          >
            <FaNodeJs />
          </motion.div>
          <motion.div style={{ x: iconX }} className="icon icon-js">
            <SiJavascript />
          </motion.div>
          <motion.div
            style={{ x: useTransform(iconX, (v) => -v) }}
            className="icon icon-db"
          >
            <SiMongodb />
          </motion.div>
        </div>

        {/* Main content */}
        <motion.div
          className="content"
          style={{ y: textY }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h3>Hello, I am</h3>

          <h1>
  Adithyan G – MERN Stack Developer from Kerala, India
</h1>

          <div className="typewriter-container">
            <Typewriter
              options={{
                strings: [
                  "MERN Stack Developer",
                  "React Developer",
                  "Node.js Developer",
                  "Full Stack Developer",
                  "JavaScript Developer",
                ],
                autoStart: true,
                loop: true,
              }}
            />
          </div>

          <p className="hero-description" >
  Adithyan G is a <b>MERN Stack Developer based in Kerala, India</b>, specializing
  in React, Node.js, MongoDB, and Express. I build fast, scalable web applications
  and I am open to entry-level roles and freelance projects.
</p>
        </motion.div>

        {/* Particles */}
        {particles.map((_, i) => (
          <motion.div
            key={i}
            className="particle"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0,
            }}
            animate={{
              y: [null, Math.random() * -100],
              opacity: [0.1, 0.4, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
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

      {/* 🔑 Hidden SEO text (VERY IMPORTANT) */}
      <section style={{ display: "none" }}>
        <h2>Adithyan G – MERN Stack Developer in Kerala, India</h2>
        <p>
          Adithyan G is a MERN Stack Developer specializing in React, Node.js,
          MongoDB, and Express. He builds scalable full-stack web applications and
          is open to entry-level software developer roles and freelance web
          development projects.
        </p>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
