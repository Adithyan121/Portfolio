const mongoose = require("mongoose");

const caseStudySchema = new mongoose.Schema({
    title: { type: String, required: true },
    overview: { type: String, required: true }, // Short Description
    challenge: String, // Problem Statement
    myRole: String, // My Role / Contributions
    solution: String,
    results: String,
    image: String, // Media
    date: { type: Date, default: Date.now },
    slug: { type: String, unique: true },
    likes: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    comments: [{
        user: String,
        comment: String,
        image: String,
        date: { type: Date, default: Date.now },
        hidden: { type: Boolean, default: false }
    }]
});

module.exports = mongoose.model("CaseStudy", caseStudySchema);
