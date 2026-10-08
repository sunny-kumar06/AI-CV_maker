const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const upload = require("../middleware/file.middleware");
const {
  analyzeCareerController,
  getCareerProfileController,
  generateRoadmapController,
  getSkillGapController,
  getRecommendationsController,
  getProgressController,
  updateProgressController
} = require("../controllers/career.controller");

const router = express.Router();

router.post("/analyze", authMiddleware, upload.single("resume"), analyzeCareerController);
router.get("/profile", authMiddleware, getCareerProfileController);
router.post("/roadmap", authMiddleware, generateRoadmapController);
router.post("/skill-gap", authMiddleware, getSkillGapController);
router.post("/recommendations", authMiddleware, getRecommendationsController);
router.get("/progress", authMiddleware, getProgressController);
router.put("/progress", authMiddleware, updateProgressController);

module.exports = router;
