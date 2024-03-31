const mongoose = require("mongoose")

const OrderSchema = mongoose.Schema({
    headerDetails: {
        customerName: {
            type: String
        },
        address:{
            type: String
        },
        mobile: {
            type: Number
        },
        Email: {
            type: String
        }
    },
    ItemDetails:[
        {
            itemName: {
                type: String
            },
            itemQuantity: {
                type: Number
            },
            itemPrice: {
                type: Number
            }
        }
    ]
        
    
}, {
    timestamps : true,
    versionKey: false
})

module.exports = mongoose.model("Order", OrderSchema)
