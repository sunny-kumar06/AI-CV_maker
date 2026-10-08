const { analyzeJobDescription } = require("../services/ai.service");

async function analyzeJobController(req, res) {
  try {
    const { jobDescription } = req.body;

    if (!jobDescription || !jobDescription.trim()) {
      return res.status(400).json({ message: "Job description text is required." });
    }

    const jobAnalysis = await analyzeJobDescription(jobDescription);

    return res.status(200).json({
      message: "Job description analyzed successfully",
      jobAnalysis
    });
  } catch (error) {
    console.error("❌ Error in analyzeJobController:", error);
    return res.status(500).json({ message: "Failed to analyze job description", error: error.message });
  }
}

module.exports = {
  analyzeJobController
};
