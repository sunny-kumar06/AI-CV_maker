const jwt = require("jsonwebtoken")
const Blacklist = require("../models/blacklist.model")

async function authMiddleware(req, res, next) {
    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({
            message: "Token is not available, authorization denied"
        })
    }

    try {
        const isBlacklisted = await Blacklist.findOne({ token })

        if (isBlacklisted) {
            return res.status(401).json({ message: "Token expired" })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded

        next()
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" })
    }
}

module.exports = authMiddleware