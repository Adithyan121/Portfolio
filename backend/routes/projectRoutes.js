const express = require("express");
const upload = require("../middleware/upload");
const { getProjects, getProjectById, createProject, deleteProject } = require("../controllers/projectController");

const router = express.Router();

router.get("/", getProjects);
router.get("/:id", getProjectById);
router.post("/", upload.single("image"), createProject);
router.delete("/:id", deleteProject);

module.exports = router;
