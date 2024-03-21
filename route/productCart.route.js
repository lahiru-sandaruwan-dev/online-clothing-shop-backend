const express = require("express")
const ProductCartRoute = express.Router()
const ProductCartController = require("../controller/productCart.controller")

ProductCartRoute.post("/saveCart", ProductCartController.saveCart)
ProductCartRoute.get("/getCartDetailsById/userId=:userId", ProductCartController.getCartDetailsByUserId)
ProductCartRoute.put("/updateCart/userId=:userId" , ProductCartController.updateCart)
ProductCartRoute.delete("/deleteCartItems/productId=:id", ProductCartController.deleteCartProduct)

module.exports = ProductCartRoute