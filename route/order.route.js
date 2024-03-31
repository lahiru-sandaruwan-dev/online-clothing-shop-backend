const express = require("express")

const OrderController = require("../controller/order.controller")

const OrderRoute = express.Router()

OrderRoute.post("/saveOrder", OrderController.createOrder)

module.exports = OrderRoute
