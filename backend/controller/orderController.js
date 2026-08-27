const mongoose = require('mongoose')

const orderSchema = require('../models/orderModel')

const addOrder = async (req, res) => {
    console.log({
    distanceKm: req.body.distanceKm,
    durationMinutes: req.body.durationMinutes,
    quoteAmount: req.body.quoteAmount
})
    const{
        //general info
        service_type,
        company_name, 
        contact_name, 
        email,
        phone,
        street_address,
        city, 
        postal_code, 
        province, 
        recipient_company, 
        recipient_name,
        recipient_email,
        recipient_phone, 
        recipient_street_address,
        recipient_city, 
        recipient_province,
        weight, 
        height, 
        length, 
        width, 
        package_contents, 
        parcel_value,
        package_name,
        declared_value,
        package_type,
        delivery_speed, 

        //air freight
        origin_airport,
        destination_airport,
        cargo_type,
        cargo_description,
        //sea freight
        shipment_type,
        container_type,
        number_of_containers,
        port_of_origin,
        port_of_destination,

        //road freight
        load_type, 
        required_delivery_date,

        //quote/order
        distanceKm, 
        durationMinutes, 
        quoteAmount
    }= req.body

    /*fixing the error display*/
    
    
    let emptyFields = []

    if(!company_name){
        emptyFields.push('company_name')
    }
    if(!contact_name){
        emptyFields.push('contact_name')
    }
    if(!email){
        emptyFields.push('email')
    }
    if(!phone){
        emptyFields.push('phone')
    }
    
    if(!recipient_company){
        emptyFields.push('recipient_company')
    }
    if(!recipient_name){
        emptyFields.push('recipient_name')
    }
    if(!recipient_email){
        emptyFields.push('recipient_email')
    }
    if(!recipient_phone){
        emptyFields.push('recipient_phone')
    }
    
    if(! weight){
        emptyFields.push('weight')
    }
    if(!height){
        emptyFields.push('height')
    }
    if(!length){
        emptyFields.push('length')
    }
    if(!width){
        emptyFields.push('width')
    }
    

    //conditions based on services chosen//////////////
    if(service_type === 'courier'){
        if(!package_contents){
        emptyFields.push('package_contents')
    }
    if(!parcel_value){
        emptyFields.push('parcel_value')
    }
    if(!package_name){
        emptyFields.push('package_name')
    }
    if(!package_type){
        emptyFields.push('package_type')
    }
    if(!delivery_speed){
        emptyFields.push('delivery_speed')
    }
    if(!street_address){
        emptyFields.push('street_address')
    }
    if(!city){
        emptyFields.push('city')
    }
    if(!postal_code){
        emptyFields.push('postal_code')
    }
    if(!province){
        emptyFields.push('province')
    }
    if(!recipient_street_address){
        emptyFields.push('recipient_street_address')
    }
    if(!recipient_city){
        emptyFields.push('recipient_city')
    }
    if(! recipient_province){
        emptyFields.push('recipient_province')
    }
    if(!required_delivery_date){
        emptyFields.push('required_delivery_date')
    }
    }


    if(service_type === 'road'){
        if(!load_type){
        emptyFields.push('load_type')
    }
    if(!cargo_type){
        emptyFields.push('cargo_type')
    }
    if(!required_delivery_date){
        emptyFields.push('required_delivery_date')
    }
    if(!declared_value){
        emptyFields.push('declared_value')
    }
    if(!cargo_description){
        emptyFields.push('cargo_description')
    }
    if(!street_address){
        emptyFields.push('street_address')
    }
    if(!city){
        emptyFields.push('city')
    }
    if(!postal_code){
        emptyFields.push('postal_code')
    }
    if(!province){
        emptyFields.push('province')
    }
    if(!recipient_street_address){
        emptyFields.push('recipient_street_address')
    }
    if(!recipient_city){
        emptyFields.push('recipient_city')
    }
    if(! recipient_province){
        emptyFields.push('recipient_province')
    }
    }

    if(service_type === 'air'){
        if(!origin_airport){
        emptyFields.push('origin_airport')
    }
    if(!destination_airport){
        emptyFields.push('destination_airport')
    }
    if(!cargo_type){
        emptyFields.push('cargo_type')
    }
    if(!required_delivery_date){
        emptyFields.push('required_delivery_date')
    }
    if(!declared_value){
        emptyFields.push('declared_value')
    }
    if(!cargo_description){
        emptyFields.push('cargo_description')
    }
    }

    if(service_type === 'sea'){
        if(!shipment_type){
        emptyFields.push('shipment_type')
    }
    if(!port_of_origin){
        emptyFields.push('port_of_origin')
    }
    if(!port_of_destination){
        emptyFields.push('port_of_destination')
    }
    if(!required_delivery_date){
        emptyFields.push('required_delivery_date')
    }
    if(!declared_value){
        emptyFields.push('declared_value')
    }
    if(!cargo_description){
        emptyFields.push('cargo_description')
    }
    if(shipment_type === 'FCL'){
        if(!container_type){
            emptyFields.push('container_type')
        }
        if(!number_of_containers){
            emptyFields.push('number_of_containers')
        }
    }
    }
    

    if(emptyFields.length > 0 ){
        return res.status(400).json({error: 'Please fill in all the fields', emptyFields})
    }
    if(!/^\d{10}$/.test(phone)){
        return res.status(400).json({error: 'Phone number must be exactly 10 digits'})
    }
    if(!/^\d{10}$/.test(recipient_phone)){
        return res.status(400).json({error: 'Phone number must be exactly 10 digits'})
    }
    try {
        const order = await orderSchema.create({
        //general info
        service_type,
        company_name, 
        contact_name, 
        email,
        phone,
        street_address,
        city, 
        postal_code, 
        province, 
        recipient_company, 
        recipient_name,
        recipient_email,
        recipient_phone, 
        recipient_street_address,
        recipient_city, 
        recipient_province,
        weight, 
        height, 
        length, 
        width, 
        package_contents, 
        parcel_value,
        package_name,
        //courier
        delivery_speed, 

        //air freight
        origin_airport,
        destination_airport,
        cargo_type,
        dangerous_goods,

        //sea freight
        shipment_type,
        container_type,
        port_of_origin,
        port_of_destination,

        //road freight
        load_type, 

        //quote/order
        distanceKm, 
        durationMinutes, 
        quoteAmount})
        
        console.log(order)
        res.status(200).json(order)
    }
    catch(error) {
        res.status(400).json({error: error.message})
    }
}   


const getAllOrders = async (req, res) => {

    const orders = await orderSchema.find({}).sort({createdAt: -1})
    
    res.status(200).json(orders)
}

const getOrder = async (req, res) => {
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such order'})
    }
    const order = await orderSchema.findById(id)
    if(!order){
        res.status(400).json({error: 'No such order'})
    }
    res.status(200).json(order)
}


const patchOrder = async (req, res) => {

    const{
        //general info
        service_type,
        company_name, 
        contact_name, 
        email,
        phone,
        street_address,
        city, 
        postal_code, 
        province, 
        recipient_company, 
        recipient_name,
        recipient_email,
        recipient_phone, 
        recipient_street_address,
        recipient_city, 
        recipient_province,
        weight, 
        height, 
        length, 
        width, 
        package_contents, 
        parcel_value,
        package_name,
        //courier
        delivery_speed, 

        //air freight
        origin_airport,
        destination_airport,
        cargo_type,
        dangerous_goods,

        //sea freight
        shipment_type,
        container_type,
        port_of_origin,
        port_of_destination,

        //road freight
        load_type, 

        //quote/order
        distanceKm, 
        durationMinutes, 
        quoteAmount
    }= req.body
    /* phone number */
    
    let emptyFields = []
    

    if(!company_name){
        emptyFields.push('company_name')
    }
    if(!contact_name){
        emptyFields.push('contact_name')
    }
    if(!email){
        emptyFields.push('email')
    }
    if(!phone){
        emptyFields.push('phone')
    }
    if(!street_address){
        emptyFields.push('street_address')
    }
    if(!city){
        emptyFields.push('city')
    }
    if(!postal_code){
        emptyFields.push('postal_code')
    }
    if(!province){
        emptyFields.push('province')
    }
    if(!recipient_company){
        emptyFields.push('recipient_company')
    }
    if(!recipient_name){
        emptyFields.push('recipient_name')
    }
    if(!recipient_email){
        emptyFields.push('recipient_email')
    }
    if(!recipient_phone){
        emptyFields.push('recipient_phone')
    }
    if(!recipient_street_address){
        emptyFields.push('recipient_street_address')
    }
    if(!recipient_city){
        emptyFields.push('recipient_city')
    }
    if(! recipient_province){
        emptyFields.push('recipient_province')
    }
    if(! weight){
        emptyFields.push('weight')
    }
    if(!height){
        emptyFields.push('height')
    }
    if(!length){
        emptyFields.push('length')
    }
    if(!width){
        emptyFields.push('width')
    }
    if(!package_contents){
        emptyFields.push('package_contents')
    }
    if(!parcel_value){
        emptyFields.push('parcel_value')
    }
    if(!package_name){
        emptyFields.push('package_name')
    }
    /*
    if(!delivery_speed){
        emptyFields.push('delivery_speed')
    }
    
    if(!origin_airport){
        emptyFields.push('origin_airport')
    }
    if(!destination_airport){
        emptyFields.push('destination_airport')
    }
    if(!cargo_type){
        emptyFields.push('cargo_type')
    }
    if(!dangerous_goods){
        emptyFields.push('dangerous_goods')
    }
    if(!shipment_type){
        emptyFields.push('shipment_type')
    }
    if(!container_type){
        emptyFields.push('container_type')
    }
    if(!port_of_origin){
        emptyFields.push('port_of_origin')
    }
    if(!port_of_destination){
        emptyFields.push('port_of_destination')
    }
    if(!load_type){
        emptyFields.push('load_type')
    }*/
    if(!delivery_status){
        emptyFields.push('delivery_status')
    }
    if(!distanceKm){
        emptyFields.push('distanceKm')
    }
    if(!durationMinutes){
        emptyFields.push('durationMinutes')
    }
    if(!quoteAmount){
        emptyFields.push('quoteAmount')
    }
    if(emptyFields.length > 0 ){
        return res.status(400).json({error: 'Please fill in all the fields', emptyFields})
    }
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
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

    if(!mongoose.Types.ObjectId.isValid(id)){
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