const mongoose = require("mongoose")
const Constant = require("../constants")

const UserSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required!"],
        maxlength: [100, "First name is shouldn't exceed more than 100 characters!"]
    },
    lastName: {
        type: String,
        required: [true, "Last name is required!"],
        maxlength: [100, "First name is shouldn't exceed more than 100 characters!"]
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Email is required!"],
        validate: {
            validator: (value) => {
                return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)
            }
        }
    },
    picture: {
        type: String,
    },
    password: {
        type: String,
        required: [true, "Password is required!"],
    },
    role: {
        type: String,
        required: [true, "Role is required!"],
        enum: {
            values: [Constant.ROLE.ADMIN, Constant.ROLE.USER]
        }
    },
    userStatus: {
        type: Number,
        default: 1
    }
},
    {
        timestamps: true,
        versionKey: false
    }
)

module.exports = mongoose.model("User", UserSchema)