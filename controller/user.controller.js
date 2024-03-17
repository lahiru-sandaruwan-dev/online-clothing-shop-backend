const BadRequestError = require("../errors/error.classes/BadRequestError")
const User = require("../model/user.model")
const userService = require("../service/user.service")
const Response = require("../utils/response")
const { statusCodes } = require("http-status-codes")

const createUser = async (req, res) => {
    const body = req.body
    const newUser = new User(body)

    const isUserExist = await userService.FindByEmail(body.email)

    if(isUserExist){
        // throw new BadRequestError("Email already exist!")
        return Response(res, 400, true, "Email already exist!", [])

    }

    if (newUser) {
        const createdUser = await userService.SaveUser(newUser)

        return Response(res, 201, true, "User Created!", createdUser)

    } else {
        console.log("Not Found")
    }
    console.log(newUser)
}

const getUsers = async (req, res) => {
    // const allUsers = await userService.FindUsers()
    const allUsers = await userService.FindByUserStatus({ userStatus: 1 })
    console.log(allUsers)
    return Response(res, 200, true, "Successful!", allUsers)
}

const updateUser = async (req, res) => {
    const body = req.body
    const userId = req.params.id

    const user = await userService.FindById(userId)

    if (user) {
        user.firstName = body.firstName

        const updatedUser = await userService.UpdateUser(user)
        console.log(updatedUser)

        return Response(res, 200, true, "User Updated!", updatedUser)

    } else {
        return Response(res, 400, false, "User Not Found!", [])
    }

}

const deleteUser = async (req, res) => {
    const userId = req.params.id

    const userExist = await userService.FindById(userId)

    if (userExist) {
        const DeletedUser = await userService.DeleteUser(userId, {
            userStatus: 3
        })

        return Response(res, 200, true, "User Deleted!", [])
    } else {
        return Response(res, 400, true, "User Not Found!", [])
    }

}

module.exports = {
    createUser,
    getUsers,
    updateUser,
    deleteUser
}