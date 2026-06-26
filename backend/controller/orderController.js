const mongoose = require('mongoose')

const orderSchema = require('../models/orderModel')

const addOrder = async (req, res) => {
    const{
        company_name, contact_name, email, phone, street_address,
        city, postal_code, province, recipient_company, recipient_name,
        recipient_email,recipient_phone, recipient_street_address,
        recipient_city, recipient_postal_code, recipient_province,
        weight, height, length, width, package_contents, parcel_value,
        package_name, shipment_options
    }= req.body
    try {
        const order = await orderSchema.create({company_name, contact_name, email, phone, street_address,
        city, postal_code, province, recipient_company, recipient_name,
        recipient_email,recipient_phone, recipient_street_address,
        recipient_city, recipient_postal_code, recipient_province,
        weight, height, length, width, package_contents, parcel_value,
        package_name, shipment_options})
        
        res.status(200).json(order)
    }
    catch(error) {
        res.status(400).json({error: error.message})
    }
        
}

const getAllOrders = async (req, res) => {

    const orders = await orderSchema.find({}).sort({createdAt: -1})
    
    res.status(400).json(orders)
}

const getOrder = async (req, res) => {
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({error: 'No such order'})
    }
    const order = await orderSchema.findById(id)
    if(!order){
        res.status(400).json({error: 'No such order'})
    }
    res.status(200).json(order)
}


const patchOrder = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid){
        res.status(404).json({error: 'No such order'})
    }
    const order = await orderSchema.findOneAndUpdate({_id: id},{
        ...req.body
    
    })
    if(!order){
        res.status(400).json({error: 'No such order'})
    }
    res.status(200).json(order)
    
}

const deleteOrder = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid){
        res.status(404).json({error: 'No such order'})
    }  
    const order = await orderSchema.findOneAndDelete({_id: id})

    if(!order){
        res.status(400).json({error: 'No such order'})
    }
    res.status(200).json(order)
}


module.exports = {
    addOrder,
    getAllOrders,
    getOrder,
    patchOrder,
    deleteOrder
}