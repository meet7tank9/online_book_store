const router = require("express").Router()
const User = require("../models/user.js")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { authenticationToken } = require("../middleware/authUser.middleware.js")
const nodemailer = require("nodemailer")

// Sign up
router.post("/register", async (req, res) => {
    try {
        const { username, email, password, address } = req.body

        if (username.length < 5) {
            return res.status(400).json({
                message: "username should be at least 5 characters long"
            })
        }

        if (username.length == 0 || email.length == 0 || password.length == 0 || address.length == 0) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        const usernameExists = await User.findOne({ username: username })
        const emailExists = await User.findOne({ email: email })

        if (usernameExists) {
            return res.status(400).json({
                message: "Username already exists"
            })
        }
        if (emailExists) {
            return res.status(400).json({
                message: "Eamil already exists"
            })
        }

        if (password.length < 6) {
            return res.status(400).json({
                message: "Password length should be at least 6 characters."
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            username: username.toLowerCase(),
            email: email,
            address: address,
            password: hashedPassword
        })

        const createdUser = await User.findById(user._id).select("-password")

        if (!createdUser) {
            return res.status(500).json({
                message: "registration failed"
            })
        }

        res.status(201).json({
            data: user,
            message: "Registration successfull"
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json(
            {
                message: `Server error while registering user`
            }
        )
    }
})


// signin
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body


        if (username.length == 0 || password.length == 0) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        const userExist = await User.findOne({ username: username })

        if (!userExist) {
            return res.status(400).json({
                message: "user with this username does not exists"
            })
        }

        const validPassword = await bcrypt.compare(password, userExist.password)
        if (!validPassword) {
            return res.status(400).json({
                message: "username or password is invalid"
            })
        }

        const token = await jwt.sign(
            {
                _id: userExist._id,
                role: userExist.role,
                username: userExist.username,
                email: userExist.email
            },
            process.env.JWT_SECRET)

        return res.status(200).json({
            data: userExist,
            token: token,
            message: "user logged in successfully"
        })

    } catch (error) {
        res.status(500).json({
            message: "server error while login user"
        })
    }
})

router.get("/get-users", authenticationToken, async (req, res) => {
    try {
        const user = await User.find({}).select("-password")

        if (!user) {
            return res.status(400).json({
                message: "please login first"
            })
        }

        res.status(200).json({
            data: user,
        })
    } catch (error) {
        return res.status(500).json({
            message: "server error while getting users information"
        })
    }
})

router.get("/user-info", authenticationToken, async (req, res) => {
    try {
        const { id } = req.headers
        const user = await User.findById({ _id: id }).select("-password")

        if (!user) {
            return res.status(400).json({
                message: "please login first"
            })
        }

        res.status(200).json({
            data: user,
        })
    } catch (error) {
        return res.status(500).json({
            message: "server error while getting user information"
        })
    }
})

router.put("/update-address", authenticationToken, async (req, res) => {
    try {
        const { address } = req.body

        const updatedUser = await User.findByIdAndUpdate(req.user._id, { address: address }, { new: true })

        if (!updatedUser) {
            return res.status(400).json({
                message: "Address did not updated"
            })
        }

        res.status(200).json({
            data: updatedUser,
            message: "user address updated successfully"
        })
    } catch (error) {
        return res.status(500).json({
            message: "server error while updating user information"
        })
    }
})

router.post("/forgot-password", async (req, res) => {
    try {
        const { email } = req.body

        if (!email) {
            return res.status(400).json({
                message: "Please enter your registered email."
            })
        }

        const user = await User.findOne({ email: email })

        if (!user) {
            return res.status(400).json({
                message: "User not found."
            })
        }

        const randomNumber = Math.floor(100000 + Math.random() * 900000).toString()
        user.resetPassword = randomNumber
        user.resetPasswordExpires = Date.now() + 300000

        await user.save()

        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        })

        const mailOptions = {
            to: user.email,
            from: process.env.EMAIL_USER,
            subject: "Reset Password OTP.",
            text: `Hello from Book-Store,
            Your OTP for password reset is: ${randomNumber}. It is valid for 5 minutes.`,
        }

        await transporter.sendMail(mailOptions)

        res.status(200).json({
            message: "OTP sent successfully."
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "server error while updating user information"
        })
    }
})

router.post('/reset-password', async (req, res) => {
    try {
        const { email, otp, newPassword, cPassword } = req.body

        if (!email || !otp || !newPassword || !cPassword) {
            return res.status(500).json({ message: "Please provide all required fields" });
        }


        if (newPassword !== cPassword) {
            return res.status(400).json({
                message: "new password and confirm password should be same"
            })
        }
        const user = await User.findOne({
            email: email,
            resetPassword: otp,
            resetPasswordExpires: { $gt: Date.now() }
        })

        if (!user) {
            return res.status(400).json({
                message: "OTP is incorrect or expired."
            })
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10)

        user.password = hashedPassword
        user.resetPassword = undefined
        user.resetPasswordExpires = undefined

        await user.save()

        return res.status(200).json({
            message: "Password changed successfully."
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "server error while updating user information"
        })
    }
})

module.exports = router