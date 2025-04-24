const mongoose = require("mongoose")

const OrderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Types.ObjectId,
            ref: "user"
        },
        book: {
            type: mongoose.Types.ObjectId,
            ref: "books"
        },
        status: {
            type: String,
            default: "Order Placed",
            enum: ["Order Placed", "Out For Delivery", "Delivered", "Cancelled"]
        },
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("order", OrderSchema)