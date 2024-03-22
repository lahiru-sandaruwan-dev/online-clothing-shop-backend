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

module.exports = {
    SaveType,
    FindByName,
    FindByCategoryId,
    FindByNameAndCategory
}