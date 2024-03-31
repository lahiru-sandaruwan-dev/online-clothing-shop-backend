const order = require("../model/order.model")

const SaveOrder = async (obj) => {
    return await obj.save()
}

module.exports = {
    SaveOrder
}
