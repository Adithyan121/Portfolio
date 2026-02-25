import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../assets/api";
import "../css/project.css";

const AllProjects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await api.get("/projects");
                setProjects(response.data);
            } catch (error) {
                console.error("Error fetching projects:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    // Helper to optimize Cloudinary URLs
    const getOptimizedImage = (url) => {
        if (!url || !url.includes("cloudinary.com")) return url;
        return url.replace("/upload/", "/upload/w_500,q_auto,f_auto/");
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <div className="page-wrapper">
            <Helmet>
                <title>All Projects | Adithyan G</title>
                <meta name="description" content="View all my web development projects including MERN stack applications, UI designs, and more." />
            </Helmet>
            <Navbar />

            <div className="projects-container" style={{ paddingTop: "120px", minHeight: "80vh" }}>
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{ textAlign: "center", marginBottom: "40px" }}
                >
                    All Projects
                </motion.h2>

                {loading ? (
                    <div className="loading" style={{ textAlign: "center", padding: "50px" }}>Loading...</div>
                ) : (
                    <motion.div
                        className="projects-grid"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {projects.length > 0 ? (
                            projects.map((project) => (
                                <motion.div variants={cardVariants} key={project._id}>
                                    <Link to={`/project/${project.slug || project._id}`} className="project-card">
                                        <img
                                            src={getOptimizedImage(project.image)}
                                            alt={`${project.name} - MERN Stack Project`}
                                            loading="lazy"
                                        />
                                        <h3>{project.name}</h3>
                                        <p>{project.summary}</p>
                                    </Link>
                                </motion.div>
                            ))
                        ) : (
                            <div style={{ textAlign: "center", width: "100%", gridColumn: "1 / -1" }}>
                                <p>No projects found.</p>
                            </div>
                        )}
                    </motion.div>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default AllProjects;
