const express = require('express')
const router = express.Router()
const controller = require("../controller/profession")

router.get("/", controller.get)
router.post("/", controller.post)
router.put("/", controller.put)
router.delete("/", controller.delete)

module.exports = router