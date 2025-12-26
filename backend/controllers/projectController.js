const Project = require("../models/project");
const slugify = require("slugify");
const mongoose = require("mongoose");

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.set('Cache-Control', 'no-store'); // Disable caching to ensure fresh data
    res.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ error: "Failed to fetch projects" });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    let query = {};

    // Check if valid ObjectId, otherwise search by slug
    if (mongoose.Types.ObjectId.isValid(id)) {
      query = { _id: id };
    } else {
      query = { slug: id };
    }

    const project = await Project.findOne(query);

    if (!project) return res.status(404).json({ error: "Project not found" });
    res.set('Cache-Control', 'no-store'); // Disable caching to ensure fresh data
    res.json(project);
  } catch (error) {
    console.error("Error fetching project details:", error);
    res.status(500).json({ error: "Failed to fetch project details" });
  }
};

exports.createProject = async (req, res) => {
  try {
    const { name, description, problemSolved, challenges, solutions, performance, technologies, previewLink, gitLink, adminLink, appLink, adminLabel, appLabel } = req.body;
    const imageUrl = req.file ? req.file.path : "";

    // Parse the technologies field back into an array
    const technologiesArray = technologies ? JSON.parse(technologies) : [];

    // Generate slug
    const slug = slugify(name, { lower: true, strict: true });

    const newProject = new Project({
      name,
      description,
      technologies: technologiesArray,
      image: imageUrl,
      previewLink,
      gitLink,
      adminLink,
      appLink,
      adminLabel,
      appLabel,
      slug,
      problemSolved,
      challenges,
      solutions,
      performance,
    });

    await newProject.save();
    res.status(201).json({ message: "Project added successfully!", project: newProject });
  } catch (error) {
    console.error("Error adding project", error);
    res.status(500).json({ error: "Failed to add project" });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const { name, description, problemSolved, challenges, solutions, performance, technologies, previewLink, gitLink, adminLink, appLink, adminLabel, appLabel } = req.body;
    let updateData = {
      name,
      description,
      problemSolved,
      challenges,
      solutions,
      performance,
      technologies: technologies ? JSON.parse(technologies) : [],
      previewLink,
      gitLink,
      adminLink,
      appLink,
      adminLabel,
      appLabel,
    };

    if (name) {
      updateData.slug = slugify(name, { lower: true, strict: true });
    }

    if (req.file) {
      updateData.image = req.file.path;
    }

    const updatedProject = await Project.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updatedProject) return res.status(404).json({ error: "Project not found" });

    res.json({ message: "Project updated successfully!", project: updatedProject });
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).json({ error: "Failed to update project" });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    if (!deletedProject) return res.status(404).json({ error: "Project not found" });

    res.json({ message: "Project deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete project" });
  }
};
