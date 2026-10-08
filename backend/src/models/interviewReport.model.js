

const mongoose = require("mongoose");

const technicalQuestionSchema = new mongoose.Schema({
    question: String,
    intention: String,
    answer: String
}, { _id: false });

const behavioralQuestionSchema = new mongoose.Schema({
    question: String,
    intention: String,
    answer: String
}, { _id: false });

const skillGapSchema = new mongoose.Schema({
    skill: String,
    severity: {
        type: String,
        enum: ["low", "medium", "high"]
    }
}, { _id: false });

const preparationPlanSchema = new mongoose.Schema({
    day: Number,
    focus: String,
    tasks: [String]
}, { _id: false });

const interviewReportSchema = new mongoose.Schema({
    jobDescription: String,
    resume: String,
    selfDescription: String,
    matchScore: Number,

    // 🔥 IMPORTANT (yehi fix hai)
    technicalQuestions: [technicalQuestionSchema],
    behavioralQuestions: [behavioralQuestionSchema],
    skillGaps: [skillGapSchema],
    preparationPlan: [preparationPlanSchema],

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }

}, { timestamps: true });

module.exports = mongoose.model("InterviewReport", interviewReportSchema);