import React, { useEffect, useState } from 'react';
import { useParams} from 'react-router-dom';
import '../css/projectdetails.css';
import api from "../assets/api"
import { IoLogoGithub } from "react-icons/io";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

const ProjectDetails = () => {
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
      <div className="project-details-container">
        <img src={project.image} alt={project.name} className="project-image"/>
        <h2 className="project-title">{project.name}</h2>
        <p className="project-description">{project.description}</p>
        
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
</div>

      </div>
    </section>
  );
};

export default ProjectDetails;
