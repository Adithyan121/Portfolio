const Skill = require("../models/skill");

exports.getSkills = async (req, res) => {
  try {
    const skills = await Skill.find();
    res.json(skills);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch skills" });
  }
};

exports.createSkill = async (req, res) => {
  try {
    const { name, category, proficiency } = req.body;
    const newSkill = new Skill({ name, category, proficiency });
    await newSkill.save();
    res.json({ message: "Skill added successfully", skill: newSkill });
  } catch (error) {
    res.status(500).json({ error: "Failed to add skill" });
  }
};
