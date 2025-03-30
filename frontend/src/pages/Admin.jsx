import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/admin.css";
import api from '../assets/api';
const Admin = () => {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    technologies: "",
    previewLink: "",
    gitLink: "",
    image: null,
  });
  const [resume, setResume] = useState(null);
  const [resumeUrl, setResumeUrl] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [activeSection, setActiveSection] = useState("about");
  const [profileImage, setProfileImage] = useState("");
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState({ name: "", category: "", proficiency: "" });
  const navigate = useNavigate(); // Now this will work

  useEffect(() => {
    fetchProjects();
    fetchProfileImage();
    fetchSkills();
    fetchResume();
  }, []);

  // Fetch resume
  const fetchResume = async () => {
    try {
      const res = await api.get("/resume");
      setResumeUrl(res.data.resumeUrl);
    } catch (error) {
      console.error("Error fetching resume:", error);
    }
  }


  // Fetch Projects
 const fetchProjects = async () => {
  try {
    const res = await api.get("/projects");
    setProjects(res.data);
  } catch (error) {
    console.error("Error fetching projects", error);
  }
};


  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("isVerified");
    navigate("/login");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };



 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    const form = new FormData();
    form.append("name", formData.name);
    form.append("description", formData.description);
    form.append("technologies", JSON.stringify(formData.technologies.split(","))); // Stringify technologies
    form.append("previewLink", formData.previewLink);
    form.append("gitLink", formData.gitLink);
    form.append("image", formData.image);
  
    // Log the form data being sent
    // for (let [key, value] of form.entries()) {
    //   console.log(key, value);
    // }
  
    try {
      if (editMode) {
        await api.put(`/projects/${editId}`, form, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Project updated successfully!");
      } else {
        await api.post("/projects", form, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Project added successfully!");
      }
  
      fetchProjects();
      setImagePreview(null);
      setEditMode(false);
      setFormData({ name: "", description: "", technologies: "", previewLink: "", gitLink: "", image: null });
    } catch (error) {
      console.error("Error saving project", error);
    } finally {
      setLoading(false);
    }
  };
  const handleEdit = (project) => {
    setFormData({
      name: project.name,
      description: project.description,
      technologies: project.technologies.join(", "),
      previewLink: project.previewLink,
      gitLink: project.gitLink,
      image: null,
    });
    setImagePreview(project.image);
    setEditMode(true);
    setEditId(project._id);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/projects/${id}`);
      alert("Project deleted successfully!");
      fetchProjects();
    } catch (error) {
      console.error("Error deleting project", error);
    }
  };

  // Fetch Profile Image
  const fetchProfileImage = async () => {
    try {
      const res = await api.get("/profile");
      setProfileImage(res.data?.imageUrl);
    } catch (error) {
      console.error("Error fetching profile image", error);
    }
  };

  // Fetch Skills
  const fetchSkills = async () => {
    try {
      const res = await api.get("/skills");
      setSkills(res.data);
    } catch (error) {
      console.error("Error fetching skills", error);
    }
  };

  // Upload or Replace Profile Image
  const handleProfileImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await api.post("/profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setProfileImage(res.data.imageUrl);
      alert("Profile image updated!");
    } catch (error) {
      console.error("Error updating profile image", error);
    } finally {
      setLoading(false);
    }
  };

  // Delete Profile Image
  const handleDeleteProfileImage = async () => {
    try {
      await api.delete("/profile");
      setProfileImage(null);
      alert("Profile image deleted!");
    } catch (error) {
      console.error("Error deleting profile image", error);
    }
  };

  // Add New Skill
  const handleAddSkill = async () => {
    try {
      const res = await api.post("/skills", newSkill);
      setSkills([...skills, res.data.skill]);
      setNewSkill({ name: "", category: "", proficiency: "" });
      alert("Skill added successfully!");
    } catch (error) {
      console.error("Error adding skill", error);
    }
  };

  // Delete Skill
  const handleDeleteSkill = async (id) => {
    try {
      await api.delete(`/skills/${id}`);
      setSkills(skills.filter((skill) => skill._id !== id));
      alert("Skill deleted successfully!");
    } catch (error) {
      console.error("Error deleting skill", error);
    }
  };

  // Upload Resume
  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    // Check if file is PDF
    if (file.type !== 'application/pdf') {
      alert('Please upload a PDF file');
      return;
    }
  
    const formData = new FormData();
    formData.append("resume", file); // Field name must match the multer expectation
  
    try {
      const res = await api.post("/resume", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResumeUrl(res.data.resumeUrl);
      alert("Resume updated successfully!");
    } catch (error) {
      console.error("Error uploading resume:", error);
      alert("Error uploading resume. Please try again.");
    }
  };


  return (
    <div className="admin-container">
      <h2 className="adminhdd">Admin Panel</h2>
      <select onChange={(e) => setActiveSection(e.target.value)}>
        <option value="about">About Section</option>
        <option value="gallery">Gallery Section</option>
        <option value="projects">Project Section</option>
      </select>

      {activeSection === "about" && (
        <section id="about-section">
          <h2 className="abouthdd">About Section</h2>
          <p>Manage About Section Content Here</p>

          <div className="profile-section">
            <h3 className="profilehdd">Profile Image</h3>
            {profileImage && <img src={profileImage} alt="Profile" className="profile-preview" />}
            <input type="file" accept="image/*" onChange={handleProfileImageChange} />
            {profileImage && <button onClick={handleDeleteProfileImage}>Delete Profile Image</button>}
          </div>

          {/* Skills Section */}
          <div className="skills-section">
            <h3>Skills</h3>
            <ul>
              {skills.map((skill) => (
                <li key={skill._id}>
                  {skill.name} - {skill.category} ({skill.proficiency})
                  <button onClick={() => handleDeleteSkill(skill._id)}>Delete</button>
                </li>
              ))}
            </ul>

            <h4>Add New Skill</h4>
            <input
              type="text"
              placeholder="Skill Name"
              value={newSkill.name}
              onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Category"
              value={newSkill.category}
              onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
            />
            <input
              type="text"
              placeholder="Proficiency"
              value={newSkill.proficiency}
              onChange={(e) => setNewSkill({ ...newSkill, proficiency: e.target.value })}
            />
            <button onClick={handleAddSkill}>Add Skill</button>
          </div>

          <div className="resume-section">
          <h3>Update Resume</h3>
            <input type="file" accept="application/pdf" onChange={handleResumeUpload} />
            {resumeUrl && (
              <p>
                <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                  View Current Resume
                </a>
              </p>
            )}
          </div>
        </section>
      )}

      {activeSection === "gallery" && (
        <section id="gallery-section">
          <h2>Gallery Section</h2>
          <p>Manage Gallery Images Here</p>
        </section>
      )}

      {activeSection === "projects" && (
        <section id="project-section">
          <h2>Project Section</h2>
          <form onSubmit={handleSubmit} className="project-form">
            <input type="text" name="name" placeholder="Project Name" value={formData.name} required onChange={handleInputChange} />
            <textarea name="description" placeholder="Project Description" value={formData.description} required onChange={handleInputChange}></textarea>
            <input type="text" name="technologies" placeholder="Technologies (comma separated)" value={formData.technologies} required onChange={handleInputChange} />
            <input type="text" name="previewLink" placeholder="Preview Link" value={formData.previewLink} required onChange={handleInputChange} />
            <input type="text" name="gitLink" placeholder="git Link" value={formData.gitLink} required onChange={handleInputChange} />
            <input type="file" accept="image/*" onChange={handleFileChange} />
            {imagePreview && (
              <div className="image-preview">
                <img src={imagePreview} alt="Selected" />
              </div>
            )}
            <button type="submit" disabled={loading}>
              {loading ? <span className="spinner"></span> : editMode ? "Update Project" : "Add Project"}
            </button>
          </form>
          <div className="projects-list">
            {projects.map((project) => (
              <div key={project._id} className="project-item">
                <img src={project.image} alt={project.name} />
                <h3 className="prjt_name">{project.name}</h3>
                <p>{project.description}</p>
                <div className="buttons">
                  <button className="edit-btn" onClick={() => handleEdit(project)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(project._id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Admin;