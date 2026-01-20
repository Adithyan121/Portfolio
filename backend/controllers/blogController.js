const Blog = require("../models/blog");
const slugify = require("slugify");
const mongoose = require("mongoose");

exports.getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ date: -1 });
        res.set('Cache-Control', 'no-store');
        res.json(blogs);
    } catch (error) {
        console.error("Error fetching blogs:", error);
        res.status(500).json({ error: "Failed to fetch blogs" });
    }
};

exports.getBlogById = async (req, res) => {
    try {
        const { id } = req.params;
        let query = {};
        if (mongoose.Types.ObjectId.isValid(id)) {
            query = { _id: id };
        } else {
            query = { slug: id };
        }
        const blog = await Blog.findOneAndUpdate(query, { $inc: { views: 1 } }, { new: true });
        if (!blog) return res.status(404).json({ error: "Blog not found" });
        res.set('Cache-Control', 'no-store');
        res.json(blog);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch blog details" });
    }
};

exports.createBlog = async (req, res) => {
    try {
        const { title, summary, platform, externalLink, keywords } = req.body;
        const imageUrl = req.file ? req.file.path : "";
        const slug = slugify(title, { lower: true, strict: true });

        // Parse keywords if stringified
        let keywordsArray = [];
        if (keywords) {
            if (typeof keywords === 'string') {
                try {
                    keywordsArray = JSON.parse(keywords);
                } catch (e) {
                    keywordsArray = keywords.split(',').map(k => k.trim());
                }
            } else {
                keywordsArray = keywords;
            }
        }

        const newBlog = new Blog({
            title, summary, platform, externalLink, image: imageUrl, slug, keywords: keywordsArray
        });

        await newBlog.save();
        res.status(201).json({ message: "Blog added successfully!", blog: newBlog });
    } catch (error) {
        console.error("Error adding blog:", error);
        res.status(500).json({ error: "Failed to add blog" });
    }
};

exports.updateBlog = async (req, res) => {
    try {
        const { title, summary, platform, externalLink, keywords, likes } = req.body;
        let updateData = { title, summary, platform, externalLink };
        if (likes !== undefined) updateData.likes = likes;

        if (keywords) {
            if (typeof keywords === 'string') {
                try {
                    updateData.keywords = JSON.parse(keywords);
                } catch (e) {
                    updateData.keywords = keywords.split(',').map(k => k.trim());
                }
            } else {
                updateData.keywords = keywords;
            }
        }

        if (title) updateData.slug = slugify(title, { lower: true, strict: true });
        if (req.file) updateData.image = req.file.path;

        const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!updatedBlog) return res.status(404).json({ error: "Blog not found" });
        res.json({ message: "Blog updated successfully!", blog: updatedBlog });
    } catch (error) {
        console.error("Error updating blog:", error);
        res.status(500).json({ error: "Failed to update blog" });
    }
};

exports.deleteBlog = async (req, res) => {
    try {
        const deleted = await Blog.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ error: "Blog not found" });
        res.json({ message: "Blog deleted successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete blog" });
    }
};

exports.likeBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findByIdAndUpdate(id, { $inc: { likes: 1 } }, { new: true });
        if (!blog) return res.status(404).json({ error: "Blog not found" });
        res.json(blog);
    } catch (error) {
        res.status(500).json({ error: "Failed to like blog" });
    }
};

exports.commentBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const { user, comment, image } = req.body;
        const blog = await Blog.findByIdAndUpdate(
            id,
            { $push: { comments: { user, comment, image } } },
            { new: true }
        );
        if (!blog) return res.status(404).json({ error: "Blog not found" });
        res.json(blog);
    } catch (error) {
        res.status(500).json({ error: "Failed to comment on blog" });
    }
};

exports.deleteBlogComment = async (req, res) => {
    try {
        const { id, commentId } = req.params;
        const blog = await Blog.findByIdAndUpdate(
            id,
            { $pull: { comments: { _id: commentId } } },
            { new: true }
        );
        if (!blog) return res.status(404).json({ error: "Blog or comment not found" });
        res.json(blog);
    } catch (error) {
        res.status(500).json({ error: "Failed to delete comment" });
    }
};

exports.toggleBlogCommentVisibility = async (req, res) => {
    try {
        const { id, commentId } = req.params;
        const blog = await Blog.findById(id);
        if (!blog) return res.status(404).json({ error: "Blog not found" });

        const comment = blog.comments.id(commentId);
        if (!comment) return res.status(404).json({ error: "Comment not found" });

        comment.hidden = !comment.hidden;
        await blog.save();
        res.json(blog);
    } catch (error) {
        res.status(500).json({ error: "Failed to toggle comment visibility" });
    }
};
