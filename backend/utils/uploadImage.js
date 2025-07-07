const { upload } = require("../middleware/multer.middleware")

const uploadImage = async (req, res, next) => {
    upload.single("bookImage")(req, res, function (err) {
        if (err) {
            return res.status(400).json({ message: err.message });
        }
        next()
    })
}

module.exports = { uploadImage }