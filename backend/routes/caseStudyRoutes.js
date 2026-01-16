const express = require("express");
const { upload } = require("../middleware/upload");
const { getCaseStudies, getCaseStudyById, createCaseStudy, updateCaseStudy, deleteCaseStudy, likeCaseStudy, commentCaseStudy } = require("../controllers/caseStudyController");

const router = express.Router();

router.get("/", getCaseStudies);
router.get("/:id", getCaseStudyById);
router.post("/", upload.single("image"), createCaseStudy);
router.put("/:id", upload.single("image"), updateCaseStudy);
router.delete("/:id", deleteCaseStudy);
router.put("/:id/like", likeCaseStudy);
router.post("/:id/comment", commentCaseStudy);

module.exports = router;
