const CaseStudy = require("../models/caseStudy");
const slugify = require("slugify");
const mongoose = require("mongoose");

exports.getCaseStudies = async (req, res) => {
    try {
        const caseStudies = await CaseStudy.find().sort({ date: -1 });
        res.set('Cache-Control', 'no-store');
        res.json(caseStudies);
    } catch (error) {
        console.error("Error fetching case studies:", error);
        res.status(500).json({ error: "Failed to fetch case studies" });
    }
};

exports.getCaseStudyById = async (req, res) => {
    try {
        const { id } = req.params;
        let query = {};
        if (mongoose.Types.ObjectId.isValid(id)) {
            query = { _id: id };
        } else {
            query = { slug: id };
        }
        const caseStudy = await CaseStudy.findOneAndUpdate(query, { $inc: { views: 1 } }, { new: true });
        if (!caseStudy) return res.status(404).json({ error: "Case Study not found" });
        res.set('Cache-Control', 'no-store');
        res.json(caseStudy);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch case study details" });
    }
};

exports.createCaseStudy = async (req, res) => {
    try {
        const { title, client, overview, challenge, solution, results, technologies, link, keywords } = req.body;
        const imageUrl = req.file ? req.file.path : "";
        const slug = slugify(title, { lower: true, strict: true });

        // Helper to robustly parse JSON or split string
        const parseArray = (data) => {
            if (!data) return [];
            if (typeof data === 'string') {
                try {
                    return JSON.parse(data);
                } catch (e) {
                    return data.split(',').map(item => item.trim());
                }
            }
            return data;
        };

        const technologiesArray = parseArray(technologies);
        const keywordsArray = parseArray(keywords);

        const newCaseStudy = new CaseStudy({
            title, client, overview, challenge, solution, results,
            technologies: technologiesArray,
            keywords: keywordsArray,
            image: imageUrl,
            link,
            slug
        });

        await newCaseStudy.save();
        res.status(201).json({ message: "Case Study added successfully!", caseStudy: newCaseStudy });
    } catch (error) {
        console.error("Error adding case study:", error);
        res.status(500).json({ error: "Failed to add case study" });
    }
};

exports.updateCaseStudy = async (req, res) => {
    try {
        const { title, client, overview, challenge, solution, results, technologies, link, keywords, likes } = req.body;
        let updateData = { title, client, overview, challenge, solution, results, link };
        if (likes !== undefined) updateData.likes = likes;

        // Helper to robustly parse JSON or split string
        const parseArray = (data) => {
            if (!data) return [];
            if (typeof data === 'string') {
                try {
                    return JSON.parse(data);
                } catch (e) {
                    return data.split(',').map(item => item.trim());
                }
            }
            return data;
        };

        if (technologies) updateData.technologies = parseArray(technologies);
        if (keywords) updateData.keywords = parseArray(keywords);
        if (title) updateData.slug = slugify(title, { lower: true, strict: true });
        if (req.file) updateData.image = req.file.path;

        const updatedCaseStudy = await CaseStudy.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!updatedCaseStudy) return res.status(404).json({ error: "Case Study not found" });
        res.json({ message: "Case Study updated successfully!", caseStudy: updatedCaseStudy });
    } catch (error) {
        console.error("Error updating case study:", error);
        res.status(500).json({ error: "Failed to update case study" });
    }
};

exports.deleteCaseStudy = async (req, res) => {
    try {
        const deleted = await CaseStudy.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ error: "Case Study not found" });
        res.json({ message: "Case Study deleted successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete case study" });
    }
};

exports.likeCaseStudy = async (req, res) => {
    try {
        const { id } = req.params;
        const caseStudy = await CaseStudy.findByIdAndUpdate(id, { $inc: { likes: 1 } }, { new: true });
        if (!caseStudy) return res.status(404).json({ error: "Case Study not found" });
        res.json(caseStudy);
    } catch (error) {
        res.status(500).json({ error: "Failed to like case study" });
    }
};

exports.commentCaseStudy = async (req, res) => {
    try {
        const { id } = req.params;
        const { user, comment, image } = req.body;
        const caseStudy = await CaseStudy.findByIdAndUpdate(
            id,
            { $push: { comments: { user, comment, image } } },
            { new: true }
        );
        if (!caseStudy) return res.status(404).json({ error: "Case Study not found" });
        res.json(caseStudy);
    } catch (error) {
        res.status(500).json({ error: "Failed to comment on case study" });
    }
};

exports.deleteCaseStudyComment = async (req, res) => {
    try {
        const { id, commentId } = req.params;
        const caseStudy = await CaseStudy.findByIdAndUpdate(
            id,
            { $pull: { comments: { _id: commentId } } },
            { new: true }
        );
        if (!caseStudy) return res.status(404).json({ error: "Case Study or comment not found" });
        res.json(caseStudy);
    } catch (error) {
        res.status(500).json({ error: "Failed to delete comment" });
    }
};

exports.toggleCaseStudyCommentVisibility = async (req, res) => {
    try {
        const { id, commentId } = req.params;
        const caseStudy = await CaseStudy.findById(id);
        if (!caseStudy) return res.status(404).json({ error: "Case Study not found" });

        const comment = caseStudy.comments.id(commentId);
        if (!comment) return res.status(404).json({ error: "Comment not found" });

        comment.hidden = !comment.hidden;
        await caseStudy.save();
        res.json(caseStudy);
    } catch (error) {
        res.status(500).json({ error: "Failed to toggle comment visibility" });
    }
};
