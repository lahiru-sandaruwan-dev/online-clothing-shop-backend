const ProductCart = require("../model/productCart.model")
const Response = require("../utils/response")
const Product = require("../model/product.model")
const ProductService = require("../service/product.service")
const ProductCartService = require("../service/productCart.service")
const { StatusCodes } = require("http-status-codes")
const BadRequestError = require("../errors/error.classes/BadRequestError")
const NotFoundError = require("../errors/error.classes/NotFoundError")
const productCartModel = require("../model/productCart.model")

//Add Item to cart
const saveCart = async (req, res) => {
    const body = req.body
    const productCart = new ProductCart(body)
    const existProduct = await ProductService.FindProductByNameAndStatus(body.productName, 1)
    const hasProductInCart = await ProductCartService.FindProductByNameAndUserId(body.productName, body.userId)

    if (hasProductInCart) throw new BadRequestError("Product already added to the cart!")

    if (existProduct) {
        try {
            productCart.productName = body.productName
            productCart.availableQuantity = existProduct.availableQuantity
            productCart.productPrice = existProduct.productPrice
            productCart.totalPrice = (body.requestedQuantity * existProduct.productPrice)
            productCart.productImage = existProduct.productImage

            const addToCart = await ProductCartService.SaveProductCart(productCart)
            return Response(res, StatusCodes.CREATED, true, "Product added to the cart!", addToCart)
        } catch (error) {
            throw error
        }
    } else {
        throw new NotFoundError("Product not Found!")
    }
}

//Get items in cart
const getCartDetailsByUserId = async (req, res) => {
    const userId = req.params.userId
    const productsDetailsInCart = await ProductCartService.FindByUserId(userId)

    if (!productsDetailsInCart) throw new NotFoundError("Cart is empty!")

    return Response(res, StatusCodes.OK, true, "Success!", productsDetailsInCart)
}

//Update cart items (one by one)
const updateCart = async (req, res) => {
    const userId = req.params.userId
    const body = req.body

    const productExist = await ProductCartService.FindProductByNameAndUserId(body.productName, userId)

    if (!productExist) throw new NotFoundError("Item not found!")

    try {
        productExist.requestedQuantity = body.requestedQuantity
        productExist.color = body.color
        productExist.totalPrice = (productExist.productPrice * body.requestedQuantity)

        // const updatedCartItem = await ProductCartService.UpdateCart(userId, productExist)
        const updatedCartItem = await ProductCartService.UpdateProductCart(productExist)

        return Response(res, StatusCodes.CREATED, true, "Updated Successful!", updatedCartItem)
    } catch (error) {
        throw error
    }
}

//Delete cart items (one by one)
const deleteCartProduct = async (req, res) => {
    const productId = req.params.id

    const existProductInCart = await ProductCartService.FindById(productId)

    if (!existProductInCart) throw new NotFoundError("Item not found!")

    const deletedProductInCart = await ProductCartService.DeleteCartItem(productId)
    return Response(res, StatusCodes.OK, true, "Deleted Successful!", deletedProductInCart)

}

module.exports = {
    saveCart,
    getCartDetailsByUserId,
    updateCart,
    deleteCartProduct
}