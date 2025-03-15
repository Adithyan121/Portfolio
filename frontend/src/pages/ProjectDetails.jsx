import React, { useEffect, useState } from 'react';
import { useParams} from 'react-router-dom';
import '../css/projectdetails.css';
import api from "../assets/api"

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  console.log("uff",project);
  

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
        <a href={project.previewLink} target="_blank" rel="noopener noreferrer" className="preview-btn">
          Preview Project
        </a>
        <br/>
        <a href={project.gitLink} target="_blank" rel="noopener noreferrer" className="preview-btn">
          git
        </a>
      </div>
    </section>
  );
};

export default ProjectDetails;
