import { useState, useEffect } from "react"
import { useOrderContext } from '../hooks/useOrderContext'
import Quotation from "../Components/Quotation"

const ShipmentForm = () => {
    //okay dont have orders up here as already declared below

    //accessing global state
    const { dispatch } = useOrderContext()
 
    //error to states
    const [error, setError] = useState(null)
    
    //after refactoring error
    const [emptyFields, setEmptyFields] = useState([])

    //to open quotations
    const [showQuotation, setShowQuotation] = useState(false)
    const [order, setOrder] = useState({
    
    
        //setOrder replaces all individual setter functions
           company_name: '',
            contact_name: '',
             email: '', phone: '', 
             street_address: '',
                city: '', 
                postal_code: '',
                 province: '', 
                 recipient_company: '',
                  recipient_name: '',
                    recipient_email: '',
                    recipient_phone: '',
                     recipient_street_address: '',
                    recipient_city: '', 
                    recipient_province: '',
                    
        weight: '', height: '', length: '', width: '', package_contents: '', parcel_value: '',
        package_name: '', shipment_options: ''
        //one object one state
        //instead of multiple useStates
    })

    
    //one handleChange function for all inputs
    const handleChange = (e) => {
        setOrder({ ...order,
            [e.target.name]: e.target.value
            //defferent to edit order as there we had previous state(order)
            //here we had to create the elements of order
         })
    }
    
    //testing
     useEffect(() => {
    console.log("showQuotation:", showQuotation);
}, [showQuotation]);   
   
    
   const handleSubmit = async (e) => {
        e.preventDefault()

        //creating post request
        //states need to match with the names in the controller 
       
        /*const response = await fetch('/api/order/', {
            method: 'POST',
            body: JSON.stringify(order),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()
        console.log(json)
        //checking response
        if(!response.ok) {
            setError(json.error) //from controller
            setEmptyFields(json.emptyFields || [])
            //setShowQuotation(false)
        }
        if(response.ok) {
            /*setOrder({
             company_name: '',
            contact_name: '',
             email: '', phone: '', 
             street_address: '',
                city: '', 
                postal_code: '',
                 province: '', 
                 recipient_company: '',
                  recipient_name: '',
                    recipient_email: '',
                    recipient_phone: '',
                     recipient_street_address: '',
                    recipient_city: '', 
                    recipient_province: '',
        weight: '', height: '', length: '', width: '', package_contents: '', parcel_value: '',
        package_name: '', shipment_options: ''  
            })
            
            if (response.ok) {
    
}
            setError(null)
            setEmptyFields([])

            console.log('new card added', json)

            dispatch({type: 'CREATE_ORDER', payload: json})
            */
           const fields = []
            if (!order.company_name) fields.push("company_name")
            if (!order.contact_name) fields.push("contact_name")
            if (!order.email) fields.push("email")
            if (!order.phone) fields.push("phone")
            if (!order.street_address) fields.push("street_address")
            if (!order.city) fields.push("city")
            if (!order.postal_code) fields.push("postal_code")
            if (!order.province) fields.push("province")
            if (!order.recipient_company) fields.push("recipient_company")
            if (!order.recipient_name) fields.push("recipient_name")
            if (!order.recipient_email) fields.push("recipient_email")
            if (!order.recipient_phone) fields.push("recipient_phone")
            if (!order.recipient_street_address) fields.push("recipient_street_address")
            if (!order.recipient_city) fields.push("recipient_city")
            if (!order.recipient_province) fields.push("recipient_province")
            if (!order.weight) fields.push("weight")
            if (!order.height) fields.push("height")
            if (!order.length) fields.push("length")
            if (!order.width) fields.push("width")
            if (!order.package_contents) fields.push("package_contents")
            if (!order.parcel_value) fields.push("parcel_value")
            if (!order.package_name) fields.push("package_name")
            if (!order.shipment_options) fields.push("shipment_options")
            
            if(fields.length > 0){
                setError('Please fill in all required fields')
                return
            }
            setError(null)
            setShowQuotation(true)
        }
        
   
   
    return(
        <>
        <form className="shipmentForm" onSubmit={handleSubmit}>
        <div>
            
            
            <h1>Create a Shipment</h1>
            <label>Company Name:</label>
            <input onChange={handleChange}
            value={order.company_name}
            name="company_name"
            className={emptyFields.includes('company_name') ? 'error' : ''}/>

            <label>Contact Name:</label>
            <input onChange={handleChange}
            value={order.contact_name}
            name="contact_name"
            className={emptyFields.includes('contact_name') ? 'error' : ''}/>

            <label>Email:</label>
            <input onChange={handleChange}
            value={order.email}
            name="email"
            className={emptyFields.includes('email') ? 'error' : ''}/>

            <label>Phone:</label>
            <input onChange={handleChange}
            value={order.phone}
            name="phone"
            className={emptyFields.includes('phone') ? 'error' : ''}/>

            <label>Street Address:</label>
            <input onChange={handleChange}
            value={order.street_address}
            name="street_address"
            className={emptyFields.includes('street_address') ? 'error' : ''}/>

            <label>City:</label>
            <input onChange={handleChange}
            value={order.city}
            name="city"
            className={emptyFields.includes('city') ? 'error' : ''}/>

            <label>Postal Code:</label>
            <input onChange={handleChange}
            value={order.postal_code}
            name="postal_code"
            className={emptyFields.includes('postal_code') ? 'error' : ''}/>

            <label>Province:</label>
            <input onChange={handleChange}
            value={order.province}
            name="province"
            className={emptyFields.includes('province') ? 'error' : ''}/>


            <h1>Recipient</h1>
            <label>Recipient Company:</label>
            <input onChange={handleChange}
            value={order.recipient_company}
            name="recipient_company"
            className={emptyFields.includes('recipient_company') ? 'error' : ''}/>

            <label>Name:</label>
            <input onChange={handleChange}
            value={order.recipient_name}
            name="recipient_name"
            className={emptyFields.includes('recipient_name') ? 'error' : ''}/>

            
            <label>Email:</label>
            <input onChange={handleChange}
            value={order.recipient_email}
            name="recipient_email"
            className={emptyFields.includes('recipient_email') ? 'error' : ''}/>

            <label>Phone:</label>
            <input onChange={handleChange}
            value={order.recipient_phone}
            name="recipient_phone"
            className={emptyFields.includes('recipient_phone') ? 'error' : ''}/>

            <label>Street Address:</label>
            <input onChange={handleChange}
            value={order.recipient_street_address}
            name="recipient_street_address"
            className={emptyFields.includes('recipient_street_address') ? 'error' : ''}/>

            <label>City:</label>
            <input onChange={handleChange}
            value={order.recipient_city}
            name="recipient_city"
            className={emptyFields.includes('recipient_city') ? 'error' : ''}/>


            <label>Province:</label>
            <input onChange={handleChange}
            value={order.recipient_province}
            name="recipient_province"
            className={emptyFields.includes('recipient_province') ? 'error' : ''}/>

    

            <h1>Packaging</h1>
            <label>Weight:</label>
            <input onChange={handleChange}
            value={order.weight}
            name="weight"
            className={emptyFields.includes('weight') ? 'error' : ''}/>

            <label>Height:</label>
            <input onChange={handleChange}
            value={order.height}
            name="height"
            className={emptyFields.includes('height') ? 'error' : ''}/>

            <label>Length:</label>
            <input onChange={handleChange}
            value={order.length}
            name="length"
            className={emptyFields.includes('length') ? 'error' : ''}/>

            <label>Width:</label>
            <input onChange={handleChange}
            value={order.width}
            name="width"
            className={emptyFields.includes('width') ? 'error' : ''}/>


            <h1>Package Details</h1>
            <label>Package Contents:</label>
            <input onChange={handleChange}
            value={order.package_contents}
            name="package_contents"
            className={emptyFields.includes('package_contents') ? 'error' : ''}/>

            <label>Parcel Value:</label>
            <input onChange={handleChange}
            value={order.parcel_value}
            name="parcel_value"
            className={emptyFields.includes('parcel_value') ? 'error' : ''}/>

            <label>Package Name:</label>
            <input onChange={handleChange}
            value={order.package_name}
            name="package_name"
            className={emptyFields.includes('package_name') ? 'error' : ''}/>


            <div className="shipment_options">
                <label>Shipment Options: </label>
                <br></br>
            <label>
            <input type="radio"
            onChange={handleChange}
            value="Same Day Delivery"
            name="shipment_options"
            className={emptyFields.includes('shipment_options') ? 'error' : ''}
            checked={order.shipment_options === "Same Day Delivery"}/>
            Same Day Delivery
            </label>

            <label>
            <input type="radio"
            onChange={handleChange}
            value="Tomorrow"
            name="shipment_options"
            className={emptyFields.includes('shipment_options') ? 'error' : ''}
            checked={order.shipment_options === "Tomorrow"}/>
            Tomorrow 
            </label>

            <label>
            <input type="radio"
            onChange={handleChange}
            value="Normal"
            name="shipment_options"
            className={emptyFields.includes('shipment_options') ? 'error' : ''}
            checked={order.shipment_options === "Normal"}/>
            Normal
            </label>
            </div>
            {error && <div className="error">{error}</div>}
            <button 
            className="shipmentFormSubmit" 
            type="submit"
            >Submit</button>
            
           </div>
            </form>
            {showQuotation && (
                <Quotation
            order= {order}>
            </Quotation>
            )}
            
        </>

    )
}

export default ShipmentForm
/*
            <label>Delivery Status:</label>
            <input onChange={handleChange}
            value={order.delivery_status}
            name="delivery_status"
            className={emptyFields.includes('delivery_status') ? 'error' : ''}/>
*/