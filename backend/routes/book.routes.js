const router = require("express").Router()
const User = require("../models/user.js")
const Book = require("../models/book.js")
const { authenticationToken } = require("../middleware/authUser.middleware.js")

router.post("/add-book", authenticationToken, async (req, res) => {
    try {
        const { id } = req.headers
        const { title, url, author, price, language, description } = req.body

        const user = await User.findById({ _id: id })

        if (user.role === "admin") {

            const bookExist = await Book.findOne({ title: title })

            if (bookExist) {
                return res.status(400).json({
                    message: "Book already exists."
                })
            }

            const newBook = await Book.create({
                title, url, author, price, language, description
            })

            const book = await Book.findById({ _id: newBook._id })
            if (!book) {
                return res.status(400).json({
                    message: "Book does not added."
                })
            }

            res.status(201).json({
                data: book,
                message: "Book added successfully."
            })
        }
        else {
            return res.status(400).json({
                message: "You don't have permission to do this, Only admin can add new books"
            })
        }

    } catch (error) {
        // console.log(error);
        return res.status(500).json({
            message: "server error while adding new book"
        })
    }
})

router.put("/update-book", authenticationToken, async (req, res) => {
    try {
        const { book_id } = req.headers
        const { title, url, author, price, language, description } = req.body

        if (req.user.role === "admin") {
            const bookExists = await Book.findOne({ _id: book_id })
            if (!bookExists) {
                return res.status(400).json({
                    message: "Book with this id does not exists."
                })
            }
            const updatedBook = await Book.findByIdAndUpdate(book_id, {
                title: title,
                url: url,
                author: author,
                price: price,
                language: language,
                description: description
            }, { new: true })

            if (!updatedBook) {
                return res.status(400).json({
                    message: "Book does not updated."
                })
            }

            return res.status(200).json({
                data: updatedBook,
                message: "Book updated successfull."
            })
        }
        else {
            return res.status(400).json({
                message: "You don't have permission to do this, Only admin can update book"
            })
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "server error while updating book"
        })
    }
})

router.delete("/delete-book", authenticationToken, async (req, res) => {
    try {
        const { book_id } = req.headers
        // const { title, url, author, price, language, description } = req.body

        if (req.user.role === "admin") {
            const bookExists = await Book.findOne({ _id: book_id })
            if (!bookExists) {
                return res.status(400).json({
                    message: "Book with this id does not exists."
                })
            }
            const deletedBook = await Book.findByIdAndDelete(book_id)

            if (!deletedBook) {
                return res.status(400).json({
                    message: "Book does not deleted."
                })
            }

            return res.status(200).json({
                data: deletedBook,
                message: "Book deleted successfull."
            })
        }
        else {
            return res.status(400).json({
                message: "You don't have permission to do this, Only admin can delete book"
            })
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "server error while deleting book"
        })
    }
})

router.get("/get-books", async (req, res) => {
    try {

        const books = await Book.find().sort({ createdAt: -1 })

        if (!books) {
            return res.status(400).json(
                {
                    message: "No books found"
                }
            )
        }
        return res.status(200).json({
            status: "success",
            data: books,
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "server error while fetching books"
        })
    }
})

router.get("/get-recent-books", async (req, res) => {
    try {

        const books = await Book.find().sort({ createdAt: -1 }).limit(4)

        if (!books) {
            return res.status(400).json(
                {
                    message: "No books found"
                }
            )
        }
        return res.status(200).json({
            status: "success",
            data: books,
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "server error while fetching books"
        })
    }
})

router.get("/get-book-by-id/:id", async (req, res) => {
    try {
        const { id } = req.params

        const book = await Book.findById(id)

        if (!book) {
            return res.status(400).json(
                {
                    message: "No book found"
                }
            )
        }
        return res.status(200).json({
            status: "success",
            data: book
        })

    } catch (error) {
        return res.status(500).json({
            message: "Server error fetching book"
        })
    }
})

module.exports = router