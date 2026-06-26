
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const orderSchema = new Schema({
    /*custeomer info*/
    company_name: {
        type: String,
        required: true
    },
    contact_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    street_address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    postal_code: {
        type: Number,
        required: true
    },
    province: {
        type: String,
        required: true
    },
    /*recipient info*/
    recipient_company: {
        type: String,
        required: true
    },
    recipient_name: {
        type: String,
        required: true
    },
    recipient_email: {
        type: String,
        required: true
    },
    recipient_phone: {
        type: Number,
        required: true
    },
    recipient_street_address: {
        type: String,
        required: true
    },
    recipient_city: {
        type: String,
        required: true
    },
    recipient_postal_code: {
        type: Number,
        required: true
    },
    recipient_province: {
        type: String,
        required: true
    },
    /*packaging*/
    weight: {
        type: Number,
        required: true
    },
    height: {
        type: Number,
        required: true
    },
    length: {
        type: Number,
        required: true
    },
    width: {
        type: Number,
        required: true
    },

    /*package details*/
    package_contents: {
        type: String,
        required: true
    },
    parcel_value: {
        type: Number,
        required: true
    },
    package_name: {
        type: String,
        required: true
    },
    shipment_options: {
        type: String,
        required: true
    }
},
{timestamps:true}
)

module.exports = mongoose.model('orderSchema', orderSchema)