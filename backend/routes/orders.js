
const express = require('express')

//grabbing functions from controller
const {
    addOrder,
    getAllOrders,
    getOrder,
    patchOrder,
    deleteOrder
} = require('../controller/orderController')

const {
    calculateDistance
} = require('../controller/calculateDistance')
const router = express.Router()




/*creating routes*/
/*order routes*/
router.get('/', getAllOrders)
router.get('/:id', getOrder)
router.post('/', addOrder)
router.patch('/:id', patchOrder)
router.delete('/:id', deleteOrder)

router.post('/distance', calculateDistance)

module.exports = router 