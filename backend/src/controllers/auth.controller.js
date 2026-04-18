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
    const isProd = process.env.NODE_ENV === "production";

    res.cookie("token", token, {
        httpOnly: true,
        secure: isProd,
        sameSite: isProd ? "None" : "lax",
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
// async function loginUserController(req, res) {
//     try {
//         const { email, password } = req.body;

//         const user = await userModel.findOne({ email });

//         if (!user) {
//             return res.status(400).json({ message: "Invalid email or password" });
//         }

//         const isPasswordCorrect = await bcrypt.compare(password, user.password);

//         if (!isPasswordCorrect) {
//             return res.status(400).json({ message: "Invalid email or password" });
//         }

//         // 🔥 DEBUG
//         console.log("JWT SECRET:", process.env.JWT_SECRET);

//         const token = jwt.sign(
//             { id: user._id, username: user.username },
//             process.env.JWT_SECRET,
//             { expiresIn: "1d" }
//         );

//         res.cookie("token", token, {
//             httpOnly: true,
//             secure: false,
//             sameSite: "lax",
//             maxAge: 24 * 60 * 60 * 1000
//         });

//         return res.status(200).json({
//             message: "User logged in successfully",
//             user: {
//                 id: user._id,
//                 username: user.username,
//                 email: user.email
//             }
//         });

//     } catch (error) {
//         console.log("LOGIN ERROR:", error);  // 🔥 IMPORTANT
//         return res.status(500).json({ message: "Server error" });
//     }
// }

async function loginUserController(req, res) {
    try {
        console.log("STEP 1: request received");

        const { email, password } = req.body;
        console.log("STEP 2:", email);

        const user = await userModel.findOne({ email });
        console.log("STEP 3: user found?", user ? true : false);

        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        console.log("STEP 4: comparing password");

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        console.log("STEP 5: password match?", isPasswordCorrect);

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        console.log("STEP 6: JWT secret", process.env.JWT_SECRET);

        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        console.log("STEP 7: token generated");

        const isProd = true; // 🔥 since deployed

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,        // 🔥 MUST for HTTPS
            sameSite: "None",    // 🔥 MUST for cross-origin
        });

        console.log("STEP 8: cookie set");

        return res.status(200).json({
            message: "User logged in successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        console.log("🔥 LOGIN ERROR:", error);
        return res.status(500).json({ message: "Server error" });
    }
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

    res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "None"
    });

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

