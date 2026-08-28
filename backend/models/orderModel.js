
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

    /*this is courier now*/
    street_address: {
        type: String,
        
    },
    city: {
        type: String,
        
    },
    postal_code: {
        type: String,
        
    },
    province: {
        type: String,
        
    },
    /*recipient info*/
    recipient_company: {
        type: String,
        
    },
    recipient_name: {
        type: String,
        
    },
    recipient_email: {
        type: String,
        
    },
    recipient_phone: {
        type: String,
        
    },
    recipient_street_address: {
        type: String,
        
    },
    recipient_city: {
        type: String,
        
    },
    recipient_province: {
        type: String,
        
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
    /*Courier*/
    package_contents: {
        type: String,
        
    },
    parcel_value: {
        type: Number,
        
    },
    package_name: {
        type: String,
        
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
        type: String
        
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
        type: String,
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
    additional_information: {
        type: String
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