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
    comments: [{
        user: String,
        comment: String,
        date: { type: Date, default: Date.now }
    }]
});

module.exports = mongoose.model("CaseStudy", caseStudySchema);
