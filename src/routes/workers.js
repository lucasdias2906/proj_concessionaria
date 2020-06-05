const express = require('express')
const {postWorkers,deleteWorkers,login,refreshToken} = require("../api/workers")
const router = express.Router()
const controller = require("../controller/workers")
const authWorkers = require("../services/workers_auth")

router.get("/", controller.get)
router.post("/", postWorkers)
router.post("/logged",login)
router.post("/refresh", authWorkers.authorize,refreshToken)
router.delete("/", deleteWorkers)


module.exports = router