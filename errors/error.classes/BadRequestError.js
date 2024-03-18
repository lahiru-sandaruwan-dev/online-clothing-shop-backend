// import { StatusCodes } from "http-status-codes"
const {StatusCodes} = require("http-status-codes");
const CustomAPIError = require("./CustomApiError");


class BadRequestError extends CustomAPIError {
    constructor(message){
        super(message);
        this.StatusCodes = StatusCodes.BAD_REQUEST
    }
}

module.exports = BadRequestError