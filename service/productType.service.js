const ProductType = require("../model/productType.model")

const SaveType = async (obj) => {
    return await obj.save()
}

const FindByName = async (productTypeName) => {
    return await ProductType.findOne({
        productTypeName: productTypeName
    })
}

const FindByCategoryId = async (categoryId) => {
    return await ProductType.find({
        categoryId: categoryId
    })
}

const FindByNameAndCategory = async (productTypeName, categoryId) => {
    return await ProductType.findOne({
        productTypeName: productTypeName,
        categoryId: categoryId
    })
}

const FindProductTypes = async () => {
    return await ProductType.find()
}

const FindById = async (productTypeId) => {
    return await ProductType.findById(productTypeId)
}

const FindByIdAndUpdate = async (productTypeId, body) => {
    return await ProductType.findByIdAndUpdate(productTypeId, body)
}

const DeleteType = async (productTypeId) => {
    return await ProductType.findByIdAndDelete(productTypeId)
}


module.exports = {
    SaveType,
    FindByName,
    FindByCategoryId,
    FindByNameAndCategory,
    FindProductTypes,
    FindById,
    FindByIdAndUpdate,
    DeleteType
}