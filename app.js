require("dotenv").config()
const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const {errors} = require("celebrate")
const cors = require("cors")

const professionRoutes = require("./src/routes/profession")
const colorsRoutes = require("./src/routes/colors")
const vehicleRoutes = require("./src/routes/vehicle")
const workersRoutes = require("./src/routes/workers")

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(cors())

app.use("/profession",professionRoutes)
app.use("/colors",colorsRoutes)
app.use("/vehicle",vehicleRoutes)
app.use("/workers",workersRoutes)

app.use(errors())

module.exports = app