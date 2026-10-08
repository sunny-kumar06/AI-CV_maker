const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const { analyzeJobController } = require("../controllers/job.controller");

const router = express.Router();

router.post("/analyze", authMiddleware, analyzeJobController);

module.exports = router;
