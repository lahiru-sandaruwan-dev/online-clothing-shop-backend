const express = require("express")
const ProductController = require("../controller/product.controller")

const ProductRoute = express.Router()

ProductRoute.post("/createProduct", ProductController.createProduct)
ProductRoute.get("/getProducts", ProductController.getAllProducts)
ProductRoute.get("/getProductById/:id", ProductController.getProductById)
ProductRoute.put("/updateProduct/:id", ProductController.updateProduct)
ProductRoute.delete("/deleteProduct/:id", ProductController.deleteProduct)

module.exports = ProductRoute