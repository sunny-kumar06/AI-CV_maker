const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const upload = require("../middleware/file.middleware");
const { analyzeResumeController, improveResumeController } = require("../controllers/resume.controller");

const router = express.Router();

router.post("/analyze", authMiddleware, upload.single("resume"), analyzeResumeController);
router.post("/improve", authMiddleware, improveResumeController);

module.exports = router;
