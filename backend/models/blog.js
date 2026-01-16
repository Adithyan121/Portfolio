const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    summary: { type: String, required: true },
    platform: { type: String, required: true }, // e.g., 'Medium', 'Dev.to'
    externalLink: { type: String, required: true },
    image: String,
    date: { type: Date, default: Date.now },
    slug: { type: String, unique: true },
    keywords: [String],
    likes: { type: Number, default: 0 },
    comments: [{
        user: String,
        comment: String,
        date: { type: Date, default: Date.now }
    }]
});

module.exports = mongoose.model("Blog", blogSchema);
