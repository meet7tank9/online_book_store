const mongoose = require("mongoose")

const connectdb = async () => {
    try {
        const con = await mongoose.connect(`${process.env.MONGODB_URI}/book-store`)
        console.log("database connected");
    } catch (error) {
        console.log(error);
    }
}

connectdb()