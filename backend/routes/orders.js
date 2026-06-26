
const express = require('express')

//grabbing functions from controller
const {
    addOrder,
    getAllOrders,
    getOrder,
    patchOrder,
    deleteOrder
} = require('../controller/orderController')

const router = express.Router()



/*creating routes*/
router.get('/', getAllOrders)
router.get('/:id', getOrder)
router.post('/', addOrder)
router.patch('/:id', patchOrder)
router.delete('/:id', deleteOrder)


module.exports = router 