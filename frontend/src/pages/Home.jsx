import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
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

import { useLocation } from "react-router-dom";

const Home = () => {
const { scrollY } = useScroll();
const location = useLocation();

useEffect(() => {
if (location.hash) {
const targetId = location.hash.replace("#", "");

  setTimeout(() => {
    const section = document.getElementById(targetId);

    if (section) {
      window.scrollTo({
        top: section.offsetTop - 60,
        behavior: "smooth",
      });
    }
  }, 100);
}

}, [location]);

const mouseX = useMotionValue(0);
const mouseY = useMotionValue(0);

useEffect(() => {
const handleMouseMove = (e) => {
mouseX.set(e.clientX);
mouseY.set(e.clientY);
};

window.addEventListener("mousemove", handleMouseMove);

return () => {
  window.removeEventListener("mousemove", handleMouseMove);
};

}, [mouseX, mouseY]);

// Mouse Parallax Transforms
const shapeX = useTransform(
mouseX,
[0, window.innerWidth],
[-20, 20]
);

const shapeY = useTransform(
mouseY,
[0, window.innerHeight],
[-20, 20]
);

const iconX = useTransform(
mouseX,
[0, window.innerWidth],
[-40, 40]
);

const iconY = useTransform(
mouseY,
[0, window.innerHeight],
[-40, 40]
);

// Scroll Parallax Transforms
const textY = useTransform(scrollY, [0, 500], [0, 200]);

const yBlob1 = useTransform(
scrollY,
[0, 1000],
[0, 400]
);

const yBlob2 = useTransform(
scrollY,
[0, 1000],
[0, -300]
);

// 3D Shapes Parallax
const yShape1 = useTransform(
scrollY,
[0, 1000],
[0, 200]
);

const yShape2 = useTransform(
scrollY,
[0, 1000],
[0, -200]
);

const yShape3 = useTransform(
scrollY,
[0, 1000],
[0, 150]
);

// Floating Icons Parallax
const yIcon1 = useTransform(
scrollY,
[0, 800],
[0, -400]
);

const yIcon2 = useTransform(
scrollY,
[0, 800],
[0, 300]
);

const yIcon3 = useTransform(
scrollY,
[0, 800],
[0, -200]
);

const yIcon4 = useTransform(
scrollY,
[0, 800],
[0, 250]
);

// Particles
const particles = Array.from({ length: 20 });

return (
<div className="home-wrapper">

  {/* =========================
      SEO / META DATA
  ========================== */}

  <Helmet>

    <title>
      Adithyan G | Aviation Procurement Associate
    </title>

    <meta
      name="description"
      content="Adithyan G is an Aviation Procurement Associate from Kerala, India, with a background in Aeronautical Engineering and Full-Stack Web Development. Experienced in aviation procurement, aircraft parts sourcing, supplier coordination, RFQs, quotations, and documentation."
    />

    <meta
      name="keywords"
      content="Adithyan G, Aviation Procurement Associate, aviation procurement, aviation procurement Kerala, aviation procurement India, aircraft parts procurement, aircraft parts sourcing, aviation sourcing, supplier coordination, aviation RFQ, aviation quotations, procurement documentation, aviation supply chain, aerospace procurement, Aeronautical Engineer, aviation professional India, full stack developer Kerala, React developer India, Node.js developer, MERN Stack Developer"
    />

    <meta
      name="author"
      content="Adithyan G"
    />

    <meta
      name="robots"
      content="index, follow"
    />

    <link
      rel="canonical"
      href="https://adithyang.qzz.io/"
    />

    {/* Open Graph */}

    <meta
      property="og:type"
      content="website"
    />

    <meta
      property="og:url"
      content="https://adithyang.qzz.io/"
    />

    <meta
      property="og:title"
      content="Adithyan G | Aviation Procurement Associate"
    />

    <meta
      property="og:description"
      content="Aviation Procurement Associate from Kerala, India, with a background in Aeronautical Engineering and Full-Stack Web Development. Experienced in aviation procurement, sourcing, supplier coordination, RFQs, quotations, and documentation."
    />

    <meta
      property="og:image"
      content="https://adithyang.qzz.io/nav.png"
    />

    <meta
      property="og:image:alt"
      content="Adithyan G - Aviation Procurement Associate"
    />

    <meta
      property="og:locale"
      content="en_IN"
    />

    {/* Twitter / X */}

    <meta
      name="twitter:card"
      content="summary_large_image"
    />

    <meta
      name="twitter:url"
      content="https://adithyang.qzz.io/"
    />

    <meta
      name="twitter:title"
      content="Adithyan G | Aviation Procurement Associate"
    />

    <meta
      name="twitter:description"
      content="Aviation Procurement Associate with a background in Aeronautical Engineering and Full-Stack Web Development."
    />

    <meta
      name="twitter:image"
      content="https://adithyang.qzz.io/nav.png"
    />

    <meta
      name="twitter:image:alt"
      content="Adithyan G - Aviation Procurement Associate"
    />

  </Helmet>


  {/* =========================
      NAVBAR
  ========================== */}

  <Navbar />


  {/* =========================
      HERO SECTION
  ========================== */}

  <section id="home">

    {/* Background Blobs */}

    <motion.div
      style={{
        y: yBlob1,
        x: shapeX,
      }}
      className="blob blob-1"
    />

    <motion.div
      style={{
        y: yBlob2,
        x: useTransform(shapeX, (v) => -v),
      }}
      className="blob blob-2"
    />


    {/* =========================
        3D SHAPES
    ========================== */}

    <div className="shapes-container">

      <motion.div
        style={{
          y: yShape1,
          x: shapeX,
          rotate: 45,
        }}
        animate={{
          rotate: [45, 90, 45],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
        className="shape shape-cube"
      />

      <motion.div
        style={{
          y: yShape2,
          x: useTransform(shapeX, (v) => -v),
          rotate: -30,
        }}
        animate={{
          rotate: [-30, 0, -30],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear",
        }}
        className="shape shape-triangle"
      />

      <motion.div
        style={{
          y: yShape3,
          x: shapeX,
          rotate: 90,
        }}
        animate={{
          rotate: [90, 180, 90],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
        className="shape shape-ring"
      />

      <motion.div
        style={{
          y: yShape1,
          x: useTransform(shapeX, (v) => v * 1.5),
        }}
        className="shape shape-orb"
      />

    </div>


    {/* =========================
        FLOATING TECHNOLOGY ICONS
    ========================== */}

   <div className="floating-icons">

  <motion.div
    style={{ y: yIcon1, x: iconX }}
    className="icon icon-react"
  >
    <FaReact />
  </motion.div>

  <motion.div
    style={{
      y: yIcon2,
      x: useTransform(iconX, (v) => -v)
    }}
    className="icon icon-node"
  >
    <FaNodeJs />
  </motion.div>

  <motion.div
    style={{ y: yIcon3, x: iconX }}
    className="icon icon-js"
  >
    <SiJavascript />
  </motion.div>

  <motion.div
    style={{
      y: yIcon4,
      x: useTransform(iconX, (v) => -v)
    }}
    className="icon icon-db"
  >
    <SiMongodb />
  </motion.div>

  {/* Aircraft */}
  <motion.div
    style={{
      y: yIcon4,
      x: useTransform(iconX, (v) => v * 0.8),
    }}
    className="icon icon-aircraft"
  >
    <div className="aircraft-3d">
      <div className="aircraft-body"></div>
      <div className="aircraft-wing aircraft-wing-left"></div>
      <div className="aircraft-wing aircraft-wing-right"></div>
      <div className="aircraft-tail"></div>
      <div className="aircraft-fin"></div>
      <div className="aircraft-engine aircraft-engine-left"></div>
      <div className="aircraft-engine aircraft-engine-right"></div>
    </div>
  </motion.div>

</div>

    {/* =========================
        HERO CONTENT
    ========================== */}

    <motion.div
      className="content"
      style={{
        y: textY,
      }}
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        duration: 1,
      }}
    >

      <motion.h3
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.8,
        }}
      >
        Hello, I am
      </motion.h3>


      <motion.h1
        initial={{
          opacity: 0,
          scale: 0.9,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 0.8,
        }}
      >
        Adithyan G
      </motion.h1>


      {/* Primary Professional Identity */}

      <motion.h2
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.3,
          duration: 0.8,
        }}
        style={{
          fontWeight: 600,
        }}
      >
        Aviation Procurement Associate
      </motion.h2>


      {/* Typewriter */}

      <motion.div
        className="typewriter-container"
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: 0.6,
          duration: 0.8,
        }}
      >

        <Typewriter
          options={{
            strings: [
              "Aviation Procurement Professional",
              "Aircraft Parts Sourcing",
              "Supplier Coordination",
              "RFQ & Quotation Management",
              "Procurement & Documentation",
              "Aeronautical Engineering Background",
              "Full-Stack Web Development"
            ],

            autoStart: true,
            loop: true,

            wrapperClassName: "typing-text",
            cursorClassName: "typing-cursor",
          }}
        />

      </motion.div>


      {/* Hero Description */}

      <motion.p
        className="hero-description"
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 1,
          duration: 0.8,
        }}
        style={{
          maxWidth: "700px",
          margin: "20px auto 0",
          fontSize: "1.1rem",
          lineHeight: "1.7",
          color: "#010101ff",
        }}
      >
      </motion.p>


      {/* Professional Keywords / Highlights */}

      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 1.3,
          duration: 0.8,
        }}
        style={{
          marginTop: "25px",
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >

        <span className="hero-tag">
          Aviation Procurement
        </span>

        <span className="hero-tag">
          Aircraft Parts
        </span>

        <span className="hero-tag">
          Supplier Coordination
        </span>

        <span className="hero-tag">
          RFQ & Quotations
        </span>

        <span className="hero-tag">
          Aeronautical Engineering
        </span>

      </motion.div>

    </motion.div>


    {/* =========================
        PARTICLES
    ========================== */}

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
          y: [
            null,
            Math.random() * -100,
          ],

          opacity: [
            0.1,
            0.4,
            0,
          ],
        }}

        transition={{
          duration: Math.random() * 5 + 5,
          repeat: Infinity,
          ease: "linear",
        }}

        style={{
          width: Math.random() * 8 + 4,
          height: Math.random() * 8 + 4,
        }}
      />

    ))}


    {/* =========================
        SCROLL INDICATOR
    ========================== */}

    <motion.div
      className="scroll-indicator"

      animate={{
        y: [0, 10, 0],
      }}

      transition={{
        repeat: Infinity,
        duration: 2,
      }}
    >

      <span>
        Scroll Down
      </span>

      <i className="fas fa-chevron-down"></i>

    </motion.div>

  </section>


  {/* =========================
      ABOUT
  ========================== */}

  <section id="about">
    <About />
  </section>


  {/* =========================
      PROJECTS
  ========================== */}

  <section id="projects">
    <Projects />
  </section>


  {/* =========================
      CONTACT
  ========================== */}

  <section id="contact">
    <Contact />
  </section>


  {/* =========================
      FOOTER
  ========================== */}

  <Footer />

</div>

);
};

export default Home;
