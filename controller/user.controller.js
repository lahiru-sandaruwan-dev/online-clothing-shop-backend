const BadRequestError = require("../errors/error.classes/BadRequestError")
const User = require("../model/user.model")
const userService = require("../service/user.service")
const Response = require("../utils/response")
const { StatusCodes } = require("http-status-codes")
const helperUtil = require("../utils/helperUtil")
const NotFoundError = require("../errors/error.classes/NotFoundError")


//Save User
const createUser = async (req, res) => {
    const body = req.body
    const newUser = new User(body)
    const isUserExist = await userService.FindByEmail(body.email)
    if (isUserExist) {
        throw new BadRequestError("Email already exist!")
    }
    const encryptedPassword = await helperUtil.getEncryptedPassword(body.password)
    newUser.password = encryptedPassword
    try {
        const createdUser = await userService.SaveUser(newUser)
        return Response(res, StatusCodes.CREATED, true, "User Created!", createdUser)
    } catch (err) {
        throw err
    }
}

//View users
const getUsers = async (req, res) => {
    const allUsers = await userService.FindByUserStatus({ userStatus: 1 })
    return Response(res, StatusCodes.OK, true, "Successful!", allUsers)
}

//Update User
const updateUser = async (req, res) => {
    const body = req.body
    const userId = req.params.id
    const user = await userService.FindById(userId)

    // const deletedUser = await userService.FindByUserStatus({userStatus: 3})
    // const deletedUser = await userService.FindUserByStatus(user.userStatus)
    // deletedUser.forEach((element) => {
    //     if(element.password == 3){
    //         throw new BadRequestError("Cannot update.User Already Deleted.Check ID again..!")
    //     }
    // });

    if (user) {
        user.firstName = body.firstName
        user.lastName = body.lastName

        const updatedUser = await userService.UpdateUser(user)
        return Response(res, StatusCodes.CREATED, true, "User Updated!", updatedUser)
    } else {
        return Response(res, StatusCodes.NOT_FOUND, false, "User Not Found!", [])
    }

}

//Delete User
const deleteUser = async (req, res) => {
    const userId = req.params.id
    const userExist = await userService.FindById(userId)
    if (userExist) {
        const DeletedUser = await userService.DeleteUser(userId, {
            userStatus: 3
        })
        return Response(res, StatusCodes.OK, true, "User Deleted!", [])
    } else {
        return Response(res, StatusCodes.NOT_FOUND, true, "User Not Found!", [])
    }
}

//User login
const userLogin = async (req, res) => {
    const body = req.body
    const user = await userService.FindByEmail(body.email)

    if (!user) throw new NotFoundError("User Not Found!")

    const isPasswordMatch = await helperUtil.comparePassword(body.password, user.password)

    if (!isPasswordMatch) throw new NotFoundError("Invalid Password!")

    let payload = {
        id: user._id,
        role: user.role
    }
    const token = await helperUtil.signToken(payload)
    return Response(res, StatusCodes.OK, true, "Login Successful!", {
        token: token,
        role: user.role
    })
}

module.exports = {
    createUser,
    getUsers,
    updateUser,
    deleteUser,
    userLogin
}