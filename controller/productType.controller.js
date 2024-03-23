const ProductType = require("../model/productType.model")
const Response = require("../utils/response")
const ProductTypeService = require("../service/productType.service")
const BadRequestError = require("../errors/error.classes/BadRequestError")
const { StatusCodes } = require("http-status-codes")
const NotFoundError = require("../errors/error.classes/NotFoundError")

//Save Product Type
const saveProductType = async (req, res) => {
    const body = req.body
    const newProductType = new ProductType(body)
    const existType = await ProductTypeService.FindByNameAndCategory(body.productTypeName, body.categoryId)

    if (existType) throw new BadRequestError("Product type can't be duplicate!")

    try {
        const createdProductType = await ProductTypeService.SaveType(newProductType)
        return Response(res, StatusCodes.OK, true, "Product type save successful!", createdProductType)
    } catch (error) {
        throw error
    }
}

const getProductType = async (req, res) => {
    const productTypes = await ProductTypeService.FindProductTypes()

    if (!productTypes) throw new NotFoundError("Product types not found!")

    return Response(res, StatusCodes.OK, true, "Success!", productTypes)
}

const getTypesById = async (req, res) => {
    const categoryId = req.params.categoryId

    const productType = await ProductTypeService.FindByCategoryId(categoryId)

    if (productType.length == 0) throw new NotFoundError("Product Types Not Found!")

    return Response(res, StatusCodes.OK, true, "Success!", productType)
}

const updateTypes = async (req, res) => {
    const productTypeId = req.params.productTypeId
    const body = req.body

    const hasProductType = await ProductTypeService.FindById(productTypeId)

    if (!hasProductType) throw new NotFoundError("Product Types Not Found!")

    try {
        hasProductType.productTypeName = body.productTypeName
        hasProductType.description = body.description
        hasProductType.categoryId = body.categoryId

        const updatedType = await ProductTypeService.FindByIdAndUpdate(productTypeId, hasProductType)
        return Response(res, StatusCodes.CREATED, true, "Updated Successful!", [])
    } catch (error) {
        throw error
    }
}

const deleteTypes = async (req, res) => {
    const productTypeId = req.params.productTypeId
    const hasProductType = await ProductTypeService.FindById(productTypeId)
    if (!hasProductType) throw new NotFoundError("Product Types Not Found!")

    const deletedType = await ProductTypeService.DeleteType(productTypeId)
    return Response(res, StatusCodes.OK, true, "Deleted Successful!", [])
}

module.exports = {
    saveProductType,
    getProductType,
    getTypesById,
    updateTypes,
    deleteTypes
}