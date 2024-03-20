const express = require("express")
const ProductCartRoute = express.Router()
const ProductCartController = require("../controller/productCart.controller")

ProductCartRoute.post("/saveCart", ProductCartController.saveCart)
ProductCartRoute.get("/getCartDetailsById/:userId", ProductCartController.getCartDetailsByUserId)

module.exports = ProductCartRoute