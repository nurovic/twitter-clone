const express = require("express")
const helmet = require('helmet')
const config = require("./config/server")
const loaders = require('./loaders')
const { UsersRoutes } = require("./api-routes")

config()
loaders()
const app = express()

app.use(express.json())
app.use(helmet())

app.listen(process.env.APP_PORT || 3000, () => {
    console.log("app working...")
    app.use("/users", UsersRoutes)
})