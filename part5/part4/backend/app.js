const express = require("express")
const Config = require("./utils/config")
const Router = require("./controllers/handleRequests")
const userRouter = require("./controllers/users_Requests")
const loginRouter = require("./controllers/login_Router")
const Middleware = require("./utils/middleware")
const cors = require ("cors")

const app = express()
app.use(cors())
app.use(express.json())


app.use("/api/users", userRouter)
app.use("/api/login", loginRouter)


app.use(Middleware.JWTToken1)
app.use(Middleware.JWTToken2)

app.use("/api/blogs", Router)

module.exports = app