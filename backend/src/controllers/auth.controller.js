const userModel = require("../models/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Blacklist = require("../models/blacklist.model")


/**
 * 
 @name register
 @description This function is used to register a new user. It takes the name, email and password from the request body and creates a new user in the database. It then sends the user object as the response. If there is an error, it sends an error response.
 @access public
 @route POST /api/auth/register 
 */
async function registerUserController(req, res) {
    const { username, email, password } = req.body

    if (!username || !email || !password) {
        return res.status(400).json({ message: "Please fill all the fields" })
    }

    const isUserExist = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    })

    if (isUserExist) {
        return res.status(400).json({ message: "Account is already registered" })
    }

    const hashe = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        username,
        email,
        password: hashe
    })

    const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );

    // 🔥 FIXED COOKIE
    res.cookie("token", token, {
        httpOnly: true,
        secure: true,        // ⚠️ required for Vercel
        sameSite: "None",    // ⚠️ required for cross-origin
        maxAge: 24 * 60 * 60 * 1000
    });

    return res.status(201).json({
        message: "User registered successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    });
}

/**
 * @name login
 * @description This function is used to login a user. It takes the email and password from the request body and checks if the user exists in the database. If the user exists, it compares the password with the hashed password in the database. If the password is correct, it generates a JWT token and sends it as a response. If there is an error, it sends an error response.
 * @access public
 * @route POST /api/auth/login  
 */

async function loginUserController(req, res) {
    const { email, password } = req.body
    const user = await userModel.findOne({ email })
    if (!user) {
        return res.status(400).json({ message: "Invalid email or password" })
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Invalid email or password" })
    }


    const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );

    // 🔥 FIXED COOKIE
    res.cookie("token", token, {
        httpOnly: true,
        secure: true,        // ⚠️ required for Vercel (HTTPS)
        sameSite: "None",    // ⚠️ required for cross-origin
        maxAge: 24 * 60 * 60 * 1000 // optional (1 day)
    });

    return res.status(200).json({
        message: "User logged in successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    });

}


/**
    * @name logout
    * @description This function is used to logout a user. It clears the token cookie and sends a success response.
    * @access public   
    * @route POST /api/auth/logout
 */


async function logoutUserController(req, res) {
    const token = req.cookies.token

    if (token) {
        await Blacklist.create({ token })
    }

    res.clearCookie("token")

    return res.status(200).json({
        message: "User logged out successfully"
    })
}

async function getMeController(req, res) {
    const user = await userModel.findById(req.user.id).select("-password")

    return res.status(200).json({
        message: "User fetched successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}


module.exports = {
    registerUserController,
    loginUserController,
    logoutUserController,
    getMeController
}
