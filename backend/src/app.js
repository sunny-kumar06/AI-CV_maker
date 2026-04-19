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
app.use(cors({
    origin: "https://ai-cv-maker-23tq4zhry-sunny-kumar06s-projects.vercel.app",
    credentials: true
}));


app.use(express.json());
app.use(cookieParser());

// routes
const authRouter = require("./routes/auth.routes");
const interviewRouter = require("./routes/interview.routes");

app.use("/api/auth", authRouter);
app.use("/api/interview", interviewRouter);

module.exports = app;