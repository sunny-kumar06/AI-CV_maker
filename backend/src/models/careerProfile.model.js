const mongoose = require("mongoose");

const prioritySkillSchema = new mongoose.Schema({
  skill: { type: String, required: true },
  priority: { type: String, enum: ["HIGH", "MEDIUM", "LOW"], default: "MEDIUM" },
  reason: String,
  difficulty: String,
  suggestedProject: String,
  learningPath: String
}, { _id: false });

const recommendedRoleSchema = new mongoose.Schema({
  roleTitle: { type: String, required: true },
  matchPercentage: { type: Number, default: 0 },
  matchingSkills: [String],
  missingSkills: [String],
  whySuited: String,
  requiredToReady: [String]
}, { _id: false });

const weeklyPlanSchema = new mongoose.Schema({
  week: Number,
  title: String,
  topics: [String],
  projectGoal: String
}, { _id: false });

const suggestedProjectSchema = new mongoose.Schema({
  title: String,
  description: String,
  techStack: [String]
}, { _id: false });

const resumeSuggestionSchema = new mongoose.Schema({
  category: String,
  currentText: String,
  suggestedImprovement: String,
  impact: String
}, { _id: false });

const careerProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true
  },
  targetRole: { type: String, default: "Software Engineer" },
  resumeText: { type: String, default: "" },
  jobDescription: { type: String, default: "" },
  skills: {
    matched: { type: [String], default: [] },
    missing: { type: [String], default: [] },
    partial: { type: [String], default: [] },
    recommended: { type: [String], default: [] }
  },
  prioritySkills: [prioritySkillSchema],
  readinessScore: {
    overall: { type: Number, default: 0 },
    skillMatch: { type: Number, default: 0 },
    resumeQuality: { type: Number, default: 0 },
    interviewReadiness: { type: Number, default: 0 },
    projectStrength: { type: Number, default: 0 },
    breakdownReason: { type: String, default: "" }
  },
  recommendedRoles: [recommendedRoleSchema],
  roadmap: {
    careerGoal: { type: String, default: "" },
    currentLevel: { type: String, default: "Beginner" },
    weeklyPlan: [weeklyPlanSchema],
    suggestedProjects: [suggestedProjectSchema]
  },
  resumeSuggestions: [resumeSuggestionSchema],
  analysisStatus: {
    type: String,
    enum: ["not_started", "resume_uploaded", "analyzing", "completed", "failed"],
    default: "completed"
  }
}, { timestamps: true });

module.exports = mongoose.model("CareerProfile", careerProfileSchema);
