const express = require("express")
const Constant = require("./constants")
require("dotenv").config()
const cors = require("cors")
const mongoose = require("mongoose")

const app = express()

app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 5000

//import routes
const UserRoute = require("./route/user.route")
const Connection = require("./utils/connection")
const errorHandleMiddleware = require("./errors/error.middleware")

//use routes
app.use(Constant.API.PREFIX.concat("/user"), UserRoute)
app.use(errorHandleMiddleware)

mongoose.set("strictQuery", true)


app.listen(PORT , () => {
    console.log(`Server is listing on port: ${PORT}`)
    Connection()
})