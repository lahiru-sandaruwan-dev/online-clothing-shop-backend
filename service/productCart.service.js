const ProductCart = require("../model/productCart.model")

const SaveProductCart = async (obj) => {
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

module.exports = {
    SaveProductCart,
    FindProductByName,
    FindByUserId,
    FindProductByNameAndUserId
}