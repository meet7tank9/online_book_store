const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        avatar: {
            type: String,
            default: "https://icons.veryicon.com/png/o/miscellaneous/standard/avatar-15.png"
        },
        role: {
            type: String,
            default: "user",
            enum: ["user", "admin"]
        },
        favourites: [
            {
                type: mongoose.Types.ObjectId,
                ref: "books"
            }
        ],
        cart: [
            {
                type: mongoose.Types.ObjectId,
                ref: "books"
            }
        ],
        orders: [
            {
                type: mongoose.Types.ObjectId,
                ref: "order"
            }
        ],
        resetPassword: {
            type: String,
        },
        resetPasswordExpires: {
            type: String
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("user", UserSchema)