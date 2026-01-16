import React, { useEffect, useState } from 'react';
import { Helmet } from "react-helmet-async";
import { useParams } from 'react-router-dom';
import '../css/projectdetails.css';
import api from "../assets/api"
import { IoLogoGithub } from "react-icons/io";
import { FaArrowUpRightFromSquare, FaArrowLeft } from "react-icons/fa6"; // Changed import to fa6 for consistency or check if FaArrowLeft is in fa6. usually it is in fa or fa6.
import { useNavigate } from 'react-router-dom';

const ProjectDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");



  useEffect(() => {
    api.get(`/projects/${id}`)
      .then((response) => {
        setProject(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching project details:", error);
        setError("Project not found.");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <h2 className="loading">Loading...</h2>;
  if (error) return <h2 className="error-message">{error}</h2>;

  return (
    <section id="project-details">
      <Helmet>
        <title>{project.name} Case Study - High Performance MERN App | Adithyan G</title>
        <meta name="description" content={`Case study of ${project.name}: A scalable web application built with ${project.technologies.slice(0, 3).join(', ')}. Solves real-world problems through performance optimization and clean architecture.`} />
        <meta property="og:title" content={`${project.name} - Full Stack Project Case Study`} />
        <meta property="og:description" content={`Discover how I built ${project.name}, a high-performance web app solving complex user problems.`} />
        <meta property="og:image" content={project.image} />
        <meta property="twitter:card" content="summary_large_image" />
        <link rel="canonical" href={`https://adithyan-phi.vercel.app/project/${project.slug || project._id}`} />
      </Helmet>
      <div className="project-details-container">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <FaArrowLeft /> Back
        </button>
        <img src={project.image} alt={project.name} className="project-image" />
        <h1 className="project-title">{project.name}</h1>
        <p className="project-description">{project.description}</p>

        {project.problemSolved && (
          <div className="problem-solved-section" style={{ background: '#1a1a1a', padding: '20px', borderRadius: '10px', marginTop: '20px', borderLeft: '4px solid #646cff' }}>
            <h3 style={{ color: '#fff', marginBottom: '10px' }}>What Problem Does It Solve?</h3>
            <p style={{ color: '#ccc', lineHeight: '1.6' }}>{project.problemSolved}</p>
          </div>
        )}

        {/* Technical Deep Dive Section */}
        {(project.challenges || project.solutions || project.performance) && (
          <div className="technical-details" style={{ marginTop: '30px' }}>

            {project.challenges && (
              <div style={{ marginBottom: '20px' }}>
                <h3 style={{ color: '#ff6b6b' }}>Challenges Faced</h3>
                <p style={{ color: '#000000ff', lineHeight: '1.6' }}>{project.challenges}</p>
              </div>
            )}

            {project.solutions && (
              <div style={{ marginBottom: '20px' }}>
                <h3 style={{ color: '#4ecdc4' }}>Solutions Implemented</h3>
                <p style={{ color: '#1a1919ff', lineHeight: '1.6' }}>{project.solutions}</p>
              </div>
            )}

            {project.performance && (
              <div style={{ marginBottom: '20px' }}>
                <h3 style={{ color: '#ffe66d' }}>Performance Optimizations</h3>
                <p style={{ color: '#232121ff', lineHeight: '1.6' }}>{project.performance}</p>
              </div>
            )}

          </div>
        )}

        <h3 className="tech-heading">Technologies Used</h3>
        <ul className="tech-list">
          {project.technologies.map((tech, index) => (
            <li key={index} className="tech-item">{tech}</li>
          ))}
        </ul>

        {/* Button to Open Preview Page */}


        <div className="btn-div">
          <a href={project.previewLink} target="_blank" rel="noopener noreferrer">
            <button className="btn">
              Live Website
              <FaArrowUpRightFromSquare className="git-icon" />
            </button>
          </a>

          <a href={project.gitLink} target="_blank" rel="noopener noreferrer">
            <button className="btn">
              <IoLogoGithub className="git-icon" />
              Source Code
            </button>
          </a>

          {project.adminLink && (
            <a href={project.adminLink} target="_blank" rel="noopener noreferrer">
              <button className="btn">
                {project.adminLabel || "Admin Panel"}
                <FaArrowUpRightFromSquare className="git-icon" />
              </button>
            </a>
          )}

          {project.appLink && (
            <a href={project.appLink} target="_blank" rel="noopener noreferrer">
              <button className="btn">
                {project.appLabel || "Mobile App"}
                <FaArrowUpRightFromSquare className="git-icon" />
              </button>
            </a>
          )}
        </div>

      </div>
    </section>
  );
};

export default ProjectDetails;
