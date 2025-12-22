const Project = require("../models/project");

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.set('Cache-Control', 'public, max-age=300'); // Cache for 5 minutes
    res.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ error: "Failed to fetch projects" });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: "Project not found" });
    res.set('Cache-Control', 'public, max-age=300'); // Cache for 5 minutes
    res.json(project);
  } catch (error) {
    console.error("Error fetching project details:", error);
    res.status(500).json({ error: "Failed to fetch project details" });
  }
};

// exports.createProject = async (req, res) => {
//   try {
//     const { name, description, technologies, previewLink, gitLink } = req.body;
//     console.log("bss",req.body);

//     // const imageUrl = req.file?.path || "";
//     const imageUrl = req.file ? req.file.path : "";


//     const newProject = new Project({
//       name,
//       description,
//       technologies: JSON.parse(technologies),
//       image: imageUrl,
//       previewLink,
//       gitLink,
//     });

//     await newProject.save();
//     res.json({ message: "Project added successfully!", project: newProject });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to add project" });
//   }
// };
exports.createProject = async (req, res) => {
  try {
    const { name, description, technologies, previewLink, gitLink, adminLink, appLink, adminLabel, appLabel } = req.body;
    const imageUrl = req.file ? req.file.path : "";

    // Parse the technologies field back into an array
    const technologiesArray = JSON.parse(technologies);

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
    });

    await newProject.save();
    res.json({ message: "Project added successfully!", project: newProject });
  } catch (error) {
    console.error("Error adding project:", error); // Log the full error
    res.status(500).json({ error: "Failed to add project" });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const { name, description, technologies, previewLink, gitLink, adminLink, appLink, adminLabel, appLabel } = req.body;
    let updateData = {
      name,
      description,
      technologies: JSON.parse(technologies),
      previewLink,
      gitLink,
      adminLink,
      appLink,
      adminLabel,
      appLabel,
    };

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
