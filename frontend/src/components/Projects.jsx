import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

  return (
    <div className="projects-container">
      <h2>My Projects</h2>
      <div className="projects-grid">
        {projects.map((project) => (
          <Link to={`/project/${project._id}`} key={project._id} className="project-card">
            <img src={project.image} alt={project.name} />
            <h3>{project.name}</h3>
            <p>{project.summary}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Projects;