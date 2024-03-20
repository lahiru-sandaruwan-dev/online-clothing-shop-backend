const { StatusCodes } = require("http-status-codes")
const BadRequestError = require("../errors/error.classes/BadRequestError")
const Product = require("../model/product.model")
const productService = require("../service/product.service")
const Response = require("../utils/response")
const NotFoundError = require("../errors/error.classes/NotFoundError")

//Save Product
const createProduct = async (req, res) => {
    const body = req.body
    const newProduct = new Product(body)
    const isProductExist = await productService.FindProductByName(body.productName)

    if (isProductExist) throw new BadRequestError("Product cannot be duplicate!")

    try {
        const createProduct = await productService.SaveProduct(newProduct)
        return Response(res, StatusCodes.CREATED, true, "Product Created Successful!", createProduct)
    } catch (err) {
        throw err
    }
}

//Get All Active Products
const getAllProducts = async (req, res) => {
    const allActiveProducts = await productService.FindProductByStatus(1)
    // const allActiveProducts = await productService.GetAllProducts()
    return Response(res, StatusCodes.OK, true, "Successful!", allActiveProducts)
}

//Get Product By Id
const getProductById = async (req, res) => {
    const productId = req.params.id
    const product = await productService.GetProductById(productId)
    // if(!product) throw new NotFoundError("Product Not Found!")
    return Response(res, StatusCodes.OK, true, "Successful!", product)
}

//Update Product
const updateProduct = async (req, res) => {
    const productId = req.params.id
    const body = req.body
    const product = await productService.GetProductById(productId)

    if (product) {

        if(product.productStatus == 3){
            throw new BadRequestError("Product is already deleted!")
        }

        product.productName = body.productName,
            product.description = body.description,
            product.ProductCategory = body.ProductCategory,
            product.productType = body.productType,
            product.productImage = body.productImage,
            product.size = body.size,
            product.productPrice = body.productPrice,
            product.availableQuantity = body.availableQuantity,
            product.productColor = body.productColor

        const updateProduct = await productService.SaveProduct(product)
        return Response(res, StatusCodes.CREATED, true, "Product Updated Successful!", updateProduct)
    } else {
        throw new BadRequestError("Updated Failed!")
    }
}

const deleteProduct = async (req, res) => {
    const productId = req.params.id

    const product = await productService.GetProductById(productId)

    if (product) {
        product.productStatus = 3

        const updatedProduct = await productService.SaveProduct(product)
        return Response(res, StatusCodes.OK, "Product Deleted Successful!", updatedProduct)
    } else {
        throw new NotFoundError("Product Not Found!")
    }
}

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
}