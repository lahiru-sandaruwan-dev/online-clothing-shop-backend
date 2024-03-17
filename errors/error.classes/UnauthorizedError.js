const CustomApiError = require("./CustomApiError")
// import { StatusCodes } from "http-status-codes"
const {StatusCodes} = require("http-status-codes")


class UnauthorizedError extends CustomApiError {
    constructor(message){
        super(message);
        this.StatusCodes = StatusCodes.UNAUTHORIZED
    }
}

module.exports = UnauthorizedError