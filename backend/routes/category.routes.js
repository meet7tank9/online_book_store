const router = require("express").Router()
const Category = require("../models/category.js")
const { authenticationToken } = require("../middleware/authUser.middleware.js")


router.post("/add-category", authenticationToken, async (req, res) => {
    try {
        const { name } = req.body
        if (req.user.role === "admin") {

            const categoryExists = await Category.findOne({ name: name })

            if (categoryExists) {
                return res.status(400).json({
                    message: "Category with this name already exists"
                })
            }

            const newCategory = await Category.create({
                name: name
            })

            const isCreated = await Category.findById({ _id: newCategory._id })
            if (!isCreated) {
                return res.status(400).json({
                    message: "Category does not created"
                })
            }

            return res.status(201).json({
                message: "Category created successfully"
            })
        }
        else {
            return res.status(400).json({
                message: "You don't have permission to do this, Only admin can add new category"
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Server error while creating category"
        })
    }
})


router.get("/get-category", async (req, res) => {
    try {
        const categories = await Category.find({})

        if (!categories) {
            return res.status(400).json({
                message: "No category found"
            })
        }

        res.status(200).json({
            data: categories
        })
    } catch (error) {
        return res.status(500).json({
            message: "Server error while fetching category data"
        })
    }
})

router.delete("/delete-category", authenticationToken, async (req, res) => {
    try {
        const { name } = req.body
        if (req.user.role === "admin") {


            const categoryData = await Category.findOne({ name: name })

            if (!categoryData) {
                return res.status(400).json({
                    message: "Category does not exists"
                })
            }

            const deletedCategory = await Category.findByIdAndDelete(categoryData._id)

            if (!deletedCategory) {
                return res.status(400).json({
                    message: "Category does not deleted"
                })
            }

            res.status(200).json({
                message: "Category deleted successfully"
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error while deleting category"
        })
    }
})

module.exports = router