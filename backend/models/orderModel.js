
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const orderSchema = new Schema({
    //service selection
    service_type: {
        type: String,
        enum: ['courier', 'road', 'air', 'sea'],
        required: true
    },

    /*customer info*/
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
        type: String,
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
        type: String,
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
    recipient_province: {
        type: String,
        required: true
    },

    //Common amongst all service types
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
    package_type: {
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
    package_type: {
        type: String,
        enum: ['Box', 'Crate', 'Pallet', 'Bag', 'Container', 'Envelope']
    },
    

    //Courier & Express
    delivery_speed: {
        type: String,
        enum: ['Economy', 'Standard', 'Priority']
    },

    
    //Air freight
    origin_airport: {
        type: String,
        enum: ['JNB', 'CPT', 'DUR', 'PLZ', 'BFN', 'GRJ', 'MQP','HLA', 'UTN' ]
    },

    destination_airport: {
        type: String,
        enum: ['JNB', 'CPT', 'DUR', 'PLZ', 'BFN', 'GRJ', 'MQP','HLA', 'UTN' ]
    },
    cargo_type: {
        type: String,
        enum: ['General Cargo', 'Dangerous Goods', 'Perishable Goods',
            'Medical', 'Live Animals', 'Valuable Cargo', 'Fragile Cargo',
            'Oversized Cargo', 'Temperature-Controlled', 'Documents'
        ]
    },
    cargo_description: {
        type: String,

    },
    
    //Sea Freight
    shipment_type: {
        enum: ['FCL', 'LCL']
        //fcl full container load
        //less than container load
    },
    container_type: {
        type: String,
        enum: ['20ft','40ft','40ft_hc','20ft_reefer','40ft_reefer','40ft_open_top']
    },
    number_of_containers: {
        type: String,
        enum: ['1','2','3','4','5']
    },
    port_of_origin: {
        type: String,
        enum: ['durban', 'richards_bay', 'cape_town', 'saldanha_bay', 'ngqura', 'gqeberha', 'east_london', 'mossel_bay']
    },
    port_of_destination: {
        type: String
    },
    
    //Road Freight
    load_type: {
        type: String,
        enum: ['FTL', 'LTL']
        //ftl = full truck load
        //ltl = less than truck load
    },
    declared_value: {
        type: String
    },
    required_delivery_date: {
        type: Date
    },
    //Order Quote
    delivery_status: {
        type: String,
        default: "Open"
        
    },
    distanceKm: {
    type: Number
    },

    durationMinutes: {
    type: Number
    },

    quoteAmount: {
    type: Number
    }
},
{timestamps:true}
)

module.exports = mongoose.model('orderSchema', orderSchema)