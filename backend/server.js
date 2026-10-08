require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/config/database");

const PORT = process.env.PORT || 8080;

// Root default route
app.get("/", (req, res) => {
  res.send("CareerAI Backend API Server Running");
});

// STARTUP SEQUENCE:
// 1. Load Environment Variables (dotenv)
// 2. Connect to MongoDB Atlas
// 3. Start Express server ONLY if database connection succeeds
const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Refusing to start Express server due to database connection failure.");
    process.exit(1);
  }
};

startServer();