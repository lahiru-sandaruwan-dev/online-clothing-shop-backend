const CustomApiError = require("./CustomApiError")
// import { StatusCodes } from "http-status-codes"
const {StatusCodes} = require("http-status-codes")


class ForbiddenError extends CustomApiError {
    constructor(message){
        super(message);
        this.StatusCodes = StatusCodes.FORBIDDEN
    }
}

module.exports = ForbiddenError