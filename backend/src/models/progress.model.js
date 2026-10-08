const mongoose = require("mongoose");

const skillTrackSchema = new mongoose.Schema({
  skill: { type: String, required: true },
  percentage: { type: Number, default: 0, min: 0, max: 100 },
  status: { type: String, enum: ["NOT_STARTED", "IN_PROGRESS", "COMPLETED"], default: "NOT_STARTED" }
}, { _id: false });

const progressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true
  },
  skillProgress: [skillTrackSchema],
  completedTopics: { type: [String], default: [] },
  completedProjects: { type: [String], default: [] },
  interviewPracticeCount: { type: Number, default: 0 },
  roadmapWeeksCompleted: { type: [Number], default: [] }
}, { timestamps: true });

module.exports = mongoose.model("UserProgress", progressSchema);
