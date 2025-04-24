const router = require("express").Router()
const User = require("../models/user.js")
const Book = require("../models/book.js")
const Order = require("../models/order.js")
const { authenticationToken } = require("../middleware/authUser.middleware.js")

router.post("/place-order", authenticationToken, async (req, res) => {
    try {
        const { user_id } = req.headers
        const { order } = req.body

        for (const orderItem of order) {
            const newOrderItem = await Order.create(
                {
                    user: user_id,
                    book: orderItem._id
                }
            )

            await User.findByIdAndUpdate(user_id, { $push: { orders: newOrderItem._id } })
            await User.findByIdAndUpdate(user_id, { $pull: { cart: orderItem._id } })
        }
        
        return res.status(201).json({
            status: "success",
            message: "Order placed successful"
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "server error while placing order"
        })
    }
})

router.get("/get-order-history", authenticationToken, async (req, res) => {
    try {
        const { user_id } = req.headers

        const user = await User.findById({ _id: user_id }).populate({
            path: "orders",
            populate: {
                path: "book"
            }
        })

        const orderHistory = user.orders.reverse()

        return res.status(200).json({
            status: "success",
            data: orderHistory
        })
    } catch (error) {
        return res.status(500).json({
            message: "server error while getting order history"
        })
    }
})

router.get("/get-all-orders", authenticationToken, async (req, res) => {
    try {

        if (req.user.role === "admin") {

            const order = await Order.find().populate(
                {
                    path: "book"
                }
            ).populate({ path: "user" }).sort({ createdAt: -1 })

            return res.status(200).json({
                status: "success",
                data: order,
                message: ""
            })
        }
        else {
            return res.status(400).json({
                message: "You don't have access to perform this operation, only admin has access to this operation."
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "server error while getting order details"
        })
    }
})

router.put("/update-status/:order_id", authenticationToken, async (req, res) => {
    try {
        const { order_id } = req.params
        // const {status} = req.body.status
        // console.log(req.body);

        if (req.user.role === "admin") {

            const order = await Order.findByIdAndUpdate(order_id, {
                status: req.body.status
            }, { new: true })

            return res.status(200).json({
                status: "success",
                data: order,
                message: "Status updated successfull"
            })
        }
        else {
            return res.status(400).json({
                message: "You don't have access to perform this operation, only admin has access to this operation."
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "server error while getting order details"
        })
    }
})

module.exports = router