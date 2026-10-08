const pdfParse = require("pdf-parse");
const { improveResumeContent } = require("../services/ai.service");

async function analyzeResumeController(req, res) {
  try {
    let resumeText = req.body.resumeText || "";

    if (req.file) {
      try {
        const parsed = await pdfParse(req.file.buffer);
        resumeText = parsed.text || resumeText;
      } catch (err) {
        return res.status(400).json({ message: "Invalid PDF file. Please upload a valid resume PDF." });
      }
    }

    if (!resumeText) {
      return res.status(400).json({ message: "Resume content or file is required." });
    }

    const { targetRole } = req.body;
    const aiAnalysis = await improveResumeContent({ resumeText, targetRole: targetRole || "Software Engineer" });

    return res.status(200).json({
      message: "Resume analyzed successfully",
      extractedTextLength: resumeText.length,
      analysis: aiAnalysis
    });
  } catch (error) {
    console.error("❌ Error in analyzeResumeController:", error);
    return res.status(500).json({ message: "Failed to analyze resume", error: error.message });
  }
}

async function improveResumeController(req, res) {
  try {
    const { resumeText, targetRole } = req.body;

    if (!resumeText) {
      return res.status(400).json({ message: "Resume text is required." });
    }

    const aiSuggestions = await improveResumeContent({
      resumeText,
      targetRole: targetRole || "Software Engineer"
    });

    return res.status(200).json({
      message: "Resume suggestions generated successfully",
      suggestions: aiSuggestions
    });
  } catch (error) {
    console.error("❌ Error in improveResumeController:", error);
    return res.status(500).json({ message: "Failed to improve resume", error: error.message });
  }
}

module.exports = {
  analyzeResumeController,
  improveResumeController
};
