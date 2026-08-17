import updatedlogo from '../assets/updatedlogo.png'
import { jsPDF } from 'jspdf'
import { useEffect, useState } from "react"
import emailjs from '@emailjs/browser'
import { useNavigate } from 'react-router-dom'
const Quotation = ({ order }) => {
    const navigate = useNavigate()

    const [distance, setDistance] = useState(null)
    const [duration, setDuration] = useState(null)
    const [error, setError] = useState('')
    const [alert, setAlert] = useState('');
    const [message, setMessage] = useState('');
    const pickupAddress = `${order.street_address}, ${order.city}, ${order.province},South Africa`
    const dropOffAddress = `${order.recipient_street_address}, ${order.recipient_city}, ${order.recipient_province},South Africa`
    const weight = order.weight

    
const getDistance = async () => {
    //sendin req to backend
    const response = await fetch('/api/order/distance', {

        method: 'POST',

        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({
            pickupAddress,
            dropOffAddress
        })

    })
    //recieving response from backend
    const json = await response.json()

    if (response.ok) {
        setDistance(json.distance)
        setDuration(json.duration)
        console.log(json)
    } else {
        setError('Failed to calculate distance')
        console.log(json)

    }

}

useEffect(() => {
    getDistance()
}, [])
//for quotation to appear immediately

    //formatting 
    const distanceKm = distance ? distance / 1000 : 0

    const totalSeconds = duration ? parseInt(duration) : 0

    const durationMinutes = Math.ceil(totalSeconds / 60)

    //const minutes = Math.floor((totalSeconds % 3600) / 60)
    const weightKg = Number(weight)
    //business rules
        /* Kg
        R15 per kg

        Distance bands
        0 -10km = R55
        10 - 25km = R85
        25 - 50km R120

        Shipment Options
        Same Day = +R100
        Tomorrow = +R50
        Normal = +R25

        (kg * rate) + distance band + shipment_option
        
            = Estimated Amount
        */

    const calculateQuotation = (weightKg, distanceKm, shipmentOption) => {

    const weightCharge = weightKg * 15

    let distanceCharge = 0

    if (distanceKm <= 10) {

        distanceCharge = 55

    } else if (distanceKm <= 25) {

        distanceCharge = 85

    } else if (distanceKm <= 50) {

        distanceCharge = 120

    } else {

        distanceCharge = 120 + ((distanceKm - 50) * 2)

    }

    let shipmentCharge = 0

    if (shipmentOption === "Same Day Delivery") {

        shipmentCharge = 100

    } else if (shipmentOption === "Tomorrow") {

        shipmentCharge = 50

    } else {

        shipmentCharge = 25

    }

    return weightCharge + distanceCharge + shipmentCharge

}
    const estimatedAmount = calculateQuotation(
    weightKg,
    Number(distanceKm),
    order.shipment_options
) 
   //Quote generator
   const generateQuotationPDF = () => {
        const doc = new jsPDF()
        const y = 20 

        doc.setFontSize(18)
        doc.text(order.company_name, 15, y)

        doc.setFontSize(16)
        doc.text('Quotation', 15, y + 10)

        doc.setFontSize(12)
        new Date('1970-01-01').toLocaleDateString()
        doc.text(
            [
              `Contact Name: ${order.contact_name}`,
    `Email: ${order.email}`,
    `Phone: ${order.phone}`,
    `Street Address: ${order.street_address}`,
    `City: ${order.city}`,
    `Province: ${order.province}`,
    `Postal Code: ${order.postal_code}`,

    "",
    "────────────────────────────────",
    `Recipient Company: ${order.recipient_company}`,
    `Street Address: ${order.recipient_street_address}`,
    `City: ${order.recipient_city}`,
    `Province: ${order.recipient_province}`,

    "",
    "────────────────────────────────",
    `Weight: ${order.weight}`,
    `Height: ${order.height}`,
    `Length: ${order.length}`,
    `Width: ${order.width}`,

    "",

    `Package Contents: ${order.package_contents}`,
    `Parcel Value: ${order.parcel_value}`,
    `Package Name: ${order.package_name}`,
    `Shipment Option: ${order.shipment_options}`,
    `Distance: ${distanceKm.toFixed(1)} km`,
    `Duration: ${durationMinutes} min`,

    "",
    "────────────────────────────────",
    "",
    `Estimated Amount: R${estimatedAmount.toFixed(2)}`   
            ],
            15,
            y + 30,
            { lineHeightFactor: 1.5 }
        )
         doc.save(`Unbroken Solutions Quote-${order.company_name}.pdf`)
        //takes pdf built and returns it as a Base64 Data
        //URI string, which is the format EmailJS expects for
        //attachment
        //so basically hand the pdf as an attachment in the email
    }
    
    const handleFinish = async () => {
        const response =  await fetch('/api/order/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...order,
                distanceKm,
                durationMinutes, 
                estimatedAmount
            })
        })

        const json = await response.json()
        if(response.ok){
            console.log("Order saved", json)
            
            //sending automated email to user and unbroken solutions
            const serviceId = 'service_bry1mab'
            const templateId = 'template_vqdtk19'
            const publicKey = 'eCS5a5yRYSaLDbX4R'
            navigate('/thankyou')
            generateQuotationPDF()
            
            //object that contains dynamic template params
            const templateParams = {
                email: order.email,
                name: order.contact_name,
                message: message,
                logo_url: updatedlogo,
                /*quote - here since attachment for emailjs
                needs subscription*/
                company_name: order.company_name,
                contact_name: order.contact_name,
                email: order.email,
                phone: order.phone,

                street_address: order.street_address,
                city: order.city,
                province: order.province,
                postal_code: order.postal_code,

                recipient_company: order.recipient_company,
                recipient_street_address: order.recipient_street_address,
                recipient_city: order.recipient_city,
                recipient_province: order.recipient_province,

                weight: order.weight,
                height: order.height,
                length: order.length,
                width: order.width,

                package_contents: order.package_contents,
                parcel_value: order.parcel_value,
                package_name: order.package_name,
                shipment_options: order.shipment_options,

                distance: distanceKm.toFixed(1),
                duration: durationMinutes,
                estimated_amount: estimatedAmount.toFixed(2),
            }
            //did cc 'unbrokensolutions(still my email for now)' to receive email as well
            //so as to avoid sendin
            // g two emails, one to user and one to unbroken solutions
            emailjs.send(serviceId, templateId, templateParams, publicKey)
            .then((response) => {
                console.log('Email sent successfully!', response.status, response.text)
                setAlert({ type: 'success', message: 'Your message has been sent. We will get back to you shortly'})

                setTimeout(() => {
                    setAlert(null);
                    
                }, 5000);
            })
            .catch((error) => {
                console.error('Error sending email:', error)
                setAlert({ type: 'error', message: 'Failed to send email. Please try again.' })
            })

        } else {

            console.log(json.error)
        }


    }    

    return(
       <>
       <div className="quotation">
            <h3>{order.company_name}</h3>
            <label>Quotation</label>
            <p><strong>Contact Name: </strong>{order.contact_name}</p>
            <p><strong>Email: </strong>{order.email}</p>
            <p><strong>Phone: </strong>{order.phone}</p>
            <p><strong>Street Address: </strong>{order.street_address}</p>
            <p><strong>City: </strong>{order.city}</p>
            <p><strong>Province: </strong>{order.province}</p>
            <p><strong>Postal Code: </strong>{order.postal_code}</p>
            <br></br>

            <p><strong>Recipient Company: </strong>{order.recipient_company}</p>
            <p><strong>Street Address: </strong>{order.recipient_street_address}</p>
            <p><strong>City: </strong>{order.recipient_city}</p>
            <p><strong>Province: </strong>{order.recipient_province}</p>
            <br></br>
            <p><strong>Weight: </strong>{order.weight}</p>
            <p><strong>Height: </strong>{order.height}</p>
            <p><strong>length: </strong>{order.length}</p>
            <p><strong>Width: </strong>{order.width}</p>

            <br></br>
            
            <p><strong>Package Contents: </strong>{order.package_contents}</p>
            <p><strong>Parcel Value: </strong>{order.parcel_value}</p>
            <p><strong>Package Name: </strong>{order.package_name}</p>
            <p><strong>Shipment Options: </strong>{order.shipment_options}</p>
            <p>
            <strong>Distance:</strong> {distanceKm.toFixed(1)} km
            </p>

            <p>
                <strong>Duration:</strong> {durationMinutes} min
            </p>
            <br></br>
            <hr></hr>
                        <p>
                <strong>Estimated Amount:</strong> R{estimatedAmount.toFixed(2)}
            </p>
            <br></br>
            
            {/*block continuation to payment if form isnt complete ///////////////////////////////////////////////////*/}
            <button className="makePayment" 
            onClick={handleFinish}
            >Done</button>
            {error && <div className="error">{error}</div>}
            </div>
            </>
    )
        /* disabled={} */
}


export default Quotation
/*React frontend doesnt knbow how to calculate distances and doesnt
know how to communicate with google maps, it only knows how to ask backend for
info needed */

/*ShipmentForm -> Show Quotation ->User clicks "Make Payment"
    

↓
POST to backend  ->  Save order in MongoDB  -> Save order in MongoDB
  
↓
Redirect to payment gateway  */  


