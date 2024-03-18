const User = require("../model/user.model")

const SaveUser = async (obj) => {
    return obj.save()
}

const FindByEmail = async (email) => {
    return await User.findOne({
        email: email
    })
}

const FindById = async (id) => {
    return await User.findById(id)
}

const FindUsers = async () => {
    return await User.find()
}

const UpdateUser = async (obj) => {
    // return await User.findByIdAndUpdate(id, obj)
    return await obj.save()
}

const DeleteUser = async (id, obj) => {
    return await User.findByIdAndUpdate(id, obj)
}

const FindByUserStatus = async (obj) => {
    return await User.find(obj)
}

const FindUserByStatus = async (status) => {
    return await User.findOne({
        userStatus: status
    })
}

module.exports = {
    SaveUser,
    FindByEmail,
    FindUsers,
    UpdateUser,
    FindById,
    DeleteUser,
    FindByUserStatus,
    FindUserByStatus
}