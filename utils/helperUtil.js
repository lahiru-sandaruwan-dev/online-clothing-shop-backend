const JWT = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const SECRET = process.env.JWT_SECRET
const SALT = process.env.GEN_SALT

const getEncryptedPassword = async (password) => {
    const salt = await bcrypt.genSalt(Number(SALT))
    return await bcrypt.hash(password, salt)
}

const comparePassword = async (password, encryptedPassword) => {
    return await bcrypt.compare(password, encryptedPassword)
}

const signToken = async (payload) => {
    const maxAge = 60 * 60 * 24 //one day
    return await JWT.sign(payload, SECRET, {
        expiresIn: maxAge
    })
}

module.exports = {
    getEncryptedPassword,
    comparePassword,
    signToken
}