const router = require("express").Router()
const User = require("../models/user.js")
const Book = require("../models/book.js")
const { authenticationToken } = require("../middleware/authUser.middleware.js")

router.put("/add-to-favourite", authenticationToken, async (req, res) => {
    try {
        const { book_id, user_id } = req.headers
        const user = await User.findById({ _id: user_id })

        isBookFavourite = user.favourites.includes(book_id)

        if (isBookFavourite) {
            return res.status(200).json({
                status: "success",
                message: "Book is already in your favourites"
            })
        }

        const updatedUser = await User.findByIdAndUpdate(user_id, { $push: { favourites: book_id } })

        const userAfterAdd = await User.findById({ _id: updatedUser._id })

        return res.status(200).json({
            status: "success",
            data: userAfterAdd,
            message: "Book added to favourites"
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "server error while adding book to favourite"
        })
    }
})

router.put("/remove-from-favourite", authenticationToken, async (req, res) => {
    try {
        const { book_id, user_id } = req.headers
        const user = await User.findById({ _id: user_id })

        isBookFavourite = user.favourites.includes(book_id)

        if (!isBookFavourite) {
            return res.status(200).json({
                status: "success",
                message: "Book does not exist in your favourites"
            })
        }

        const updatedUser = await User.findByIdAndUpdate(user_id, { $pull: { favourites: book_id } })

        const userAfterRemove = await User.findById({ _id: updatedUser._id })

        return res.status(200).json({
            status: "success",
            data: userAfterRemove,
            message: "Book removed from favourites"
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "server error while removing book from favourite"
        })
    }
})

router.get("/get-favourite-books", authenticationToken, async (req, res) => {
    try {
        const { user_id } = req.headers
        const user = await User.findById({ _id: user_id }).populate({
            path: "favourites",
            populate: {
                path: "category",
                select: "name"
            }
        })

        const favourites = user.favourites

        return res.status(200).json({
            status: "success",
            data: favourites
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "server error while removing book from favourite"
        })
    }
})

module.exports = router