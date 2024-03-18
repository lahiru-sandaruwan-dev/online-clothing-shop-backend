// import { StatusCodes } from "http-status-codes"
const {StatusCodes} = require("http-status-codes");
const CustomAPIError = require("./CustomApiError");


class ForbiddenError extends CustomAPIError {
    constructor(message){
        super(message);
        this.StatusCodes = StatusCodes.FORBIDDEN
    }
}

module.exports = ForbiddenError