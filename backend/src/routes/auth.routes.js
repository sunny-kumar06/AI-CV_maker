const express = require("express");

const controller = require("../controllers/auth.controller")
const authMiddleware = require("../middleware/auth.middleware")





const authrouter = express.Router();


/**
 * @route POST /api/auth/register
 * @description This route is used to register a new user. It takes the name, email and password from the request body and creates a new user in the database. It then sends the user object as the response. If there is an error, it sends an error response.
 * @access public
 */
authrouter.post("/register", controller.registerUserController)

/**
 * @route POST /api/auth/login
 * @description This route is used to login a user. It takes the email and password from the request body and checks if the user exists in the database. If the user exists, it compares the password with the hashed password in the database. If the password is correct, it generates a JWT token and sends it as a response. If there is an error, it sends an error response.
 * @access public
 */
authrouter.post("/login", controller.loginUserController)


/**
 * @route POST /api/auth/logout
 * @description This route is used to logout a user. It clears the token cookie and sends a success response.
 * @access public   
 */
authrouter.post("/logout", controller.logoutUserController)


/**
 * @route GET /api/auth/get-me
 * @description This route is used to get the current logged in user. It takes the token from the cookie and verifies it. If the token is valid, it sends the user object as the response. If there is an error, it sends an error response.
 * @access private
 */

authrouter.get("/get-me", authMiddleware, controller.getMeController)

module.exports = authrouter