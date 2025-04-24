const mongoose = require("mongoose")

const ratingSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Types.ObjectId,
            ref: "user"
        },
        book: {
            type: mongoose.Types.ObjectId,
            ref: "book"
        },
        value: {
            type: Number,
            min: 1,
            max: 5
        },
        message:{
            type: String,
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("rating", ratingSchema)