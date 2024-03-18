// import { StatusCodes } from "http-status-codes"
const { StatusCodes } = require("http-status-codes");
const CustomAPIError = require("./CustomApiError");


class NotFoundError extends CustomAPIError {
    constructor(message){
        super(message);
        this.StatusCodes = StatusCodes.NOT_FOUND
    }
}

module.exports = NotFoundError