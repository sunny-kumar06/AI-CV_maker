// const express = require('express');
// const cookieParser = require("cookie-parser")
// const cors = require("cors")

// const app = express()


// app.use(express.json())
// app.use(cookieParser())
// app.use(cors({
//     origin: "*",
//     credentials: true
// }))

// //all routes will be here
// const authRouter = require("./routes/auth.routes")
// const interviewRouter = require("./routes/interview.routes")







// //use routes
// app.use("/api/auth", authRouter)
// app.use("/api/interview", interviewRouter)
// module.exports = app;  


const express = require('express');
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

// 🔥 VERY IMPORTANT (PUT AT TOP)
const allowedOrigins = [
    "https://ai-cv-maker-gilt.vercel.app",
    "https://ai-cv-maker-three.vercel.app",
    "http://localhost:5173",
];

app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin (Postman, curl)
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        } else {
            return callback(new Error("Not allowed by CORS: " + origin));
        }
    },
    credentials: true,
}));


app.use(express.json());
app.use(cookieParser());

// routes
const authRouter = require("./routes/auth.routes");
const interviewRouter = require("./routes/interview.routes");

app.use("/api/auth", authRouter);
app.use("/api/interview", interviewRouter);

module.exports = app;