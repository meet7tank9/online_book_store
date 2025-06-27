// import multer from "multer"
const multer = require("multer")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, './public/temp')
    },
    filename: function (req, file, cb) {
        const uniqueName = `${Date.now()}-${file.originalname}`
        return cb(null, uniqueName)
    }
})
const upload = multer({ storage: storage })

module.exports = { upload }