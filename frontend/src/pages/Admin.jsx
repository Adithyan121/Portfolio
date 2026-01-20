import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/admin.css";
import api from '../assets/api';
const Admin = () => {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    problemSolved: "", // SEO Field
    challenges: "",  // SEO Field
    solutions: "",   // SEO Field
    performance: "", // SEO Field
    technologies: "",
    previewLink: "",
    gitLink: "",
    adminLink: "",
    adminLabel: "", // New Field
    appLink: "",
    appLabel: "",   // New Field
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
  const navigate = useNavigate();

  // Blogs State
  const [blogs, setBlogs] = useState([]);
  const [blogFormData, setBlogFormData] = useState({
    title: "", summary: "", platform: "", externalLink: "", keywords: "", likes: 0, image: null
  });
  const [blogEditMode, setBlogEditMode] = useState(false);
  const [blogEditId, setBlogEditId] = useState(null);
  const [blogImagePreview, setBlogImagePreview] = useState(null);





  // Case Studies State
  const [caseStudies, setCaseStudies] = useState([]);
  const [csFormData, setCsFormData] = useState({
    title: "", overview: "", challenge: "", myRole: "", solution: "", results: "", likes: 0, image: null
  });
  const [csEditMode, setCsEditMode] = useState(false);
  const [csEditId, setCsEditId] = useState(null);
  const [csImagePreview, setCsImagePreview] = useState(null);

  const [viewComments, setViewComments] = useState(null);

  const handleDeleteComment = async (parentId, commentId, type) => {
    if (!window.confirm("Are you sure you want to delete this comment?")) return;
    try {
      await api.delete(`/${type}/${parentId}/comment/${commentId}`);
      alert("Comment deleted");
      if (type === 'blogs') fetchBlogs();
      else fetchCaseStudies();
    } catch (error) {
      console.error("Error deleting comment", error);
      alert("Failed to delete comment");
    }
  };

  const handleToggleCommentVisibility = async (parentId, commentId, type) => {
    try {
      await api.put(`/${type}/${parentId}/comment/${commentId}/toggle`);
      if (type === 'blogs') fetchBlogs();
      else fetchCaseStudies();
    } catch (error) {
      console.error("Error toggling comment", error);
      alert("Failed to toggle visibility");
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchProfileImage();
    fetchSkills();
    fetchResume();
    fetchBlogs();
    fetchCaseStudies();
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
    form.append("problemSolved", formData.problemSolved);
    form.append("challenges", formData.challenges);
    form.append("solutions", formData.solutions);
    form.append("performance", formData.performance);
    form.append("technologies", JSON.stringify(formData.technologies.split(","))); // Stringify technologies
    form.append("previewLink", formData.previewLink);
    form.append("gitLink", formData.gitLink);
    form.append("adminLink", formData.adminLink);
    form.append("adminLabel", formData.adminLabel); // Append label
    form.append("appLink", formData.appLink);
    form.append("appLabel", formData.appLabel);     // Append label
    form.append("image", formData.image);

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
      setFormData({
        name: "",
        description: "",
        technologies: "",
        previewLink: "",
        gitLink: "",
        adminLink: "",
        adminLabel: "",
        appLink: "",
        appLabel: "",
        image: null
      });
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
      problemSolved: project.problemSolved || "",
      challenges: project.challenges || "",
      solutions: project.solutions || "",
      performance: project.performance || "",
      technologies: project.technologies.join(", "),
      previewLink: project.previewLink,
      gitLink: project.gitLink,
      adminLink: project.adminLink || "",
      adminLabel: project.adminLabel || "", // Handle optional fields
      appLink: project.appLink || "",
      appLabel: project.appLabel || "",     // Handle optional fields
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


  // Blog Functions
  const fetchBlogs = async () => {
    try { const res = await api.get("/blogs"); setBlogs(res.data); } catch (err) { console.error(err); }
  };
  const handleBlogInputChange = (e) => {
    const { name, value } = e.target;
    setBlogFormData({ ...blogFormData, [name]: value });
  };
  const handleBlogFileChange = (e) => {
    const file = e.target.files[0];
    setBlogFormData({ ...blogFormData, image: file });
    if (file) { const reader = new FileReader(); reader.onloadend = () => setBlogImagePreview(reader.result); reader.readAsDataURL(file); }
  };
  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = new FormData();
    Object.keys(blogFormData).forEach(key => {
      if (blogFormData[key]) form.append(key, blogFormData[key]);
    });

    try {
      if (blogEditMode) {
        await api.put(`/blogs/${blogEditId}`, form, { headers: { "Content-Type": "multipart/form-data" } });
        alert("Blog updated!");
      } else {
        await api.post("/blogs", form, { headers: { "Content-Type": "multipart/form-data" } });
        alert("Blog added!");
      }
      fetchBlogs();
      setBlogEditMode(false);
      setBlogImagePreview(null);
      setBlogFormData({ title: "", summary: "", platform: "", externalLink: "", keywords: "", image: null });
    } catch (err) { console.error(err); alert("Error saving blog"); } finally { setLoading(false); }
  };
  const handleBlogEdit = (blog) => {
    setBlogFormData({ ...blog, image: null, keywords: JSON.stringify(blog.keywords || []) });
    setBlogImagePreview(blog.image);
    setBlogEditMode(true);
    setBlogEditId(blog._id);
  };
  const handleBlogDelete = async (id) => {
    if (!window.confirm("Delete this blog?")) return;
    try { await api.delete(`/blogs/${id}`); fetchBlogs(); } catch (err) { console.error(err); }
  };


  // Case Study Functions
  const fetchCaseStudies = async () => {
    try { const res = await api.get("/casestudies"); setCaseStudies(res.data); } catch (err) { console.error(err); }
  };
  const handleCsInputChange = (e) => {
    const { name, value } = e.target;
    setCsFormData({ ...csFormData, [name]: value });
  };
  const handleCsFileChange = (e) => {
    const file = e.target.files[0];
    setCsFormData({ ...csFormData, image: file });
    if (file) { const reader = new FileReader(); reader.onloadend = () => setCsImagePreview(reader.result); reader.readAsDataURL(file); }
  };
  const handleCsSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = new FormData();
    Object.keys(csFormData).forEach(key => {
      if (csFormData[key]) form.append(key, csFormData[key]);
    });

    try {
      if (csEditMode) {
        await api.put(`/casestudies/${csEditId}`, form, { headers: { "Content-Type": "multipart/form-data" } });
        alert("Case Study updated!");
      } else {
        await api.post("/casestudies", form, { headers: { "Content-Type": "multipart/form-data" } });
        alert("Case Study added!");
      }
      fetchCaseStudies();
      setCsEditMode(false);
      setCsImagePreview(null);
      setCsFormData({ title: "", overview: "", challenge: "", myRole: "", solution: "", results: "", image: null });
    } catch (err) { console.error(err); alert("Error saving case study"); } finally { setLoading(false); }
  };
  const handleCsEdit = (cs) => {
    setCsFormData({
      ...cs,
      image: null,
      myRole: cs.myRole || ""
    });
    setCsImagePreview(cs.image);
    setCsEditMode(true);
    setCsEditId(cs._id);
  };
  const handleCsDelete = async (id) => {
    if (!window.confirm("Delete this case study?")) return;
    try { await api.delete(`/casestudies/${id}`); fetchCaseStudies(); } catch (err) { console.error(err); }
  };

  return (
    <div className="admin-container">
      <h1 className="adminhdd">Admin Panel</h1>
      <select onChange={(e) => setActiveSection(e.target.value)}>
        <option value="about">About Section</option>
        <option value="projects">Project Section</option>
        <option value="blogs">Blogs Section</option>
        <option value="casestudies">Case Studies Section</option>
      </select>

      {activeSection === "about" && (
        <section id="about-section">
          <h2 className="hd">About Section</h2>
          <p>Manage About Section Content Here</p>

          <div className="profile-section">
            <h4 className="profilehdd">Profile Image</h4>

            {profileImage && (
              <img src={profileImage} alt="Profile" className="profile-preview" />
            )}

            {/* Hidden file input */}
            <input
              type="file"
              id="profile-upload"
              className="file_input"
              accept="image/*"
              onChange={handleProfileImageChange}
            />

            {/* Custom Upload Button */}
            <label htmlFor="profile-upload" className="custom-file-label">
              <i className="fas fa-upload"></i> Upload Profile Pic
            </label>

            {profileImage && (
              <button onClick={handleDeleteProfileImage}>Delete Profile Image</button>
            )}
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

            <h4 className="profilehdd">Add New Skill</h4>
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

          {/* <div className="resume-section">
          <h3 className="profilehdd">Update Resume</h3>
            <input className="file_input" type="file" accept="application/pdf" onChange={handleResumeUpload} />
            {resumeUrl && (
              <p>
                <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                  View Current Resume
                </a>
              </p>
            )}
          </div> */}
          <div className="resume-section">
            <h4 className="profilehdd">Update Resume</h4>
            <div className="file-input-container">
              <label htmlFor="file-upload" className="file-label">
                <i className="fas fa-upload"></i> Upload Resume
              </label>
              <input
                id="file-upload"
                className="file_input"
                type="file"
                accept="application/pdf"
                onChange={handleResumeUpload}
              />
              {resumeUrl && (
                <p>
                  <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="view-resume-link">
                    View Current Resume
                  </a>
                </p>
              )}
            </div>
          </div>

        </section>
      )}



      {activeSection === "projects" && (
        <section id="project-section">
          <h2 className="hd">Project Section</h2>
          <form onSubmit={handleSubmit} className="project-form">
            <input
              type="text"
              name="name"
              placeholder="Project Name"
              value={formData.name}
              required
              onChange={handleInputChange}
            />
            <textarea
              name="description"
              placeholder="Project Description"
              value={formData.description}
              required
              onChange={handleInputChange}
            ></textarea>
            <textarea
              name="problemSolved"
              placeholder="What Problem Did It Solve? (SEO Gold)"
              value={formData.problemSolved}
              onChange={handleInputChange}
            ></textarea>
            <textarea
              name="challenges"
              placeholder="Challenges Faced (SEO Depth)"
              value={formData.challenges}
              onChange={handleInputChange}
            ></textarea>
            <textarea
              name="solutions"
              placeholder="Solutions Implemented (Technical Depth)"
              value={formData.solutions}
              onChange={handleInputChange}
            ></textarea>
            <textarea
              name="performance"
              placeholder="Performance Optimizations (High Value)"
              value={formData.performance}
              onChange={handleInputChange}
            ></textarea>
            <input
              type="text"
              name="technologies"
              placeholder="Technologies (comma separated)"
              value={formData.technologies}
              required
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="previewLink"
              placeholder="Preview Link"
              value={formData.previewLink}
              required
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="gitLink"
              placeholder="GitHub Link"
              value={formData.gitLink}
              required
              onChange={handleInputChange}
            />
            <div className="link-group" style={{ display: 'flex', gap: '10px' }}>
              <input
                type="text"
                name="adminLink"
                placeholder="Optional Link 1 (e.g. Admin Panel)"
                value={formData.adminLink}
                onChange={handleInputChange}
                style={{ flex: 1 }}
              />
              <input
                type="text"
                name="adminLabel"
                placeholder="Label (Default: Admin Panel)"
                value={formData.adminLabel}
                onChange={handleInputChange}
                style={{ flex: 1 }}
              />
            </div>

            <div className="link-group" style={{ display: 'flex', gap: '10px' }}>
              <input
                type="text"
                name="appLink"
                placeholder="Optional Link 2 (e.g. Mobile App)"
                value={formData.appLink}
                onChange={handleInputChange}
                style={{ flex: 1 }}
              />
              <input
                type="text"
                name="appLabel"
                placeholder="Label (Default: Mobile App)"
                value={formData.appLabel}
                onChange={handleInputChange}
                style={{ flex: 1 }}
              />
            </div>

            <div className="file-upload-container">
              <input
                type="file"
                accept="image/*"
                id="fileInput"
                onChange={handleFileChange}
                hidden
              />
              <label htmlFor="fileInput" className="custom-file-button">
                Choose Image
              </label>
              <span>{formData.image ? formData.image.name : "No file chosen"}</span>
            </div>

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

      {activeSection === "blogs" && (
        <section id="blogs-section">
          <h2 className="hd">Blogs Section</h2>
          <form onSubmit={handleBlogSubmit} className="project-form">
            <input type="text" name="title" placeholder="Blog Title" value={blogFormData.title} onChange={handleBlogInputChange} required />
            <textarea name="summary" placeholder="Sort Summary (SEO)" value={blogFormData.summary} onChange={handleBlogInputChange} required />
            <input type="text" name="platform" placeholder="Platform (Medium, Dev.to)" value={blogFormData.platform} onChange={handleBlogInputChange} required />
            <input type="text" name="externalLink" placeholder="Link to Article" value={blogFormData.externalLink} onChange={handleBlogInputChange} required />
            <input type="text" name="keywords" placeholder="Keywords (SEO) [JSON Array]" value={blogFormData.keywords} onChange={handleBlogInputChange} />
            <input type="number" name="likes" placeholder="Likes Count" value={blogFormData.likes} onChange={handleBlogInputChange} style={{ marginTop: '10px' }} />

            <div className="file-upload-container">
              <input type="file" accept="image/*" onChange={handleBlogFileChange} hidden id="blogFile" />
              <label htmlFor="blogFile" className="custom-file-button">Choose Image</label>
            </div>
            {blogImagePreview && <img src={blogImagePreview} alt="Preview" className="image-preview" />}

            <button type="submit" disabled={loading}>{loading ? "Saving..." : (blogEditMode ? "Update Blog" : "Add Blog")}</button>
          </form>
          <div className="projects-list">
            {blogs.map(b => (
              <div key={b._id} className="project-item">
                <img src={b.image} alt={b.title} />
                <h3>{b.title}</h3>
                <p>Views: {b.views || 0}</p>
                <p>{b.platform}</p>
                <div className="buttons">
                  <button className="edit-btn" onClick={() => handleBlogEdit(b)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleBlogDelete(b._id)}>Delete</button>
                  <button className="view-btn" onClick={() => setViewComments(viewComments === b._id ? null : b._id)}>
                    {viewComments === b._id ? "Close Comments" : `Comments (${b.comments?.length || 0})`}
                  </button>
                </div>

                {viewComments === b._id && (
                  <div className="comments-manager" style={{ marginTop: '15px', padding: '10px', background: '#f9f9f9', borderRadius: '5px' }}>
                    <h4>Manage Comments</h4>
                    {b.comments && b.comments.length > 0 ? (
                      <ul style={{ listStyle: 'none', padding: 0 }}>
                        {b.comments.map(c => (
                          <li key={c._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px', borderBottom: '1px solid #eee', background: c.hidden ? '#ffecec' : '#fff' }}>
                            <div>
                              <strong>{c.user}</strong>: {c.comment} <br />
                              <small style={{ color: '#888' }}>{new Date(c.date).toLocaleDateString()} - {c.hidden ? "Hidden" : "Visible"}</small>
                            </div>
                            <div style={{ display: 'flex', gap: '5px' }}>
                              <button onClick={() => handleToggleCommentVisibility(b._id, c._id, 'blogs')} style={{ fontSize: '0.8rem', padding: '5px' }}>
                                {c.hidden ? "Unhide" : "Hide"}
                              </button>
                              <button onClick={() => handleDeleteComment(b._id, c._id, 'blogs')} style={{ fontSize: '0.8rem', padding: '5px', background: 'red', color: 'white' }}>
                                Delete
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>No comments yet.</p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {activeSection === "casestudies" && (
        <section id="cs-section">
          <h2 className="hd">Case Studies Section</h2>
          <form onSubmit={handleCsSubmit} className="project-form">
            <input type="text" name="title" placeholder="Project Title" value={csFormData.title} onChange={handleCsInputChange} required />
            <textarea name="overview" placeholder="Short Description" value={csFormData.overview} onChange={handleCsInputChange} required />
            <textarea name="challenge" placeholder="Problem Statement" value={csFormData.challenge} onChange={handleCsInputChange} />
            <textarea name="myRole" placeholder="My Role / Contributions" value={csFormData.myRole} onChange={handleCsInputChange} />
            <textarea name="solution" placeholder="The Solution" value={csFormData.solution} onChange={handleCsInputChange} />
            <textarea name="results" placeholder="Results" value={csFormData.results} onChange={handleCsInputChange} />
            <input type="number" name="likes" placeholder="Likes Count" value={csFormData.likes} onChange={handleCsInputChange} style={{ marginTop: '10px' }} />

            <div className="file-upload-container">
              <input type="file" accept="image/*" onChange={handleCsFileChange} hidden id="csFile" />
              <label htmlFor="csFile" className="custom-file-button">Choose Media (Image)</label>
            </div>
            {csImagePreview && <img src={csImagePreview} alt="Preview" className="image-preview" />}

            <button type="submit" disabled={loading}>{loading ? "Saving..." : (csEditMode ? "Update Case Study" : "Add Case Study")}</button>
          </form>
          <div className="projects-list">
            {caseStudies.map(c => (
              <div key={c._id} className="project-item">
                <img src={c.image} alt={c.title} />
                <h3>{c.title}</h3>
                <p>Views: {c.views || 0}</p>
                <div className="buttons">
                  <button className="edit-btn" onClick={() => handleCsEdit(c)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleCsDelete(c._id)}>Delete</button>
                  <button className="view-btn" onClick={() => setViewComments(viewComments === c._id ? null : c._id)}>
                    {viewComments === c._id ? "Close Comments" : `Comments (${c.comments?.length || 0})`}
                  </button>
                </div>

                {viewComments === c._id && (
                  <div className="comments-manager" style={{ marginTop: '15px', padding: '10px', background: '#f9f9f9', borderRadius: '5px' }}>
                    <h4>Manage Comments</h4>
                    {c.comments && c.comments.length > 0 ? (
                      <ul style={{ listStyle: 'none', padding: 0 }}>
                        {c.comments.map(comment => (
                          <li key={comment._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px', borderBottom: '1px solid #eee', background: comment.hidden ? '#ffecec' : '#fff' }}>
                            <div>
                              <strong>{comment.user}</strong>: {comment.comment} <br />
                              <small style={{ color: '#888' }}>{new Date(comment.date).toLocaleDateString()} - {comment.hidden ? "Hidden" : "Visible"}</small>
                            </div>
                            <div style={{ display: 'flex', gap: '5px' }}>
                              <button onClick={() => handleToggleCommentVisibility(c._id, comment._id, 'casestudies')} style={{ fontSize: '0.8rem', padding: '5px' }}>
                                {comment.hidden ? "Unhide" : "Hide"}
                              </button>
                              <button onClick={() => handleDeleteComment(c._id, comment._id, 'casestudies')} style={{ fontSize: '0.8rem', padding: '5px', background: 'red', color: 'white' }}>
                                Delete
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>No comments yet.</p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
      <button className="logout" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Admin;