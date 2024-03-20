const mongoose = require("mongoose")
const Constant = require("../constants")

const ProductCart = mongoose.Schema({
    productName: {
        type: String,
        required: [true, "Product Name is required!"]
    },

    size: {
        type: String,
        required: [true, "Product size is required!"],
        enum: {
            values: [Constant.PRODUCT_SIZE.SMALL, Constant.PRODUCT_SIZE.MEDIUM, Constant.PRODUCT_SIZE.LARGE, Constant.PRODUCT_SIZE.EXTRA_LARGE, Constant.PRODUCT_SIZE.DOUBLE_EXCL]
        }
    },

    productPrice: {
        type: Number
    },

    availableQuantity: {
        type: Number
    },

    requestedQuantity: {
        type: Number,
        required: [true, "Requested quantity is required!"]
    },

    totalPrice: {
        type: Number,
    },

    color: {
        type: String,
        required: [true, "Select product color!"]
    },

    productImage: {
        type: String,
    },

    userId: {
        type: String,
        required: [true, "User Id is required!"]
    },

    UserName: {
        type: String
    }
},
    {
        timestamps: true,
        versionKey: false
    }
)

module.exports = mongoose.model("Product_Cart", ProductCart)