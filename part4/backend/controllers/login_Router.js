const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const loginRouter = require("express").Router()
const User = require("../models/users")
require('dotenv').config()

// Kirjautumisen reititys

loginRouter.post("/", async(request, response) =>{
    const {username, password} = request.body

    const user = await User.findOne({username})

    const correctPassword = user && await bcrypt.compare(password, user.passwordHash)

    if(!correctPassword){
        return response.status(401).json({error: "Wrong username or password"})

    }

    // Token

    const userToken = {
        username: user.username,
        id: user._id
    }

    const token = jwt.sign(userToken, process.env.SECRET, {expiresIn: "1h"})

    response.status(200).send({
        token,
        username: user.username,
        name: user.name
    })
})

module.exports = loginRouter