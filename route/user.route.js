const express = require("express")
const UserController = require("../controller/user.controller")
const UserRoute = express.Router()

UserRoute.get("/getUsers", UserController.getUsers)
UserRoute.post("/create", UserController.createUser)
UserRoute.put("/update/:id", UserController.updateUser)
UserRoute.delete("/deleteUser/:id", UserController.deleteUser)
UserRoute.post("/login", UserController.userLogin)

module.exports = UserRoute