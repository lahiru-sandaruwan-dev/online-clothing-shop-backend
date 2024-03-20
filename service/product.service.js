const Product = require("../model/product.model")

const SaveProduct = async (obj) => {
    return await obj.save()
}

const FindProductByName = async (productName) => {
    return await Product.findOne({
        productName: productName
    })
}

const FindProductByNameAndStatus = async (productName, productStatus) => {
    return await Product.findOne({
        productName: productName,
        productStatus: productStatus
    })
}

const FindProductByStatus = async (productStatus) => {
    return await Product.find({
        productStatus: productStatus
    })
}

const GetAllProducts = async ()=> {
    return await Product.find()
}

const GetProductById = async (productId) => {
    return await Product.findById(productId)
}

module.exports = {
    SaveProduct,
    FindProductByName,
    FindProductByStatus,
    GetAllProducts,
    GetProductById,
    FindProductByNameAndStatus
}