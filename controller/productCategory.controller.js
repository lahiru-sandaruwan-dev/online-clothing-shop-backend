const Response = require("../utils/response")
const ProductCategoryService = require("../service/productCategory.service")
const BadRequestError = require("../errors/error.classes/BadRequestError")
const Category = require("../model/productCategory.model")
const { StatusCodes } = require("http-status-codes")
const NotFoundError = require("../errors/error.classes/NotFoundError")


//Save Category
const saveCategory = async (req, res) => {
    const body = req.body
    const newCategory = new Category(body)

    const existCategory = await ProductCategoryService.FindByName(body.categoryName)

    if (existCategory) throw new BadRequestError("Category already exist!")

    try {
        const createdCategory = await ProductCategoryService.SaveCategory(newCategory)
        return Response(res, StatusCodes.CREATED, true, "Category Save Successful!", createdCategory)
    } catch (error) {
        throw error
    }
}

//View Category
const getAllActiveCategory = async (req, res) => {
    const allActiveCategory = await ProductCategoryService.FindByStatus(1)
    if (!allActiveCategory) throw new NotFoundError("Category Not Found!")

    try {
        return Response(res, StatusCodes.OK, true, "Success!", allActiveCategory)
    } catch (error) {
        throw error
    }
}

//View Category by ID 
const getCategoryById = async (req, res) => {
    const categoryId = req.params.categoryId

    const existCategory = await ProductCategoryService.FindById(categoryId)
    if (!existCategory) throw new NotFoundError("Category Not Found!")

    return Response(res, StatusCodes.OK, true, "Success!", existCategory)
}

//Update Category
const updateCategory = async (req, res) => {
    const body = req.body
    const categoryId = req.params.categoryId

    const existCategory = await ProductCategoryService.FindById(categoryId)
    if (!existCategory) throw new NotFoundError("Category Not Found!")

    existCategory.categoryName = body.categoryName
    existCategory.description = body.description

    const existCategoryName = await ProductCategoryService.FindByName(existCategory.categoryName)
    if (existCategoryName._id != categoryId) throw new BadRequestError("Category name can't be duplicate!")

    try {
        const updatedCategory = await ProductCategoryService.SaveCategory(existCategory)
        return Response(res, StatusCodes.CREATED, true, "Category Update Successful!", updatedCategory)
    } catch (error) {
        throw error
    }

}

//Delete category
const deleteCategory = async (req, res) => {
    const categoryId = req.params.categoryId
    const existCategory = await ProductCategoryService.FindById(categoryId)
    if (!existCategory) throw new NotFoundError("Category Not Found!")

    try {
        const deletedCategory = await ProductCategoryService.FindByIdAndUpdate(categoryId, {
            categoryStatus: 3
        })
        if (!deletedCategory) throw new BadRequestError("Delete Fail!")

        return Response(res, StatusCodes.OK, true, "Category Delete Successful!", [])
    } catch (error) {
        throw error
    }
}

module.exports = {
    saveCategory,
    getAllActiveCategory,
    updateCategory,
    deleteCategory,
    getCategoryById
}