const jwt = require("jsonwebtoken")
const User = require("../models/user.js")

const authenticationToken = async (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"] || null

        const token = authHeader && authHeader.split(" ")[1]

        if (token == null) {
            return res.status(400).json({
                message: "unauthorized access, please login first"
            })
        }

        jwt.verify(token, process.env.JWT_SECRET, async (error, decoded) => {
            if (error) {
                return res.status(400).json({
                    message: "token expired! please login first"
                })
            }
            const user = await User.findById({ _id: decoded._id })

            if (!user) {
                return res.status(400).json({
                    message: "token expired! please login again"
                })
            }

            req.user = user

            next()
        })
    } catch (error) {
        return res.status(500).json({
            message: "server error while authorize user"
        })
    }
}

module.exports = { authenticationToken }