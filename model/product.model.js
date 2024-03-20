const mongoose = require("mongoose")
const Constant = require("../constants")

const ProductSchema = mongoose.Schema({
    productName: {
        type: String,
        required: [true, "Product name is required!"]
    },
    description: {
        type: String,
    },
    ProductCategory: {
        type: String,
        required: [true, "Product category is required!"]
    },
    productType: {
        type: String,
        required: [true, "Product type is required!"]
    },
    productImage: {
        type: String,
        required: [true, "Product Image is required!"]
    },
    size: {
        type: String,
        required: [true, "Product size is required!"],
        enum: {
            values: [Constant.PRODUCT_SIZE.SMALL, Constant.PRODUCT_SIZE.MEDIUM, Constant.PRODUCT_SIZE.LARGE, Constant.PRODUCT_SIZE.EXTRA_LARGE, Constant.PRODUCT_SIZE.DOUBLE_EXCL],
        }
    },
    productPrice: {
        type: Number,
        required: [true, "Product price is required!"],
        maxlength: [5, "Product price is shouldn't exceed more than 5 digits!"]
    },
    availableQuantity: {
        type: Number,
        required: [true, "Product available qty is required!"],
    },
    productColor: {
        type: String
    },
    productStatus: {
        type: Number,
        default: 1
    }
},
    {
        timestamps: true,
        versionKey: false
    }
)

module.exports = mongoose.model("Product", ProductSchema)