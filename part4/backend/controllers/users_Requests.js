const bcrypt = require("bcryptjs")
const usersRouter = require("express").Router()
const User = require("../models/users")


// Uuden käyttäjän luominen
usersRouter.post("/", async(request, response) => {
    const {username, name, password} = request.body

    //Salasanan hashaaminen

    const passwordHash = await bcrypt.hash(password, 10)

    const user = new User({username, name, passwordHash})

    const saveUser = await user.save()
    response.status(201).json(saveUser)
})

// Kaikkien käyttäjien hakeminen

usersRouter.get("/", async (request, response) => {
    const users = await User.find({}).populate("blogs", {title:1, url:1})
    response.json(users)
})

module.exports = usersRouter