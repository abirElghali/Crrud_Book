const express = require("express")
const mongoose = require("mongoose")
const app = express()
const Author = require("./models/author")

const booksRoutes = require("./routes/book")
const authorsRoutes= require("./routes/author")
const categoryRoutes= require("./routes/category")
const userRoutes = require("./routes/user")
const swaggerJSDoc = require("swagger-jsdoc")

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

const options = {
    definition: {
        openapi: "3.0.0",
        info : {
            title: "Todos Express API with Swagger",
            version: "0.1.0",
            description: "This is a simple CRUD",
            contact: {
                name : "Elghali Abir",
                url:"",
                email:"",
            },
        },
        servers: [
            {
                url: "http://localhost:5000/api",
                description:"Development server",
            },
        ],
        components: {
            responses: {
              200: {
                description: "Success",
              },
              400: {
                description: "Bad request. You may need to verify your information.",
              },
              401: {
                description: "Unauthorized request, you need additional privileges",
              },
              403: {
                description:
                  "Forbidden request, you must login first. See /auth/login",
              },
              404: {
                description: "Object not found",
              },
              422: {
                description:
                  "Unprocessable entry error, the request is valid but the server refused to process it",
              },
              500: {
                description: "Unexpected error, maybe try again later",
              },
            },
      
            securitySchemes: {
              bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
              },
            },
          },
          security: [
            {
              bearerAuth: [],
            },
          ],
    },
    apis: ["./routes/*.js"],

}
const swaggerJsdoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")

const specs = swaggerJsdoc(options)
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs, {explorer: true})
)

app.use("/api/books", booksRoutes)
app.use("/api/author", authorsRoutes)
app.use("/api/category", categoryRoutes)
app.use("/api/auth", userRoutes)

module.exports = app