const CustomApiError = require("./CustomApiError")
// import { StatusCodes } from "http-status-codes"
const {StatusCodes} = require("http-status-codes")


class BadRequestError extends CustomApiError {
    constructor(message){
        super(message);
        this.StatusCodes = StatusCodes.BAD_REQUEST
    }
}

module.exports = BadRequestError