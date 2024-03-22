const mongoose = require("mongoose")

const ProductCategorySchema = mongoose.Schema({
    categoryName: {
        type: String,
        required: [true, "Category name is required!"]
    },

    description: {
        type: String
    },

    categoryStatus: {
        type: Number,
        default: 1
    }

},
    {
        timestamps: true,
        versionKey: false
    }
)

module.exports = mongoose.model("Category", ProductCategorySchema)