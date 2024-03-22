const express = require("express")
const ProductCategoryController = require("../controller/productCategory.controller")

const ProductCategoryRoute = express.Router()

ProductCategoryRoute.post("/createCategory", ProductCategoryController.saveCategory)
ProductCategoryRoute.get("/getCategory", ProductCategoryController.getAllActiveCategory)
ProductCategoryRoute.get("/getCategoryById/categoryId=:categoryId", ProductCategoryController.getCategoryById)
ProductCategoryRoute.put("/updateCategory/categoryId=:categoryId", ProductCategoryController.updateCategory)
ProductCategoryRoute.delete("/deleteCategory/categoryId=:categoryId", ProductCategoryController.deleteCategory)

module.exports = ProductCategoryRoute