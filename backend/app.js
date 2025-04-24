const express = require("express")
require("dotenv").config();
const connect = require("./connection/connectdb.js")
const cors = require("cors")
const user = require("./routes/user.routes.js")
const book = require("./routes/book.routes.js")
const favourite = require("./routes/favourite.routes.js")
const cart = require("./routes/cart.routes.js")
const order = require("./routes/order.routes.js")
const rating = require("./routes/rating.routes.js")


const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",
    // methods: "GET, POST, PUT, DELETE",
    // allowedHeaders: 'Content-Type,Authorization',
    // credentials: true, // Allow cookies
}))

app.use("/api/v1/user", user)
app.use("/api/v1/book", book)
app.use("/api/v1/favourite", favourite)
app.use("/api/v1/cart", cart)
app.use("/api/v1/order", order)
app.use("/api/v1/rating", rating)
    
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`server running on ${port}`);
})