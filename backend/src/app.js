const express = require('express');
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

const allowedOrigins = [
    process.env.FRONTEND_URL,
    "https://ai-cv-maker-gilt.vercel.app",
    "https://ai-cv-maker-three.vercel.app",
    "http://localhost:5173",
    "http://localhost:3000",
    "http://127.0.0.1:5173"
].filter(Boolean);

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);

        const isExactMatch = allowedOrigins.some(o => origin.startsWith(o));
        const isVercelDomain = /\.vercel\.app$/.test(new URL(origin).hostname);

        if (isExactMatch || isVercelDomain) {
            return callback(null, true);
        } else {
            console.log("❌ BLOCKED ORIGIN:", origin);
            return callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

// Import routes
const authRouter = require("./routes/auth.routes");
const interviewRouter = require("./routes/interview.routes");
const careerRouter = require("./routes/career.routes");
const resumeRouter = require("./routes/resume.routes");
const jobRouter = require("./routes/job.routes");

// Mount routes
app.use("/api/auth", authRouter);
app.use("/api/interview", interviewRouter);
app.use("/api/career", careerRouter);
app.use("/api/user", careerRouter); // Also handles /api/user/progress
app.use("/api/resume", resumeRouter);
app.use("/api/job", jobRouter);

// Centralized Error Handling Middleware
app.use((err, req, res, next) => {
    console.error("❌ Express Unhandled Error:", err);
    res.status(err.status || 500).json({
        message: err.message || "Internal Server Error",
        error: process.env.NODE_ENV === "development" ? err : {}
    });
});

module.exports = app;