const mongoose = require('mongoose');

const connectDB = async () => {
  if (!process.env.MONGODB_URI) {
    console.error("❌ MONGODB_URI environment variable is missing in backend/.env");
    throw new Error("MONGODB_URI is undefined");
  }

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    const dbName = conn.connection.name || 'CareerAI';
    console.log(`✅ MongoDB connected successfully`);
    console.log(`   Database: ${dbName}`);
    return conn;
  } catch (error) {
    console.error("❌ MongoDB connection failed.");
    console.error("   Check MongoDB Atlas Network Access (IP Allowlist), database credentials, connection URI and cluster status.");
    throw error;
  }
};

module.exports = connectDB;