const router = require("express").Router()
const Rating = require("../models/rating.js")
const { authenticationToken } = require("../middleware/authUser.middleware.js")

router.post("/add-rating", authenticationToken, async (req, res) => {
    try {
        const { value, message } = req.body
        const { book_id, id } = req.headers

        if (value < 1 || value > 5) {
            return res.status(400).json({
                message: "Rating value should be between 1 to 5."
            })
        }

        const newRecord = await Rating.create({
            book: book_id,
            user: id,
            value: value,
            message: message
        })

        const record = await Rating.findById(newRecord._id)
        if (!record) {
            return res.status(400).json({
                message: "Rating not added."
            })
        }

        return res.status(201).json({
            data: record,
            message: "Rating added successfully."
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error."
        })
    }
})

router.get("/get-rating", async (req, res) => {
    try {
        const { book_id } = req.headers

        const ratingRecords = await Rating.find({ book: book_id }).populate("user")

        if (!ratingRecords) {
            return res.status(400).json({
                message: "no data found for this book."
            })
        }

        return res.status(201).json({
            data: ratingRecords
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error."
        })
    }
})

module.exports = router