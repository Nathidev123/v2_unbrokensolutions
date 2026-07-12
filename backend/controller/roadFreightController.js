
const mongoose = require('mongoose')
const roadFreightSchema = require('../models/roadFreightModel')


//dont forget emptyFields array
const addFreight = async (req, res) => {
    const {
     company_name, contact_name, email, phone, street_address,
        city, postal_code, province, recipient_company, recipient_name,
        recipient_email,recipient_phone, recipient_street_address,
        recipient_city, recipient_province,
        weight, height, length, width, package_contents, parcel_value,
        package_name, shipment_options, distanceKm, durationMinutes, estimatedAmount   
     }
      = req.body
    
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
    if(!shipment_options){
        emptyFields.push('shipment_options')
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
        const roadFreight = await roadFreightSchema.create({
        company_name, contact_name, email, phone, street_address,
        city, postal_code, province, recipient_company, recipient_name,
        recipient_email,recipient_phone, recipient_street_address,
        recipient_city, recipient_province,
        weight, height, length, width, package_contents, parcel_value,
        package_name, shipment_options, distanceKm, durationMinutes, estimatedAmount     
    })
        res.status(200).json(roadFreight)
    }
    catch(error){
        res.status(400).json({error: error.message})
    }
}

const getAllFreight = async (req, res) => {
    const roadFrieght = await roadFreightSchema.find({}).sort({createdAt: -1})

    res.status(200).json(roadFrieght)
}



const getFreight = async (req, res) => {
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({error: 'No such order'})
    }
    const roadFreight = await roadFreightSchema.findById(id)
    if(!roadFreight){
        res.status(400).json({error: 'No such order'})
    }
    res.status(200).json(roadFreight)
}


const patchFreight = async (req, res) => {
    const {
        company_name, contact_name, email, phone, street_address,
        city, postal_code, province, recipient_company, recipient_name,
        recipient_email,recipient_phone, recipient_street_address,
        recipient_city, recipient_province,
        weight, height, length, width, package_contents, parcel_value,
        package_name, shipment_options, distanceKm, durationMinutes, estimatedAmount
    } = req.body

    /*let emptyFields = []
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
    if(!shipment_options){
        emptyFields.push('shipment_options')
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
 */
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({error: 'No such order'})
    }
    
    const roadFreight = await roadFreightSchema.findOneAndUpdate({_id: id},{
        ...req.body
    })
    if(!roadFreight){
        res.status(400).json({error: 'No such order'})
    }
    res.status(200).json(roadFreight)
    
    
}

const deleteFreight = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({error: 'No such order'})
    }
    const roadFreight = await roadFreightSchema.findOneAndDelete({_id: id})
    if(!roadFreight){
        res.status(400).json({error: 'No such order'})
    }
    res.status(200).json(roadFreight)

}
    
module.exports= {
    addFreight,
    getAllFreight,
    patchFreight,
    deleteFreight,
    getFreight
}