const express = require("express")
const ProductTypeController = require("../controller/productType.controller")

const ProductTypeRoute = express.Router()

ProductTypeRoute.post("/createProductType", ProductTypeController.saveProductType)
ProductTypeRoute.get("/getTypes", ProductTypeController.getProductType)
ProductTypeRoute.get("/getTypes/categoryId=:categoryId", ProductTypeController.getTypesById)
ProductTypeRoute.put("/updateType/productTypeId=:productTypeId", ProductTypeController.updateTypes)
ProductTypeRoute.delete("/deleteType/productTypeId=:productTypeId", ProductTypeController.deleteTypes)

module.exports = ProductTypeRoute