const ProductCart = require("../model/productCart.model")

const SaveProductCart = async (obj) => {
    return await obj.save()
}

const UpdateProductCart = async (obj) => {
    return await obj.save()
}

const FindProductByName = async (productName) => {
    return await ProductCart.findOne({
        productName: productName
    })
}

const FindProductByNameAndUserId = async (productName, userId) => {
    return await ProductCart.findOne({
        productName: productName,
        userId: userId
    })
}

const FindByUserId = async (userId) => {
    return await ProductCart.find({
        userId: userId
    })
}

const FindById = async (id) => {
    return await ProductCart.findById(id)
}

const UpdateCart = async (userId, obj) => {
 return await ProductCart.findByIdAndUpdate(userId, obj)
}

const DeleteCartItem = async (id) => {
    return await ProductCart.findByIdAndDelete(id)
}

module.exports = {
    SaveProductCart,
    FindProductByName,
    FindByUserId,
    FindProductByNameAndUserId,
    UpdateCart,
    UpdateProductCart,
    DeleteCartItem,
    FindById
}