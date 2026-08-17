import { useState } from "react"
import emailjs from '@emailjs/browser'
import { useFreightContext } from "../hooks/useFreightContext"
import ConfirmationPage from "./confirmationPage"
import { useNavigate } from 'react-router-dom'
const RoadFreight = () => {


const { dispatch2 } = useFreightContext()
const [error, setError] = useState(null)
const [emptyFields, setEmptyFields] = useState([])
const navigate = useNavigate()
const [roadFreight, setRoadFreight] = useState({

    
    //replacing useState
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

//replacing all individual setter functions
 
    const handleChange = (e) => {
        setRoadFreight({
            ...roadFreight,
            [e.target.name]: e.target.value
            //one state for all inputs
        })
    }

    const handleSubmit = async () => {
        //e.preventDefault()
        
       const response = await fetch('/api/freight/', {
        method: 'POST',
        body: JSON.stringify(roadFreight),
        headers: {
            'Content-Type' : 'application/json'
        }
       })
       const json = await response.json()
       if(!response.ok){
            console.log('Could not post to db')
            setError(json.error)
            setEmptyFields(json.emptyFields)
       }
       if(response.ok){
            setRoadFreight({
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

        //Sending to Team (Unbroken Solutions)
        //EmailJS service ID, template ID, and public key
        const serviceId = 'service_kd5mskc'
        const templateId = 'template_tqe19wu'
        const publicKey = 'eCS5a5yRYSaLDbX4R'
        
        //creating object that contains dynamic template params
        const templateParams = {
            from_name: roadFreight.company_name,
            from_email: roadFreight.email,
            to_name: 'Unbroken Solutions',
            message: 'Review Client details and send a quote',

        
        }

        //sending email using EmailJS
        emailjs.send(serviceId, templateId, templateParams, publicKey)
        .then((response) => {
            console.log('Email sent successfully', response)
            
        })
        .catch((error) => {
            console.error('Error sending email:', error)
            
        })   
        
        //Sending to client (Acknowledging)
       const serviceId1 = 'service_kd5mskc'
        const templateId1 = 'template_vqdtk19'
        const publicKey1 = 'eCS5a5yRYSaLDbX4R'
        
        //creating object that contains dynamic template params
        const templateParams1 = {
            from_name: 'Unbroken Solutions',
            from_email: 'tshabalalanathi7@gmail.com',
            email: roadFreight.email,
            name: roadFreight.contact_name,
            message: 'Your request  has been received and is being reviewed by our team of logistics experts. If you have not already included shipping documents in your request, you can do so now by attaching them to this reply.Our agents will be contacting you shortly and look forward to helping you with your shipments.To add additional comments, reply to this email.'

        
        }

        //sending email using EmailJS
        emailjs.send(serviceId1, templateId1, templateParams1, publicKey1)
            
        .then((response) => {
            console.log('Email sent successfully', response)
            
        })
        .catch((error) => {
            console.error('Error sending email:', error)
            
        })   
       //the above needs to happen while we still have the data
       //then clear forms afterwards as this process
       //is asynchronous
        dispatch2({type: 'CREATE_FREIGHT', payload: json})
        setEmptyFields([])
        setError(null)
        console.log('Added to db', json)
          //To send automated Email to user and Team
            //a page as well stating emails were sent and will get back
            //shortly
        navigate("/confirmation");
       }
       //also mneed to work on formDetails

       



    }
    /*from_name: 'Unbroken Solutions',
            to_name: roadFreight.email,
            message: 'Your request  has been received and is being reviewed by our team of logistics experts. If you have not already included shipping documents in your request, you can do so now by attaching them to this reply.Our agents will be contacting you shortly and look forward to helping you with your shipments.To add additional comments, reply to this email.'
            */
    return(
        <>
                    <h1>Road Freight</h1>
                    <label>Company Name: </label>
                    <input onChange={handleChange}
                    value={roadFreight.company_name}
                    name="company_name"
                    className={emptyFields.includes('company_name') ? 'error' : ''}/> 

                    <label>Contact Name:</label>
                    <input onChange={handleChange}
                    value={roadFreight.contact_name}
                    name="contact_name"
                    className={emptyFields.includes('contact_name') ? 'error' : ''}/>
        
                    <label>Email:</label>
                    <input onChange={handleChange}
                    value={roadFreight.email}
                    name="email"
                    className={emptyFields.includes('email') ? 'error' : ''}/>
        
                    <label>Phone:</label>
                    <input onChange={handleChange}
                    value={roadFreight.phone}
                    name="phone"
                    className={emptyFields.includes('phone') ? 'error' : ''}/>
        
                    <label>Street Address:</label>
                    <input onChange={handleChange}
                    value={roadFreight.street_address}
                    name="street_address"
                    className={emptyFields.includes('street_address') ? 'error' : ''}/>
        
                    <label>City:</label>
                    <input onChange={handleChange}
                    value={roadFreight.city}
                    name="city"
                    className={emptyFields.includes('city') ? 'error' : ''}/>
        
                    <label>Postal Code:</label>
                    <input onChange={handleChange}
                    value={roadFreight.postal_code}
                    name="postal_code"
                    className={emptyFields.includes('postal_code') ? 'error' : ''}/>
        
                    <label>Province:</label>
                    <input onChange={handleChange}
                    value={roadFreight.province}
                    name="province"
                    className={emptyFields.includes('province') ? 'error' : ''}/>
        
        
                    <h1>Recipient</h1>
                    <label>Recipient Company:</label>
                    <input onChange={handleChange}
                    value={roadFreight.recipient_company}
                    name="recipient_company"
                    className={emptyFields.includes('recipient_company') ? 'error' : ''}/>
        
                    <label>Name:</label>
                    <input onChange={handleChange}
                    value={roadFreight.recipient_name}
                    name="recipient_name"
                    className={emptyFields.includes('recipient_name') ? 'error' : ''}/>
        
                    
                    <label>Email:</label>
                    <input onChange={handleChange}
                    value={roadFreight.recipient_email}
                    name="recipient_email"
                    className={emptyFields.includes('recipient_email') ? 'error' : ''}/>
        
                    <label>Phone:</label>
                    <input onChange={handleChange}
                    value={roadFreight.recipient_phone}
                    name="recipient_phone"
                    className={emptyFields.includes('recipient_phone') ? 'error' : ''}/>
        
                    <label>Street Address:</label>
                    <input onChange={handleChange}
                    value={roadFreight.recipient_street_address}
                    name="recipient_street_address"
                    className={emptyFields.includes('recipient_street_address') ? 'error' : ''}/>
        
                    <label>City:</label>
                    <input onChange={handleChange}
                    value={roadFreight.recipient_city}
                    name="recipient_city"
                    className={emptyFields.includes('recipient_city') ? 'error' : ''}/>
        
        
                    <label>Province:</label>
                    <input onChange={handleChange}
                    value={roadFreight.recipient_province}
                    name="recipient_province"
                    className={emptyFields.includes('recipient_province') ? 'error' : ''}/>
        
            
        
                    <h1>Packaging</h1>
                    <label>Weight:</label>
                    <input onChange={handleChange}
                    value={roadFreight.weight}
                    name="weight"
                    className={emptyFields.includes('weight') ? 'error' : ''}/>
        
                    <label>Height:</label>
                    <input onChange={handleChange}
                    value={roadFreight.height}
                    name="height"
                    className={emptyFields.includes('height') ? 'error' : ''}/>
        
                    <label>Length:</label>
                    <input onChange={handleChange}
                    value={roadFreight.length}
                    name="length"
                    className={emptyFields.includes('length') ? 'error' : ''}/>
        
                    <label>Width:</label>
                    <input onChange={handleChange}
                    value={roadFreight.width}
                    name="width"
                    className={emptyFields.includes('width') ? 'error' : ''}/>
        
        
                    <h1>Package Details</h1>
                    <label>Package Contents:</label>
                    <input onChange={handleChange}
                    value={roadFreight.package_contents}
                    name="package_contents"
                    className={emptyFields.includes('package_contents') ? 'error' : ''}/>
        
                    <label>Parcel Value:</label>
                    <input onChange={handleChange}
                    value={roadFreight.parcel_value}
                    name="parcel_value"
                    className={emptyFields.includes('parcel_value') ? 'error' : ''}/>
        
                    <label>Package Name:</label>
                    <input onChange={handleChange}
                    value={roadFreight.package_name}
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
                    checked={roadFreight.shipment_options === "Same Day Delivery"}/>
                    Same Day Delivery
                    </label>
        
                    <label>
                    <input type="radio"
                    onChange={handleChange}
                    value="Tomorrow"
                    name="shipment_options"
                    className={emptyFields.includes('shipment_options') ? 'error' : ''}
                    checked={roadFreight.shipment_options === "Tomorrow"}/>
                    Tomorrow 
                    </label>
        
                    <label>
                    <input type="radio"
                    onChange={handleChange}
                    value="Normal"
                    name="shipment_options"
                    className={emptyFields.includes('shipment_options') ? 'error' : ''}
                    checked={roadFreight.shipment_options === "Normal"}/>
                    Normal
                    </label>
                    </div>
                    {error && <div className="error">{error}</div>}
                    <button 
                    className="shipmentFormSubmit" 
                    type="submit"
                    onClick={handleSubmit}
                    
                    >Submit</button>

              </>    
                
    )      
}

export default RoadFreight