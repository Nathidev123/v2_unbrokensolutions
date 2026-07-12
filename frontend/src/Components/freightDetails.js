import { useFreightContext } from '../hooks/useFreightContext'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

//import { useState } from 'react'

 
const FreightDetails = ({ roadFreight }) => {
//admin.js is the parent
//it passed order in. order comes from iterating orders
//we do the same at the bottom and pass that prop to orderModal
//over the orders array
    //for modal -> update
    const { dispatch2 } = useFreightContext()

     

    const handleClick = async () => {
        const response = await fetch('/api/freight/' ,roadFreight._id, {
            method: 'DELETE'
            //first backend will attempt to delete from db

        })
        const json = await response.json()
        if(response.ok){
            dispatch2({type: 'DELETE_FREIGHT', payload: json})
        }
    }
    
   


    return(
        <div className="admin-card-details">
            <h3>{roadFreight.company_name}</h3>
                <p><strong>Contact Name: </strong>{roadFreight.contact_name}</p>
                <p><strong>Contact Email: </strong>{roadFreight.email}</p>
                <p><strong>Phone: </strong>{roadFreight.phone}</p>
                <p><strong>Street Address: </strong>{roadFreight.street_address}</p>
                <p><strong>City: </strong>{roadFreight.city}</p>
                <p><strong>Postal Code: </strong>{roadFreight.postal_code}</p>
                <p><strong>Province: </strong>{roadFreight.province}</p>
                <p><strong>Recipient Company: </strong>{roadFreight.recipient_company}</p>
                <p><strong>Email: </strong>{roadFreight.recipient_email}</p>
                <p><strong>Phone: </strong>{roadFreight.recipient_phone}</p>
                <p><strong>Street Address: </strong>{roadFreight.recipient_street_address}</p>
                <p><strong>City: </strong>{roadFreight.recipient_city}</p>
                <p><strong>Province: </strong>{roadFreight.recipient_province}</p>

                <p><strong>Weight: </strong>{roadFreight.weight}</p>
                <p><strong>Height: </strong>{roadFreight.height}</p>
                <p><strong>length: </strong>{roadFreight.length}</p>
                <p><strong>Width: </strong>{roadFreight.width}</p>

                <p><strong>Package Contents: </strong>{roadFreight.package_contents}</p>
                <p><strong>Parcel Value: </strong>{roadFreight.parcel_value}</p>
                <p><strong>Package Name: </strong>{roadFreight.package_name}</p>
                <p><strong>Shipment Options: </strong>{roadFreight.shipment_options}</p>
                <p><strong>Delivery Status: </strong>{roadFreight.delivery_status}</p>
                
                

                <p>Created {formatDistanceToNow(new Date(roadFreight.createdAt), {addSuffix: true})}</p>
                {roadFreight.updatedAt && (
                    <p>Updated {formatDistanceToNow(new Date(roadFreight.updatedAt), {addSuffix: true})}</p>
                )}
                
                <button onClick={handleClick}>Delete</button>
                
        

        
        
        </div>
    )
    //above passing props to orderModal
}
/*check buttons*/

export default FreightDetails

/*
<p><strong>Distance: </strong>{distancKm.toFixed(1)} km</p>
                <p><strong>Duration: </strong>{durationMinutes} min</p>
                <p><strong>Estimated Amount: </strong>R{estimatedAmount}</p>*/
                /*{showModal && (
            <OrderModal
                order={order}
                closeModal={closeModal}>
            </OrderModal>
        )}*/
