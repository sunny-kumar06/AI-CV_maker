
// const pdfParse = require("pdf-parse");
// const { genrateInterviewReport } = require("../services/ai.service");
// const interviewReportModel = require("../models/interviewReport.model");

// // 🔥 Helper: safely parse AI response
// const safeParse = (item) => {
//     if (typeof item === "string") {
//         try {
//             return JSON.parse(item); // try parsing JSON string
//         } catch {
//             return null; // ignore bad data
//         }
//     }
//     return item;
// };

// async function generateInterviewReportController(req, res) {
//     try {
//         const resumeFile = req.file;

//         if (!resumeFile) {
//             return res.status(400).json({ message: "Resume file is required" });
//         }

//         // ✅ Extract text from PDF
//         const data = await pdfParse(resumeFile.buffer);
//         const resumeContent = data.text;

//         const { jobDescription, selfDescription } = req.body;

//         // ✅ AI call
//         const interviewReportByAi = await genrateInterviewReport(
//             jobDescription,
//             resumeContent,
//             selfDescription
//         );

//         // 🔥 CLEAN DATA (ONLY AI DATA — no fake values)
//         const cleanData = {
//             technicalQuestions: (interviewReportByAi.technicalQuestions || [])
//                 .map(q => safeParse(q))
//                 .filter(q => q && q.question && q.intention && q.answer),

//             behavioralQuestions: (interviewReportByAi.behavioralQuestions || [])
//                 .map(q => safeParse(q))
//                 .filter(q => q && q.question && q.intention && q.answer),

//             skillGaps: (interviewReportByAi.skillGaps || [])
//                 .map(s => safeParse(s))
//                 .filter(s => s && s.skill && s.severity),

//             preparationPlan: (interviewReportByAi.preparationPlan || [])
//                 .map(p => safeParse(p))
//                 .filter(p => p && p.day && p.focus && p.tasks)
//         };

//         // ✅ Save to DB
//         const interviewReport = await interviewReportModel.create({
//             user: req.user._id,
//             resume: resumeContent,
//             jobDescription,
//             selfDescription,
//             matchScore: interviewReportByAi.matchScore,
//             ...cleanData
//         });

//         res.status(200).json({
//             message: "Interview report generated successfully",
//             interviewReport
//         });

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({
//             message: "Internal Server Error",
//             error: error.message
//         });
//     }
// }

// module.exports = { generateInterviewReportController };

const pdfParse = require("pdf-parse");
const { genrateInterviewReport } = require("../services/ai.service");
const interviewReportModel = require("../models/interviewReport.model");

// 🔥 Safe parse (AI string → object)
const safeParse = (item) => {
    if (typeof item === "string") {
        try {
            return JSON.parse(item);
        } catch {
            return null;
        }
    }
    return item;
};

async function generateInterviewReportController(req, res) {
    try {
        const resumeFile = req.file;

        if (!resumeFile) {
            return res.status(400).json({ message: "Resume file is required" });
        }

        // ✅ PDF → text
        let resumeContent = "";

        try {
            const data = await pdfParse(resumeFile.buffer);
            resumeContent = data.text;
        } catch (error) {
            console.error("PDF ERROR:", error.message);

            return res.status(400).json({
                message: "Invalid PDF file. Please upload a valid resume."
            });
        }

        const { jobDescription, selfDescription } = req.body;

        // ✅ AI call
        const interviewReportByAi = await genrateInterviewReport(
            jobDescription,
            resumeContent,
            selfDescription
        );

        // 🔥 CLEAN + SMART FIX
        const cleanData = {
            technicalQuestions: (interviewReportByAi.technicalQuestions || [])
                .map(q => safeParse(q))
                .filter(q => q && typeof q.question === "string")
                .map(q => ({
                    question: q.question,
                    intention: q.intention || "Explain the core concept behind this question",
                    answer: q.answer || "Provide a structured answer with examples"
                })),

            behavioralQuestions: (interviewReportByAi.behavioralQuestions || [])
                .map(q => safeParse(q))
                .filter(q => q && typeof q.question === "string")
                .map(q => ({
                    question: q.question,
                    intention: q.intention || "Assess communication and problem-solving skills",
                    answer: q.answer || "Use STAR method (Situation, Task, Action, Result)"
                })),

            skillGaps: (interviewReportByAi.skillGaps || [])
                .map(s => safeParse(s))
                .filter(s => s && s.skill)
                .map(s => ({
                    skill: s.skill,
                    severity: s.severity || "medium"
                })),

            preparationPlan: (interviewReportByAi.preparationPlan || [])
                .map(p => safeParse(p))
                .filter(p => p)
                .map((p, index) => ({
                    day: p.day || index + 1,
                    focus: p.focus || "General Preparation",
                    tasks: Array.isArray(p.tasks) ? p.tasks : ["Practice concepts"]
                }))
        };

        // 🔥 FINAL SAVE
        const interviewReport = await interviewReportModel.create({
            user: req.user._id,
            resume: resumeContent,
            jobDescription,
            selfDescription,
            matchScore: interviewReportByAi.matchScore,
            ...cleanData
        });

        res.status(200).json({
            message: "Interview report generated successfully",
            interviewReport
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
}



module.exports = { generateInterviewReportController };