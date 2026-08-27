const express = require('express')
const router = express.Router()

const { getSeaPort } = require('../controller/getSeaPort')

router.get('/', getSeaPort)

module.exports = router