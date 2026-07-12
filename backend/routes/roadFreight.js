const express = require('express')

const {
    addFreight,
    getAllFreight,
    patchFreight,
    deleteFreight,
    getFreight
} = require('../controller/roadFreightController')
const router = express.Router()

/*road freight*/
router.get('/', getAllFreight)
router.get('/:id', getFreight)
router.post('/', addFreight)
router.patch('/:id', patchFreight)
router.delete('/:id', deleteFreight)

module.exports = router 