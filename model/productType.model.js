const mongoose = require("mongoose")

const ProductTypeSchema = mongoose.Schema({
    productTypeName: {
        type: String,
        required: [true, "Product type name is required!"]
    },

    description: {
        type: String,
    },

    categoryId: {
        type: String,
        required: [true, "Category is required!"]
    },

    productTypeStatus: {
        type: Number,
        default: 1
    }
},
    {
        timestamps: true,
        versionKey: false
    }
)

module.exports = mongoose.model("Product_Type", ProductTypeSchema)