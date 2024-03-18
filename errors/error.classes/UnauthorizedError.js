// import { StatusCodes } from "http-status-codes"
const {StatusCodes} = require("http-status-codes");
const CustomAPIError = require("./CustomApiError");


class UnauthorizedError extends CustomAPIError {
    constructor(message){
        super(message);
        this.StatusCodes = StatusCodes.UNAUTHORIZED
    }
}

module.exports = UnauthorizedError