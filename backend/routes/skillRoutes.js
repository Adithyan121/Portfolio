const express = require("express");
const { getSkills, createSkill } = require("../controllers/skillController");

const router = express.Router();

router.get("/", getSkills);
router.post("/", createSkill);

module.exports = router;
