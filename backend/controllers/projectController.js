const Project = require("../models/project");

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch projects" });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: "Project not found" });
    res.json(project);
  } catch (error) {
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
    
    const { name, description, technologies, previewLink, gitLink } = req.body;
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
    });

    await newProject.save();
    res.json({ message: "Project added successfully!", project: newProject });
  } catch (error) {
    console.error("Error adding project:", error); // Log the full error
    res.status(500).json({ error: "Failed to add project" });
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
