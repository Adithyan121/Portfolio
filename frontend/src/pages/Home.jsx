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

  // Mouse Parallax Transforms
  const shapeX = useTransform(mouseX, [0, window.innerWidth], [-20, 20]);
  const shapeY = useTransform(mouseY, [0, window.innerHeight], [-20, 20]);
  const iconX = useTransform(mouseX, [0, window.innerWidth], [-40, 40]);
  const iconY = useTransform(mouseY, [0, window.innerHeight], [-40, 40]);

  // Scroll Parallax Transforms
  const textY = useTransform(scrollY, [0, 500], [0, 200]);
  const yBlob1 = useTransform(scrollY, [0, 1000], [0, 400]);
  const yBlob2 = useTransform(scrollY, [0, 1000], [0, -300]);

  // 3D Shapes Parallax (Scroll + Mouse)
  const yShape1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const yShape2 = useTransform(scrollY, [0, 1000], [0, -200]);
  const yShape3 = useTransform(scrollY, [0, 1000], [0, 150]);

  // Floating Icons Parallax
  const yIcon1 = useTransform(scrollY, [0, 800], [0, -400]);
  const yIcon2 = useTransform(scrollY, [0, 800], [0, 300]);
  const yIcon3 = useTransform(scrollY, [0, 800], [0, -200]);
  const yIcon4 = useTransform(scrollY, [0, 800], [0, 250]);

  // Particles
  const particles = Array.from({ length: 20 });

  return (
    <div className="home-wrapper">
      <Navbar />
      <section id="home">
        {/* 1. Deep Background - Blobs */}
        <motion.div style={{ y: yBlob1, x: shapeX }} className="blob blob-1" />
        <motion.div style={{ y: yBlob2, x: useTransform(shapeX, v => -v) }} className="blob blob-2" />

        {/* 2. 3D CSS Shapes Layer */}
        <div className="shapes-container">
          <motion.div
            style={{ y: yShape1, x: shapeX, rotate: 45 }}
            animate={{ rotate: [45, 90, 45] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="shape shape-cube"
          />
          <motion.div
            style={{ y: yShape2, x: useTransform(shapeX, v => -v), rotate: -30 }}
            animate={{ rotate: [-30, 0, -30] }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="shape shape-triangle"
          />
          <motion.div
            style={{ y: yShape3, x: shapeX, rotate: 90 }}
            animate={{ rotate: [90, 180, 90] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="shape shape-ring"
          />
          {/* New Shape: Orb */}
          <motion.div
            style={{ y: yShape1, x: useTransform(shapeX, v => v * 1.5) }}
            className="shape shape-orb"
          />
        </div>

        {/* 3. Mid Layer - Floating Tech Icons */}
        <div className="floating-icons">
          <motion.div style={{ y: yIcon1, x: iconX }} className="icon icon-react"><FaReact /></motion.div>
          <motion.div style={{ y: yIcon2, x: useTransform(iconX, v => -v) }} className="icon icon-node"><FaNodeJs /></motion.div>
          <motion.div style={{ y: yIcon3, x: iconX }} className="icon icon-js"><SiJavascript /></motion.div>
          <motion.div style={{ y: yIcon4, x: useTransform(iconX, v => -v) }} className="icon icon-db"><SiMongodb /></motion.div>
        </div>

        {/* 4. Foreground - Main Content */}
        <motion.div
          className="content"
          style={{ y: textY }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            Hello, I am
          </motion.h3>

          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
          >
            Adithyan G
          </motion.h1>

          <motion.div
            className="typewriter-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <Typewriter
              options={{
                strings: ['MERN Stack Developer', 'Freelancer', 'UI/UX Enthusiast'],
                autoStart: true,
                loop: true,
                wrapperClassName: "typing-text",
                cursorClassName: "typing-cursor",
              }}
            />
          </motion.div>
        </motion.div>

        {/* 5. Overlay - Particles */}
        {particles.map((_, i) => (
          <motion.div
            key={i}
            className="particle"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0
            }}
            animate={{
              y: [null, Math.random() * -100],
              opacity: [0.1, 0.4, 0]
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              width: Math.random() * 8 + 4,
              height: Math.random() * 8 + 4,
            }}
          />
        ))}

        {/* Scroll Indicator */}
        <motion.div
          className="scroll-indicator"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <span>Scroll Down</span>
          <i className="fas fa-chevron-down"></i>
        </motion.div>
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
