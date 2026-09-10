
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
        type: String,
        required: true
    },

    /*this is courier now*/
    street_address: {
        type: String,
        required: function () {
            return this.service_type === 'courier'  || this.service_type === 'road'
           
        }
    },
    city: {
        type: String,
        required: function () {
            return this.service_type === 'courier'  || this.service_type === 'road'
        }
    },
    postal_code: {
        type: String,
        required: function () {
            return this.service_type === 'courier'  || this.service_type === 'road'
        }
    },
    province: {
        type: String,
        required: function () {
            return this.service_type === 'courier'  || this.service_type === 'road'
        }
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
        required: function () {
            return this.service_type === 'courier'  || this.service_type === 'road'
        }
    },
    recipient_city: {
        type: String,
        required: function () {
            return this.service_type === 'courier'  || this.service_type === 'road'
        }
    },
    recipient_province: {
        type: String,
        required: function () {
            return this.service_type === 'courier'  || this.service_type === 'road'
        }
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
        required: function () {
            return this.service_type === 'courier'  
        }
    },
    parcel_value: {
        type: Number,
        required: function () {
            return this.service_type === 'courier'  
        }
    },
    package_name: {
        type: String,
        required: function () {
            return this.service_type === 'courier'  
        }
    },
    package_type: {
        type: String,
        enum: ['Box', 'Crate', 'Pallet', 'Bag', 'Container', 'Envelope'],
        required: function () {
            return this.service_type === 'courier'  
        }
    },
    

    //Courier & Express
    delivery_speed: {
        type: String,
        enum: ['same_day', 'tomorrow', 'normal'],
        required: function () {
            return this.service_type === 'courier'  
        }
    },

    
    //Air freight
    origin_airport: {
        type: String,
        enum: ['JNB', 'CPT', 'DUR', 'PLZ', 'BFN', 'GRJ', 'MQP','HLA', 'UTN' ],
        required: function () {
            return this.service_type === 'air'  
        }
    },

    destination_airport: {
        type: String,
        required: function () {
            return this.service_type === 'air'  
        }
    },
    cargo_type: {
        type: String,
        enum: ['General Cargo', 'Dangerous Goods', 'Perishable Goods',
            'Medical', 'Live Animals', 'Valuable Cargo', 'Fragile Cargo',
            'Oversized Cargo', 'Temperature-Controlled', 'Documents'
        ],
        required: function () {
            return this.service_type === 'air'  || this.service_type === 'road' ||  this.service_type === 'sea'
            
        }
    },
    cargo_description: {
        type: String,
        required: function () {
            return this.service_type === 'air'  || this.service_type === 'road' ||  this.service_type === 'sea'
            
        }
    },
    
    //Sea Freight
    shipment_type: {
        type: String,
        enum: ['FCL', 'LCL'],
        //fcl full container load
        //less than container load
        required: function () {
            return this.service_type === 'sea'  
            
        }
    },
    container_type: {
        type: String,
        enum: ['20ft','40ft','40ft_hc','20ft_reefer','40ft_reefer','40ft_open_top'],
        required: function () {
            return this.shipment_type === 'FCL'  
            
        }
    },
    number_of_containers: {
        type: Number,
        enum: [1, 2, 3, 4, 5],
        required: function () {
            return this.shipment_type === 'FCL'  
            
        }
    },
    port_of_origin: {
        type: String,
        enum: ['durban', 'richards_bay', 'cape_town', 'saldanha_bay', 'ngqura', 'gqeberha', 'east_london', 'mossel_bay'],
        required: function () {
            return this.service_type === 'sea'  
            
        }
    },
    port_of_destination: {
        type: String,
        required: function () {
            return this.service_type === 'sea'  
            
        }
    },
    
    //Road Freight
    load_type: {
        type: String,
        enum: ['FTL', 'LTL'],
        //ftl = full truck load
        //ltl = less than truck load
        required: function () {
            return this.service_type === 'road'  
            
        }
    },
    declared_value: {
        type: Number,
        required: function () {
            return this.service_type === 'air'  || this.service_type === 'road' ||  this.service_type === 'sea'
            
        }
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

    durationSeconds: {
    type: Number
    },

    quoteAmount: {
    type: Number
    }
},
{timestamps:true}
)

module.exports = mongoose.model('orderSchema', orderSchema)