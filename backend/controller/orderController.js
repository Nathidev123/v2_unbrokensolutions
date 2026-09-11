const mongoose = require('mongoose')

const orderSchema = require('../models/orderModel')
const generateQuotationPDF = require('../services/pdfService')
const sendQuotationEmail = require('../services/emailService')
const calculateQuote = require('../services/quoteService') 

const addOrder = async (req, res) => {
    console.log({
    distanceKm: req.body.distanceKm,
    durationMinutes: req.body.durationMinutes,
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
        additional_information,
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
        durationSeconds,
        
        
    }= req.body
    console.log("durationSeconds:", durationSeconds)
    console.log("type:", typeof durationSeconds)

    //the 's' at the end of the durationSeconds string was causing the error
    const durationSecondsNumber = durationSeconds
    ? Number(String(durationSeconds).replace('s', ''))
    : undefined

    
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
    /*
    if(!required_delivery_date){
        emptyFields.push('required_delivery_date')
    }*/
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
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
    return res.status(400).json({error: 'Please enter a valid email address'})
    }
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipient_email)){
    return res.status(400).json({error: 'Please enter a valid email address'})
}
        let quoteAmount 
        //the quote and calculation will be for courier
        //only, other service types will
        //just send a request/enquiry email
        if(service_type === 'courier') {
        quoteAmount = calculateQuote({
        weight,
        distanceKm,
        delivery_speed
    }) 
}
    // Removing fields that are not relevant to the selected service
        const orderData = {
            service_type,
            company_name, 
            contact_name, 
            email,
            phone,

            // address information
            street_address: ['courier', 'road'].includes(service_type) ? street_address : undefined,
            city: ['courier', 'road'].includes(service_type) ? city : undefined,
            postal_code: ['courier', 'road'].includes(service_type) ? postal_code : undefined,
            province: ['courier', 'road'].includes(service_type) ? province : undefined,

            recipient_company,
            recipient_name,
            recipient_email,
            recipient_phone,

            recipient_street_address: ['courier', 'road'].includes(service_type)
                ? recipient_street_address
                : undefined,

            recipient_city: ['courier', 'road'].includes(service_type)
                ? recipient_city
                : undefined,

            recipient_province: ['courier', 'road'].includes(service_type)
                ? recipient_province
                : undefined,

            // common
            weight, 
            height, 
            length, 
            width,

            // courier
            package_contents: service_type === 'courier' ? package_contents : undefined,
            parcel_value: service_type === 'courier' ? parcel_value : undefined,
            package_name: service_type === 'courier' ? package_name : undefined,
            package_type: service_type === 'courier' ? package_type : undefined,
            delivery_speed: service_type === 'courier' ? delivery_speed : undefined,

            // air
            origin_airport: service_type === 'air' ? origin_airport : undefined,
            destination_airport: service_type === 'air' ? destination_airport : undefined,

            // air / road / sea
            cargo_type: ['air', 'road', 'sea'].includes(service_type)
                ? cargo_type
                : undefined,

            cargo_description: ['air', 'road', 'sea'].includes(service_type)
                ? cargo_description
                : undefined,

            declared_value: ['air', 'road', 'sea'].includes(service_type)
                ? declared_value
                : undefined,

            // sea
            shipment_type: service_type === 'sea' ? shipment_type : undefined,

            container_type:
                service_type === 'sea' && shipment_type === 'FCL'
                    ? container_type
                    : undefined,

            number_of_containers:
                service_type === 'sea' && shipment_type === 'FCL'
                    ? number_of_containers
                    : undefined,

            port_of_origin: service_type === 'sea' ? port_of_origin : undefined,
            port_of_destination: service_type === 'sea' ? port_of_destination : undefined,

            // road
            load_type: service_type === 'road' ? load_type : undefined,

            required_delivery_date:
            ['road', 'air', 'sea'].includes(service_type)
                ? required_delivery_date : undefined,

            additional_information,

            // quote/order
            distanceKm, 
            durationSeconds: durationSecondsNumber, 
            quoteAmount
            
}
        

    try {
        
        const order = await orderSchema.create(orderData)
        
        if(service_type === 'courier') {

            const pdfBuffer = generateQuotationPDF(order)
            await sendQuotationEmail(order, pdfBuffer)

            console.log(order)

            res.status(200).json(order)
        }
        else {
           await sendQuotationEmail(order) 

           console.log(order)
           return res.status(200).json(order)
        }
        
    }
    catch(error) {
        console.error('Add Order Error', error)
        if (error.name === 'ValidationError') {

            const invalidFields = Object.keys(error.errors)
            return res.status(400).json({
                error: 'Please enter valid information in the highlighted fields',
                invalidFields
            })
        }
        return res.status(500).json({
            error: 'Something went wrong. Please try again'
        })
       
    }
}   
//request -> validate -> if courier -> calculate quote
// -> create order -> pdf + quotation email
//else ->create order -> enquiry email

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
        durationSeconds, 
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
    /*if(!delivery_status){
        emptyFields.push('delivery_status')
    }
    if(!distanceKm){
        emptyFields.push('distanceKm')
    }
    if(!durationSeconds){
        emptyFields.push('durationSeconds')
    }
    if(!quoteAmount){
        emptyFields.push('quoteAmount')
    }*/
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