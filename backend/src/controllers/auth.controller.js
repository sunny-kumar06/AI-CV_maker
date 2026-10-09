const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Blacklist = require("../models/blacklist.model");

/**
 * @name register
 * @description Register a new user with hashed password and generate JWT token
 * @access public
 * @route POST /api/auth/register 
 */
async function registerUserController(req, res) {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ message: "Database is connecting. Please try again shortly." });
    }

    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanUsername = username.trim();

    const isUserExist = await userModel.findOne({
      $or: [
        { username: cleanUsername },
        { email: cleanEmail }
      ]
    });

    if (isUserExist) {
      return res.status(400).json({ message: "An account with this email or username is already registered." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      username: cleanUsername,
      email: cleanEmail,
      password: hashedPassword
    });

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET || "default_career_ai_secret",
      { expiresIn: "1d" }
    );

    const isProd = process.env.NODE_ENV === "production";

    res.cookie("token", token, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "None" : "lax",
      path: "/"
    });

    return res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    console.error("❌ REGISTER ERROR:", error);
    if (error.name === 'MongooseServerSelectionError' || error.name === 'MongooseError') {
      return res.status(503).json({ message: "Database is starting. Please try again shortly." });
    }
    return res.status(500).json({ message: "Server error during registration" });
  }
}

/**
 * @name login
 * @description Login user with email & password, verify hash, and set auth cookie
 * @access public
 * @route POST /api/auth/login  
 */
async function loginUserController(req, res) {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ message: "Database is connecting. Please try again shortly." });
    }

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const cleanEmail = email.trim().toLowerCase();

    const user = await userModel.findOne({ email: cleanEmail });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET || "default_career_ai_secret",
      { expiresIn: "1d" }
    );

    const isProd = process.env.NODE_ENV === "production";

    res.cookie("token", token, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "None" : "lax",
      path: "/"
    });

    return res.status(200).json({
      message: "User logged in successfully",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    console.error("❌ LOGIN ERROR:", error);
    if (error.name === 'MongooseServerSelectionError' || error.name === 'MongooseError') {
      return res.status(503).json({ message: "Database is starting. Please try again shortly." });
    }
    return res.status(500).json({ message: "Server error during login" });
  }
}

/**
 * @name logout
 * @description Logout user by blacklisting token and clearing auth cookie
 * @access public   
 * @route POST /api/auth/logout
 */
async function logoutUserController(req, res) {
  try {
    const token = req.cookies.token;

    if (token) {
      await Blacklist.create({ token });
    }

    const isProd = process.env.NODE_ENV === "production";

    res.clearCookie("token", {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "None" : "lax",
      path: "/"
    });

    return res.status(200).json({
      message: "User logged out successfully"
    });
  } catch (error) {
    console.error("❌ LOGOUT ERROR:", error);
    return res.status(500).json({ message: "Server error during logout" });
  }
}

/**
 * @name getMe
 * @description Fetch authenticated current user profile
 * @access private
 * @route GET /api/auth/get-me
 */
async function getMeController(req, res) {
  try {
    const user = await userModel.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "User fetched successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    console.error("❌ GET ME ERROR:", error);
    return res.status(500).json({ message: "Server error fetching user" });
  }
}

module.exports = {
  registerUserController,
  loginUserController,
  logoutUserController,
  getMeController
};
