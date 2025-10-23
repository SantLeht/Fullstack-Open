const express = require("express")
const Config = require("./utils/config")
const Router = require("./controllers/handleRequests")

const app = express()
app.use(express.json())
app.use("/api/blogs", Router)
module.exports = app