const router = require("express").Router()
const User = require("../models/user.js")
const Book = require("../models/book.js")
const { authenticationToken } = require("../middleware/authUser.middleware.js")

router.put("/add-to-cart", authenticationToken, async (req, res) => {
    try {
        const { book_id, user_id } = req.headers
        const user = await User.findById({ _id: user_id })

        isBookAdded = user.cart.includes(book_id)

        if (isBookAdded) {
            return res.status(200).json({
                status: "success",
                message: "Book is already in your cart"
            })
        }

        const updatedUserCart = await User.findByIdAndUpdate(user_id, { $push: { cart: book_id } })

        const userAfterupdatedCart = await User.findById({ _id: updatedUserCart._id })

        return res.status(200).json({
            status: "success",
            data: userAfterupdatedCart,
            message: "Book added to your cart"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "server error while adding book to cart"
        })
    }
})

router.put("/remove-from-cart/:book_id", authenticationToken, async (req, res) => {
    try {
        const { book_id } = req.params
        const { user_id } = req.headers

        const user = await User.findById({ _id: user_id })

        isBookAdded = user.cart.includes(book_id)

        if (!isBookAdded) {
            return res.status(200).json({
                status: "success",
                message: "Book does not exist in your cart"
            })
        }

        const updatedUser = await User.findByIdAndUpdate(user_id, { $pull: { cart: book_id } })

        const userAfterRemove = await User.findById({ _id: updatedUser._id })

        return res.status(200).json({
            status: "success",
            data: userAfterRemove,
            message: "Book removed from cart"
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "server error while removing book from cart"
        })
    }
})

router.get("/get-cart", authenticationToken, async (req, res) => {
    try {
        const { user_id } = req.headers
        const user = await User.findById({ _id: user_id }).populate("cart")

        const cart = user.cart.reverse()

        return res.status(200).json({
            status: "success",
            data: cart
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "server error while fetching cart details"
        })
    }
})

module.exports = router