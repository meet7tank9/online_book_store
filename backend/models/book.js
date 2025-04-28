const mongoose = require("mongoose")

const BookSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        language: {
            type: String,
            required: true
        },
        category: {
            type: mongoose.Types.ObjectId,
            ref: "category"
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("books", BookSchema)