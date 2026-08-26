
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

//for sea ports
const {
    getSeaPort
} = require('../controller/getSeaPort')



/*creating routes*/
/*order routes*/
router.get('/', getAllOrders)
router.get('/:id', getOrder)
router.post('/', addOrder)
router.patch('/:id', patchOrder)
router.delete('/:id', deleteOrder)

router.post('/distance', calculateDistance)
router.get('/seaport', getSeaPort)
module.exports = router 