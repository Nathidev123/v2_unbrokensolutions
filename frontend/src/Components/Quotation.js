
import { useEffect, useState } from "react"
//installed axios
const Quotation = ({ order }) => {

    const [distance, setDistance] = useState(null)
    const [duration, setDuration] = useState(null)

    const pickupAddress = `${order.street_address}, ${order.city}, ${order.province},South Africa`
    const dropOffAddress = `${order.recipient_street_address}, ${order.recipient_city}, ${order.recipient_province},South Africa`
    const weight = order.weight

    
const getDistance = async () => {

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

    const json = await response.json()

    if (response.ok) {
        setDistance(json.distance)
        setDuration(json.duration)
        console.log(json)
    } else {
        console.log(json)
    }

}

useEffect(() => {
    getDistance()
}, [])
//for quotation to appear immediately
    const distanceKm = distance ? distance / 1000 : 0

    const totalSeconds = duration ? parseInt(duration) : 0

    const hours = Math.floor(totalSeconds / 3600)

    const minutes = Math.floor((totalSeconds % 3600) / 60)
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

    const handlePayment = () => {
        /*const [emptyFields, setEmptyFields] = useState([])
        const [error, setError] = useState(null)*/
         /* Estimation calculator */

    }     
    
        
       //NEXT ENSURING QUOTES AMOUNT PERSIST TO DB//////////

    
    return(
       <>
       <div className="quotation">
            <h3>{order.company_name}</h3>
            <label>Quotation</label>
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
            <hr></hr>
            <p><strong>Package Contents: </strong>{order.package_contents}</p>
            <p><strong>Parcel Value: </strong>{order.parcel_value}</p>
            <p><strong>Package Name: </strong>{order.package_name}</p>
            <p><strong>Shipment Options: </strong>{order.shipment_options}</p>
            <p>
            <strong>Distance:</strong> {distanceKm.toFixed(1)} km
            </p>

            <p>
                <strong>Duration:</strong> {hours > 0 ? `${hours} hr ` : ""}
                {minutes} min
            </p>
                        <p>
                <strong>Estimated Amount:</strong> R{estimatedAmount.toFixed(2)}
            </p>
            <br></br>

            {/*block continuation to payment if form isnt complete ///////////////////////////////////////////////////*/}
            <button className="makePayment" 
            onClick={handlePayment}
            >Make Payment</button>
            </div>
            </>
    )
        /* disabled={} */
}


export default Quotation
/* */