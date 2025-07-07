const multer = require("multer")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, './public/temp')
    },
    filename: function (req, file, cb) {
        const uniqueName = `${Date.now()}-${file.originalname}`
        return cb(null, uniqueName)

        // let splittedName = file.originalname.split(".")
        // let extension = splittedName[splittedName.length - 1]
        // if (["jpg", "png", "jpeg"].includes(extension))
        //     return cb(null, uniqueName)
        // else {
        //     // console.log("not image");
        //     // return cb("Only image files (jpg, jpeg, png) are allowed")
        //     cb(new Error("Only image files (jpg, jpeg, png) are allowed"));
        // }
    }
})
const upload = multer({ storage: storage })

module.exports = { upload }