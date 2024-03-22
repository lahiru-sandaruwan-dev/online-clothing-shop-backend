const Category = require("../model/productCategory.model")

const SaveCategory = async (obj) => {
    return await obj.save()
}

const FindByName = async (categoryName) => {
    return await Category.findOne({
        categoryName: categoryName
    })
}

const FindByStatus = async (status) => {
    return await Category.find({
        categoryStatus: status
    })
}

const FindById = async (categoryId) => {
    return await Category.findById(categoryId)
}

const FindByIdAndUpdate = async(categoryId, obj) => {
    return await Category.findByIdAndUpdate(categoryId, obj)
}

module.exports = {
    SaveCategory,
    FindByName,
    FindByStatus,
    FindById,
    FindByIdAndUpdate
}