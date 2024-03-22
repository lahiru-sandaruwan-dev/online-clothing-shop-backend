const express = require("express")
const ProductTypeController = require("../controller/productType.controller")

const ProductTypeRoute = express.Router()

ProductTypeRoute.post("/createProductType", ProductTypeController.saveProductType)

module.exports = ProductTypeRoute