const ProductCart = require("../model/productCart.model")
const Response = require("../utils/response")
const Product = require("../model/product.model")
const ProductService = require("../service/product.service")
const ProductCartService = require("../service/productCart.service")
const { StatusCodes } = require("http-status-codes")
const BadRequestError = require("../errors/error.classes/BadRequestError")
const NotFoundError = require("../errors/error.classes/NotFoundError")

const saveCart = async (req, res) => {
    const body = req.body
    const productCart = new ProductCart(body)
    const existProduct = await ProductService.FindProductByNameAndStatus(body.productName, 1)
    const hasProductInCart = await ProductCartService.FindProductByNameAndUserId(body.productName, body.userId)

    if (hasProductInCart) throw new BadRequestError("Product already added to the cart!")

    if (existProduct) {
        productCart.productName = body.productName,
            productCart.availableQuantity = existProduct.availableQuantity,
            productCart.productPrice = existProduct.productPrice,
            productCart.totalPrice = (body.requestedQuantity * existProduct.productPrice),
            productCart.productImage = existProduct.productImage

        console.log(productCart)

        const addToCart = await ProductCartService.SaveProductCart(productCart)
        return Response(res, StatusCodes.CREATED, true, "Add Product to the cart!", addToCart)
    } else {
        throw new NotFoundError("Product not Found!")
    }
}

const getCartDetailsByUserId = async (req, res) => {
    const userId = req.params.userId
    const productsDetailsInCart = await ProductCartService.FindByUserId(userId)

    if (!productsDetailsInCart) throw new NotFoundError("Cart is Empty!")

    return Response(res, StatusCodes.OK, true, "Success!", productsDetailsInCart)
}

module.exports = {
    saveCart,
    getCartDetailsByUserId
}