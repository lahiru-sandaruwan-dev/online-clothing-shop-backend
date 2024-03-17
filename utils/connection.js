const mongoose = require("mongoose")

const URL = process.env.MONGO_DB_URL

const Connection = () => {
    mongoose.connect(URL)
        .then(() => {
            console.log("Database Connected!")
        }).catch((err) => {
            console.log(`Database Connected Error ${err}`)
        })
}

module.exports = Connection