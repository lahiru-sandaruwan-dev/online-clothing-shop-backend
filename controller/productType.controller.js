const ProductType = require("../model/productType.model")
const Response = require("../utils/response")
const ProductTypeService = require("../service/productType.service")
const BadRequestError = require("../errors/error.classes/BadRequestError")
const { StatusCodes } = require("http-status-codes")

//Save Product Type
const saveProductType = async (req, res) => {
    const body = req.body
    const newProductType = new ProductType(body)
    const existType = await ProductTypeService.FindByNameAndCategory(body.productTypeName, body.categoryId)
    console.log(existType)

    if (existType) throw new BadRequestError("Product type can't be duplicate!")

    try {
        const createdProductType = await ProductTypeService.SaveType(newProductType)
        return Response(res, StatusCodes.OK, true, "Product type save successful!", createdProductType)
    } catch (error) {
        throw error
    }
}

module.exports = {
    saveProductType
}