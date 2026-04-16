const express = require("express");
const authMiddleware = require("../middleware/auth.middleware")
const interviewController = require("../controllers/interview.controller")
const upload = require("../middleware/file.middleware")
console.log("UPLOAD:", upload);


const interviewRouter = express.Router()





/**
 * @route POST /api/interview/generate-report
 * @desc Generate interview report based on job description, resume and self description
 * @access Private
 * @body { jobDescription: string, resume: string, selfDescription: string }
 * @returns { matchScore: number, technicalQuestions: [{ question: string, intention: string, answer: string }], behavioralQuestions: [{ question: string, intention: string, answer: string }], skillGaps: [{ skill: string, severity: "low" | "medium" | "high" }], preparationPlan: [{ day: number, focus: string, tasks: [string] }] }
 */


interviewRouter.post("/",
    authMiddleware,
    upload.single("resume"),
    interviewController.generateInterviewReportController)



// 🔥 ADD THIS BELOW POST ROUTE

interviewRouter.get("/report/:id", async (req, res) => {
    try {
        const report = await require("../models/interviewReport.model").findById(req.params.id);

        if (!report) {
            return res.status(404).json({ message: "Report not found" });
        }

        res.json({ interviewReport: report });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



module.exports = interviewRouter