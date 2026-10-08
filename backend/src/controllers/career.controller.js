const pdfParse = require("pdf-parse");
const CareerProfile = require("../models/careerProfile.model");
const UserProgress = require("../models/progress.model");
const { analyzeCareerAdvisor } = require("../services/ai.service");

/**
 * POST /api/career/analyze
 * Comprehensive Career Advisor Analysis
 */
async function analyzeCareerController(req, res) {
  try {
    const userId = req.user.id;
    let resumeContent = req.body.resumeText || "";

    if (req.file) {
      try {
        const parsedPdf = await pdfParse(req.file.buffer);
        resumeContent = parsedPdf.text || resumeContent;
      } catch (err) {
        console.error("PDF Parse error in career analyze:", err.message);
      }
    }

    const { jobDescription, selfDescription, targetRole } = req.body;

    // AI Call
    const aiResult = await analyzeCareerAdvisor({
      resumeText: resumeContent,
      jobDescription: jobDescription || "",
      selfDescription: selfDescription || "",
      targetRole: targetRole || "Software Engineer"
    });

    // Save or update CareerProfile in DB
    const careerProfile = await CareerProfile.findOneAndUpdate(
      { user: userId },
      {
        user: userId,
        targetRole: aiResult.targetRole || targetRole || "Software Engineer",
        resumeText: resumeContent,
        jobDescription: jobDescription || "",
        skills: aiResult.skills || { matched: [], missing: [], partial: [], recommended: [] },
        prioritySkills: aiResult.prioritySkills || [],
        readinessScore: aiResult.readinessScore || { overall: 0, skillMatch: 0, resumeQuality: 0, interviewReadiness: 0, projectStrength: 0, breakdownReason: "" },
        recommendedRoles: aiResult.recommendedRoles || [],
        roadmap: aiResult.roadmap || { careerGoal: targetRole, currentLevel: "Intermediate", weeklyPlan: [], suggestedProjects: [] },
        resumeSuggestions: aiResult.resumeSuggestions || []
      },
      { upsert: true, new: true, runValidators: true }
    );

    // Also initialize user progress skills if empty
    let progress = await UserProgress.findOne({ user: userId });
    if (!progress) {
      progress = await UserProgress.create({ user: userId });
    }

    if (aiResult.skills && aiResult.skills.missing) {
      const existingSkillsMap = new Map(progress.skillProgress.map(s => [s.skill.toLowerCase(), s]));
      const newSkillsTrack = [...progress.skillProgress];

      // Add missing skills to tracking if not present
      aiResult.skills.missing.forEach(skill => {
        if (!existingSkillsMap.has(skill.toLowerCase())) {
          newSkillsTrack.push({ skill, percentage: 0, status: "NOT_STARTED" });
        }
      });

      // Add matched skills as 100% completed if not present
      (aiResult.skills.matched || []).forEach(skill => {
        if (!existingSkillsMap.has(skill.toLowerCase())) {
          newSkillsTrack.push({ skill, percentage: 100, status: "COMPLETED" });
        }
      });

      progress.skillProgress = newSkillsTrack;
      await progress.save();
    }

    return res.status(200).json({
      message: "Career analysis completed successfully",
      careerProfile,
      progress
    });
  } catch (error) {
    console.error("❌ Error in analyzeCareerController:", error);
    return res.status(500).json({
      message: "Failed to perform career analysis",
      error: error.message
    });
  }
}

/**
 * GET /api/career/profile
 * Get saved career profile for current user
 */
async function getCareerProfileController(req, res) {
  try {
    const userId = req.user.id;
    let careerProfile = await CareerProfile.findOne({ user: userId });

    if (!careerProfile) {
      return res.status(200).json({
        message: "No profile found. Run analysis to create one.",
        careerProfile: null
      });
    }

    return res.status(200).json({ careerProfile });
  } catch (error) {
    console.error("❌ Error in getCareerProfileController:", error);
    return res.status(500).json({ message: "Server error fetching career profile" });
  }
}

/**
 * POST /api/career/roadmap
 */
async function generateRoadmapController(req, res) {
  try {
    const userId = req.user.id;
    let profile = await CareerProfile.findOne({ user: userId });
    if (!profile) {
      // Trigger default profile creation
      return analyzeCareerController(req, res);
    }
    return res.status(200).json({ roadmap: profile.roadmap });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

/**
 * POST /api/career/skill-gap
 */
async function getSkillGapController(req, res) {
  try {
    const userId = req.user.id;
    let profile = await CareerProfile.findOne({ user: userId });
    if (!profile) {
      return res.status(200).json({ skills: { matched: [], missing: [], partial: [], recommended: [] }, prioritySkills: [] });
    }
    return res.status(200).json({
      skills: profile.skills,
      prioritySkills: profile.prioritySkills
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

/**
 * POST /api/career/recommendations
 */
async function getRecommendationsController(req, res) {
  try {
    const userId = req.user.id;
    let profile = await CareerProfile.findOne({ user: userId });
    if (!profile) {
      return res.status(200).json({ recommendedRoles: [] });
    }
    return res.status(200).json({ recommendedRoles: profile.recommendedRoles });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

/**
 * GET /api/user/progress or /api/career/progress
 */
async function getProgressController(req, res) {
  try {
    const userId = req.user.id;
    let progress = await UserProgress.findOne({ user: userId });
    if (!progress) {
      progress = await UserProgress.create({ user: userId, skillProgress: [] });
    }
    return res.status(200).json({ progress });
  } catch (error) {
    console.error("❌ Error in getProgressController:", error);
    return res.status(500).json({ message: "Server error fetching user progress" });
  }
}

/**
 * PUT /api/user/progress or /api/career/progress
 */
async function updateProgressController(req, res) {
  try {
    const userId = req.user.id;
    const { skillProgress, completedTopics, completedProjects, roadmapWeeksCompleted, interviewPracticeCount } = req.body;

    let progress = await UserProgress.findOne({ user: userId });
    if (!progress) {
      progress = new UserProgress({ user: userId });
    }

    if (skillProgress !== undefined) progress.skillProgress = skillProgress;
    if (completedTopics !== undefined) progress.completedTopics = completedTopics;
    if (completedProjects !== undefined) progress.completedProjects = completedProjects;
    if (roadmapWeeksCompleted !== undefined) progress.roadmapWeeksCompleted = roadmapWeeksCompleted;
    if (interviewPracticeCount !== undefined) progress.interviewPracticeCount = interviewPracticeCount;

    await progress.save();

    return res.status(200).json({
      message: "Progress updated successfully",
      progress
    });
  } catch (error) {
    console.error("❌ Error in updateProgressController:", error);
    return res.status(500).json({ message: "Failed to update progress" });
  }
}

module.exports = {
  analyzeCareerController,
  getCareerProfileController,
  generateRoadmapController,
  getSkillGapController,
  getRecommendationsController,
  getProgressController,
  updateProgressController
};
