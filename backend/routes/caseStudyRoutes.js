const express = require("express");
const { upload } = require("../middleware/upload");
const { getCaseStudies, getCaseStudyById, createCaseStudy, updateCaseStudy, deleteCaseStudy, likeCaseStudy, commentCaseStudy, deleteCaseStudyComment, toggleCaseStudyCommentVisibility } = require("../controllers/caseStudyController");

const router = express.Router();

router.get("/", getCaseStudies);
router.get("/:id", getCaseStudyById);
router.post("/", upload.single("image"), createCaseStudy);
router.put("/:id", upload.single("image"), updateCaseStudy);
router.delete("/:id", deleteCaseStudy);
router.put("/:id/like", likeCaseStudy);
router.post("/:id/comment", commentCaseStudy);
router.delete("/:id/comment/:commentId", deleteCaseStudyComment);
router.put("/:id/comment/:commentId/toggle", toggleCaseStudyCommentVisibility);

module.exports = router;
