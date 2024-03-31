const Order = require("../model/order.model")
const Response = require("../utils/response")
const { StatusCodes } = require("http-status-codes")
const helperUtil = require("../utils/helperUtil")
const NotFoundError = require("../errors/error.classes/NotFoundError")
const OdrderService = require("../service/order.service")

const createOrder = async (req, res) => {
    const body = req.body
    const newOrder = new Order(body)

    try {
        const createOrder = await OdrderService.SaveOrder(newOrder)
        return Response(res, StatusCodes.CREATED, true, "Order Saved Successful!", [createOrder])
    } catch (err) {
        throw err
    }
}

module.exports = {
    createOrder
}
