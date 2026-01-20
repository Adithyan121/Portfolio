const express = require("express");
const { upload } = require("../middleware/upload");
const { getBlogs, getBlogById, createBlog, updateBlog, deleteBlog, likeBlog, commentBlog, deleteBlogComment, toggleBlogCommentVisibility } = require("../controllers/blogController");

const router = express.Router();

router.get("/", getBlogs);
router.get("/:id", getBlogById);
router.post("/", upload.single("image"), createBlog);
router.put("/:id", upload.single("image"), updateBlog);
router.delete("/:id", deleteBlog);
router.put("/:id/like", likeBlog);
router.post("/:id/comment", commentBlog);
router.delete("/:id/comment/:commentId", deleteBlogComment);
router.put("/:id/comment/:commentId/toggle", toggleBlogCommentVisibility);

module.exports = router;
