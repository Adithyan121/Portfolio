import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useTransform } from "framer-motion";
import "../css/project.css";
import api from "../assets/api"; // Import the Axios instance

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get("/projects"); // Use api instance
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  // Mouse Parallax
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

  const shapeP1X = useTransform(mouseX, [0, window.innerWidth], [-30, 30]);
  const shapeP2X = useTransform(mouseX, [0, window.innerWidth], [30, -30]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  // Helper to optimize Cloudinary URLs
  const getOptimizedImage = (url) => {
    if (!url || !url.includes("cloudinary.com")) return url;
    return url.replace("/upload/", "/upload/w_500,q_auto,f_auto/");
  };

  return (
    <div className="projects-container">
      <motion.div style={{ x: shapeP1X, rotate: 45 }} className="shape-project-1" />
      <motion.div style={{ x: shapeP2X, rotate: -15 }} className="shape-project-2" />

      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false }}
      >
        My Projects
      </motion.h2>

      <motion.div
        className="projects-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1 }}
      >
        {projects.length > 0 ? (
          projects.map((project, index) => (
            <motion.div variants={cardVariants} key={project._id}>
              <Link to={`/project/${project.slug || project._id}`} className="project-card">
                <img
                  src={getOptimizedImage(project.image)}
                  alt={`${project.name} - MERN Stack Project`}
                  loading="lazy"
                  decoding="async"
                />
                <h3>{project.name}</h3>
                <p>{project.summary}</p>
              </Link>
            </motion.div>
          ))
        ) : (
          <div className="project-card skeleton">
            <div className="skeleton-img"></div>
            <h3 className="skeleton-text"></h3>
            <p className="skeleton-text"></p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Projects;
