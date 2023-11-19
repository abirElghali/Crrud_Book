const express = require("express")

const mongoose = require("mongoose")

const app = express()

const Author = require("./models/author")

//const ani = require("./models/animal");

const booksRoutes = require("./routes/book")
const authorsRoutes= require("./routes/author")
const categoryRoutes= require("./routes/category")

mongoose.connect(
    "mongodb://127.0.0.1:27017/Database",
    { useNewUrlParser: true,
     useUnifiedTopology: true
    }   
)
.then(() => console.log("Réussi"))
.catch(()=> console.log("echoué!!"))



app.use((req, res , next) => {
    res.setHeader("Access-Control-Allow-Origin","*")
    res.setHeader(
        "Access-Control-Allow-Headers" ,
        "Origin , X-Requested-With, Content, Accept ,Content- Type, Authorization" 
    )
    res.setHeader(
        "Access-Control-Allow-Methods" ,
        "GET , POST , PUT, DELETE , PUTCH, OPTIONS" 
    )
    next()
})



app.use(express.json())



app.use("/api/books", booksRoutes)
app.use("/api/author", authorsRoutes)
app.use("/api/category", categoryRoutes)

module.exports = app