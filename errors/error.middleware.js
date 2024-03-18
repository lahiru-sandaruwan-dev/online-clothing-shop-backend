const { StatusCodes } = require("http-status-codes")
const Response = require("../utils/response")
const { model } = require("mongoose")

const errorHandleMiddleware = async (err, req, res, next) => {
    // console.log(err.StatusCodes)
    if (err.StatusCodes == StatusCodes.NOT_FOUND) {
        return Response(res, StatusCodes.NOT_FOUND, false, err.message, null)
    }
    if (err.StatusCodes == StatusCodes.UNAUTHORIZED) {
        return Response(res, StatusCodes.UNAUTHORIZED, false, err.message, null)
    }
    if (err.StatusCodes == StatusCodes.FORBIDDEN) {
        return Response(res, StatusCodes.FORBIDDEN, false, err.message, null)
    }
    if (err.StatusCodes == StatusCodes.BAD_REQUEST) {
        return Response(res, StatusCodes.BAD_REQUEST, false, err.message, null)
    }
    if (err.name == "ValidationError") {
        let validatorKeyValuePairs = {}

        Object.keys(err.errors).forEach((key) => {
            validatorKeyValuePairs[key] = err.errors[key].message
        })

        // console.log(validatorKeyValuePairs)
        return Response(res, StatusCodes.BAD_REQUEST, false, "Data Validation Errors", validatorKeyValuePairs)
    }
    // Handle mongoDb Duplicate value errors
    if (err.code && err.code === 11000) {
        return Response(res, StatusCodes.BAD_REQUEST, false, `${Object.keys(err.keyValue)} already exists! Please choose another value`, {})
    }
    // Handle mongoDb Cast Errors
    if (err.name === "CastError") {
        return Response(res, StatusCodes.BAD_REQUEST, false, `No Item found with ID "${err.value}"!`, {})
    }
}

module.exports = errorHandleMiddleware
